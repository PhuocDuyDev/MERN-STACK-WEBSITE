const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Product } = require('../models');
const { createToken, sendRefreshToken } = require('../ultils/auth.js');
const { AuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql');
const { ROLE_ADMIN, ROLE_USER } = require('../const');

const userResolvers = {
    Query: {
        users: async (parent, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }

            if (currentUser.role !== ROLE_ADMIN) {
                throw new Error('User not authorized');
            }

            const users = await User.find();
            return users;
        },
        user: async (parent, { id }, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }

            if (currentUser.role !== ROLE_ADMIN) {
                throw new Error('User not authorized');
            }

            const foundUser = await User.findById(id);

            if (!foundUser) {
                throw new Error(`User with ID ${id} not found`);
            }

            return foundUser;
        },
        currentUser: async (parent, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
            return currentUser;
        },
        getProductsInCartWithStatus: async (parent, args, { currentUser }) => {
            // idea: get user's cart, if product in wishlist show icon HEART
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }

            const wishlistProductIds = currentUser.wishlist.items.map(
                (product) => product.productId.toString()
            );
            const cartProductIds = currentUser.cart.items.map((product) =>
                product.productId.toString()
            );
            const cartProducts = currentUser.cart.items;

            // get products in cart
            const products = await Product.find({
                _id: {
                    $in: cartProductIds,
                },
            }).transform((doc) => {
                return doc.map((product) => {
                    const indexOfCart = cartProductIds.indexOf(product.id);

                    const indexOfWishlist = wishlistProductIds.indexOf(
                        product.id
                    );

                    return {
                        id: product.id,
                        name: product.name,
                        discount: product.discount,
                        description: product.description,
                        images: product.images,
                        category: product.category,
                        price: product.price,
                        inCart: indexOfCart !== -1 ? true : false,
                        inWishlist: indexOfWishlist !== -1 ? true : false,
                        quantity:
                            indexOfCart !== -1
                                ? cartProducts[indexOfCart].quantity
                                : null,
                    };
                });
            });
            if (products.length == 0) {
                return {
                    message: 'No products in cart',
                    products: [],
                };
            }
            return { message: 'Successful', products };
        },
    },
    Mutation: {
        login: async (parent, { email, password }, { res, req }) => {
            const user = await User.findOne({ email: email });
            if (!email.trim() || !password.trim()) {
                throw new GraphQLError(
                    'Email and password are required fields.',
                    {
                        extensions: {
                            code: 'INVALIDARGUMENTEXCEPTION',
                            http: { status: 422 },
                        },
                    }
                );
            }

            if (!email.trim().includes('@')) {
                throw new GraphQLError('Email is not valid', {
                    extensions: {
                        code: 'INVALIDARGUMENTEXCEPTION',
                        http: { status: 422 },
                    },
                });
            }

            if (password.trim().length < 6) {
                throw new GraphQLError('Password is not valid', {
                    extensions: {
                        code: 'INVALIDARGUMENTEXCEPTION',
                        http: { status: 422 },
                    },
                });
            }

            if (!user) {
                throw new GraphQLError('User with that email not found', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordValid) {
                throw new GraphQLError('Incorrect password', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }

            const accessToken = createToken('accessToken', user);
            const refreshToken = createToken('refreshToken', user);
            user.refreshToken = refreshToken;

            await user.save();
            sendRefreshToken(res, refreshToken);

            return {
                authPayload: {
                    user,
                    accessToken,
                },
                message: 'Login succesful',
            };
        },
        register: async (parent, args, { res }) => {
            const { name, email, password } = args;

            const existingUser = await User.findOne({ email });
                
            if (!email.trim() || !password.trim() || !name.trim()) {
                throw new GraphQLError(
                    'Fullname, email and password are required fields.',
                    {
                        extensions: {
                            code: 'INVALIDARGUMENTEXCEPTION',
                            http: { status: 422 },
                        },
                    }
                );
            }

            if (password.trim().length < 6) {
                throw new GraphQLError('Fullname is not valid', {
                    extensions: {
                        code: 'INVALIDARGUMENTEXCEPTION',
                        http: { status: 422 },
                    },
                });
            }

            if (!email.trim().includes('@')) {
                throw new GraphQLError('Email is not valid', {
                    extensions: {
                        code: 'INVALIDARGUMENTEXCEPTION',
                        http: { status: 422 },
                    },
                });
            }

            if (password.trim().length < 6) {
                throw new GraphQLError('Password is not valid', {
                    extensions: {
                        code: 'INVALIDARGUMENTEXCEPTION',
                        http: { status: 422 },
                    },
                });
            }

            if (existingUser) {
                throw new GraphQLError('Email is already registered', {
                    extensions: {
                        code: 'CONFLICT',
                        http: { status: 409 },
                    },
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                cart: { items: [] },
                wishlist: { items: [] },
                role: ROLE_USER,
                tokenVersion: 0,
            });
            return { user, message: 'Register successful' };
        },
        logout: async (parent, args, { res, currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
            const { userId } = args;
            const user = await User.findById(userId);
            if (user.email !== currentUser.email) {
                throw new GraphQLError('User does not match! Can not log out', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
            currentUser.tokenVersion += 1;
            await currentUser.save();
            res.clearCookie('refreshToken');
            return { message: 'Logout successful' };
        },
        updateUser: async (parent, args, { currentUser }) => {
            try {
                if (!currentUser) {
                    throw new GraphQLError('User is not authenticated', {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                            http: { status: 401 },
                        },
                    });
                }
                const { id, name, email, role, password } = args;
                const hashedPassword = await bcrypt.hash(password, 12);
                const user = await User.findById(id);
                if (!user) {
                    throw new Error('User not found');
                }
                user.name = name || user.name;
                user.email = email || user.email;
                user.role = role || user.role;
                user.password = hashedPassword || user.password;
                await user.save();
                const accessToken = createToken('accessToken', user);

                return {
                    user,
                    accessToken,
                };
            } catch (err) {
                throw err;
            }
        },
        refreshToken: async (parent, args, { req, currentUser }) => {
            try {
                const refreshToken = req.cookies['refreshToken'];
                if (!refreshToken) {
                    throw new GraphQLError(
                        'Token expired, please login again!',
                        {
                            extensions: {
                                code: 'FORBIDDEN',
                                http: { status: 403 },
                            },
                        }
                    );
                }

                let decoded = jwt.verify(
                    refreshToken,
                    process.env.JWT_REFRESH_SECRET
                );
                if (!decoded) {
                    throw new GraphQLError('User is not authenticated', {
                        extensions: {
                            code: 'UNAUTHENTICATED',
                            http: { status: 401 },
                        },
                    });
                }

                const currentTime = Math.floor(Date.now() / 1000);
                if (currentTime - decoded.exp > 0) {
                    throw new GraphQLError(
                        'Token expired, please login again!',
                        {
                            extensions: {
                                code: 'FORBIDDEN',
                                http: { status: 403 },
                            },
                        }
                    );
                }
                const decodedUser = await User.findById(decoded.userId);
                if (!decodedUser) {
                    throw new GraphQLError('User not found', {
                        extensions: {
                            code: 'FORBIDDEN',
                            http: { status: 403 },
                        },
                    });
                }

                if (decodedUser.tokenVersion !== decoded.tokenVersion) {
                    throw new GraphQLError(
                        "User's token does not match, please login again!",
                        {
                            extensions: {
                                code: 'FORBIDDEN',
                                http: { status: 403 },
                            },
                        }
                    );
                }

                const accessToken = createToken('accessToken', decodedUser);
                return { accessToken, user: decodedUser };
            } catch (error) {
                throw Error(error);
            }
        },
        addToCart: async (parent, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }

            const { productId, quantity, size, isEditQuantity } =
                args.inputProduct;
            if (quantity <= 0) {
                throw new GraphQLError('Out of stocks', {
                    extensions: {
                        code: 'NOT FOUND',
                        http: { status: 404 },
                    },
                });
            }
            const productInfo = await Product.findById(productId);
            if (!productId) {
                throw new GraphQLError('Product not found', {
                    extensions: {
                        code: 'NOT FOUND',
                        http: { status: 404 },
                    },
                });
            }

            const [dataProductSize] = productInfo.size.items.filter(
                (sizeItem) => sizeItem.size === size
            );

            if (isEditQuantity && quantity > dataProductSize.quantity) {
                throw new GraphQLError(
                    `Maximum quantity product is: ${dataProductSize.quantity}. You can not add more than quantity in stocks`,
                    {
                        extensions: {
                            code: 'NOT ACCEPTABLE',
                            http: { status: 406 },
                        },
                    }
                );
            }

            const [dataCartUserBySize] = currentUser.cart.items.filter(
                (cartItem) => {
                    return (
                        cartItem.productId.toString() ===
                            productInfo._id.toString() &&
                        cartItem.sizeProductUser === size
                    );
                }
            );

            if (dataCartUserBySize) {
                if (
                    (dataCartUserBySize.quantity + quantity >
                        dataProductSize.quantity &&
                        !isEditQuantity) ||
                    (isEditQuantity && quantity > dataProductSize.quantity)
                ) {
                    throw new GraphQLError(
                        `You already has: ${dataCartUserBySize.quantity} in cart. You can not add more than quantity in stocks`,
                        {
                            extensions: {
                                code: 'NOT ACCEPTABLE',
                                http: { status: 406 },
                            },
                        }
                    );
                }
            } else {
                currentUser.cart.items.push({
                    productId,
                    quantity: quantity,
                    sizeProductUser: size,
                });

                await currentUser.save();
                return currentUser;
            }

            // get all product id match productId from args.
            const cartProductIndexes = currentUser.cart.items.reduce(
                (acc, cartItem, i) =>
                    cartItem.productId.toString() === productId.toString()
                        ? [...acc, i]
                        : acc,
                []
            );
            // if cartProductsIndexes exist => length > 0
            if (cartProductIndexes.length > 0) {
                // flag for same size or not.
                let hasSameSize = false;

                // same size => size from args === exist sizeProductUser in db
                // set hasSameSize => true if match
                cartProductIndexes.forEach((cartProductIndex) => {
                    if (
                        size ===
                        currentUser.cart.items[cartProductIndex].sizeProductUser
                    ) {
                        if (isEditQuantity) {
                            currentUser.cart.items[cartProductIndex].quantity =
                                quantity;
                        } else {
                            currentUser.cart.items[cartProductIndex].quantity +=
                                quantity;
                        }
                        hasSameSize = true;
                    }
                });

                // not samesize => create new product in cart
                if (!hasSameSize) {
                    currentUser.cart.items.push({
                        productId,
                        quantity: quantity,
                        sizeProductUser: size,
                    });
                }
            } else {
                currentUser.cart.items.push({
                    productId,
                    quantity: quantity,
                    sizeProductUser: size,
                });
            }

            await currentUser.save();
            return currentUser;
        },
        removeProductFromCart: async (parent, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
            const { productId, sizeProduct } = args;
            const updatedCartItems = currentUser.cart.items.filter((cartItem) =>
                cartItem.productId.toString() === productId.toString() &&
                sizeProduct.toLowerCase() ===
                    cartItem.sizeProductUser.toLowerCase()
                    ? false
                    : true
            );
            currentUser.cart.items = updatedCartItems;
            await currentUser.save();
            return currentUser;
        },
        clearCart: async (parent, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
            currentUser.cart = { items: [] };
            await currentUser.save();
            return currentUser;
        },

        addProductToWishlist: async (parent, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
            const { productId } = args;
            const wishlistProductIndex = currentUser.wishlist.items.findIndex(
                (wishlistItem) =>
                    wishlistItem.productId.toString() === productId.toString()
            );
            if (wishlistProductIndex !== -1) {
                throw new GraphQLError(
                    'Failed. User already has product in wishlist.',
                    {
                        extensions: {
                            code: 'CONFLICT',
                            http: { status: 409 },
                        },
                    }
                );
            }

            currentUser.wishlist.items.push({ productId });
            await currentUser.save();
            return currentUser;
        },
        removeProductFromWishlist: async (parent, args, { currentUser }) => {
            if (!currentUser) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
            const { productId } = args;

            const wishlistProductIndex = currentUser.wishlist.items.findIndex(
                (wishlistItem) =>
                    wishlistItem.productId.toString() === productId.toString()
            );

            if (wishlistProductIndex === -1) {
                throw new GraphQLError(
                    "Failed. Product not in user'wishlist.",
                    {
                        extensions: {
                            code: 'CONFLICT',
                            http: { status: 409 },
                        },
                    }
                );
            }

            currentUser.wishlist.items.splice(wishlistProductIndex, 1);
            await currentUser.save();
            return currentUser;
        },

        checkout: async (parent, args, { currentUser }) => {
            return { message: 'checkout success', user: currentUser };
        },
    },
    Cart: {
        itemsInfo: async (parent) => {
            const cartProducts = parent.items;

            const cartProductIds = cartProducts.map((cartProduct) =>
                cartProduct.productId.toString()
            );

            const productsInDb = await Product.find({
                _id: {
                    $in: cartProductIds,
                },
            }).transform((doc) => {
                return doc.map((product) => ({
                    id: product.id,
                    name: product.name,
                    discount: product.discount,
                    description: product.description,
                    images: product.images,
                    price: product.price,
                    size: product.size,
                }));
            });

            // add quantity to product.
            const cartUserProduct = productsInDb.map((product, i) => {
                // always at least 1 index
                const currentProductIds = cartProductIds.reduce(
                    (acc, id, i) =>
                        id.toString() === product.id.toString()
                            ? [...acc, i]
                            : acc,
                    []
                );

                // if 2 id exist mean : size is different
                if (currentProductIds.length > 1) {
                    return cartProducts
                        .map((cartProduct) => {
                            return cartProduct.productId.toString() ===
                                product.id.toString()
                                ? {
                                      ...product,
                                      quantity: cartProduct.quantity,
                                      sizeProductUser:
                                          cartProduct.sizeProductUser,
                                  }
                                : null;
                        })
                        .filter((p) => p !== null);
                    // [
                    //     {
                    //         ...product,
                    //         quantity: cartProducts[index].quantity,
                    //         sizeProductUser:
                    //             cartProducts[index].sizeProductUser,
                    //     },
                    //     {
                    //         ...product,
                    //         quantity: cartProducts[index].quantity,
                    //         sizeProductUser:
                    //             cartProducts[index].sizeProductUser,
                    //     },
                    // ];
                }

                return {
                    ...product,
                    quantity: cartProducts[currentProductIds[0]].quantity,
                    sizeProductUser:
                        cartProducts[currentProductIds[0]].sizeProductUser,
                };
            });
            const cartUserProductFlat = cartUserProduct.flat(Infinity);

            return cartUserProductFlat;
        },
    },
};

module.exports = {
    userResolvers,
};
