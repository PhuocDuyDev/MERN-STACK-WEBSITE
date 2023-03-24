const { Product } = require('../models/');
const { ROLE_ADMIN } = require('./../const/index');
const { GraphQLError } = require('graphql');

const productResolvers = {
    Query: {
        products: async (parent, args, { currentUser }) => {
            if (!currentUser) {
                return await Product.find().transform((doc) => {
                    return doc.map((product) => ({
                        id: product.id,
                        name: product.name,
                        discount: product.discount,
                        description: product.description,
                        images: product.images,
                        price: product.price,
                        feature: product.feature,
                        category: product.category,
                        size: product.size,
                        feature: product.feature,
                        inWishlist: null,
                        inCart: null,
                    }));
                });
            }

            const wishlistProductIds = currentUser.wishlist.items.map(
                (product) => product.productId.toString()
            );
            const cartProductIds = currentUser.cart.items.map((product) =>
                product.productId.toString()
            );

            return await Product.find().transform((doc) => {
                return doc.map((product) => ({
                    id: product.id,
                    name: product.name,
                    discount: product.discount,
                    description: product.description,
                    images: product.images,
                    category: product.category,
                    price: product.price,
                    feature: product.feature,
                    size: product.size,
                    feature: product.feature,
                    inCart:
                        cartProductIds.indexOf(product.id) !== -1
                            ? true
                            : false,
                    inWishlist:
                        wishlistProductIds.indexOf(product.id) !== -1
                            ? true
                            : false,
                }));
            });
        },
        product: async (parent, { id }, { currentUser }) => {
            if (!currentUser) {
                return await Product.findById(id).transform((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        discount: product.discount,
                        description: product.description,
                        images: product.images,
                        category: product.category,
                        price: product.price,
                        size: product.size,
                        inCart: null,
                        inWishlist: null,
                    };
                });
            }

            const wishlistProductIds = currentUser.wishlist.items.map(
                (product) => product.productId.toString()
            );
            const cartProductIds = currentUser.cart.items.map((product) =>
                product.productId.toString()
            );

            return await Product.findById(id).transform((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    discount: product.discount,
                    description: product.description,
                    images: product.images,
                    category: product.category,
                    price: product.price,
                    size: product.size,
                    feature: product.feature,
                    inCart:
                        cartProductIds.indexOf(product.id) !== -1
                            ? true
                            : false,
                    inWishlist:
                        wishlistProductIds.indexOf(product.id) !== -1
                            ? true
                            : false,
                };
            });
        },
    },
    Mutation: {
        addProduct: async (parent, args, { currentUser }) => {
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
            const { input } = args;

            const newProduct = new Product({
                ...input,
                price: Math.floor(Math.random() * (220 - 170) + 170),
                size: {
                    items: [
                        {
                            size: 'S',
                            quantity: Math.floor(
                                Math.random() * (50 - 10) + 10
                            ),
                        },
                        {
                            size: 'M',
                            quantity: Math.floor(
                                Math.random() * (60 - 20) + 20
                            ),
                        },
                        {
                            size: 'L',
                            quantity: Math.floor(Math.random() * (40 - 5) + 5),
                        },
                    ],
                },
            });

            const productInfo = await newProduct.save();
            return { message: 'Create products success', productInfo };
        },
        updateProduct: async (parent, args) => {
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

            const updatedProduct = await Product.findByIdAndUpdate(
                args.id,
                args,
                { new: true }
            );
            return updatedProduct;
        },
        deleteProduct: async (parent, args) => {
            const deletedProduct = await Product.findByIdAndDelete(args.id);
            return {
                message: `Delete product with id: ${args.id} success.`,
                productInfo: deletedProduct,
            };
        },
        deleteProducts: async (parent, args) => {
            const { ids } = args;

            await Product.deleteMany({
                _id: {
                    $in: ids,
                },
            });

            return {
                message: `Delete products success`,
            };
        },
    },
    SizeItems: {
        items: async (parent) => {
            return parent.items;
        },
    },
};

module.exports = {
    productResolvers,
};
