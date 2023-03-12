import { createSelector } from 'reselect';

export const selectProducts = (state) => state.featureProduct.products;
export const selectProductsPerPage = (state) =>
    state.featureProduct.productsPerPage;
export const selectWishlist = (state) => state.featureWishlish.items;
export const selectCart = (state) => state.featureCart.items;

export const selectSingleProductInWishlistAndCart = createSelector(
    [selectProducts, selectWishlist, selectCart],
    (products, wishlist, cart) => {
        return (productId) => {
            const [existingProduct] = products.filter((product) => {
                return product.id === +productId;
            });

            const isInCart = cart
                ? cart.some((item) => item.id === existingProduct.id)
                : false;
            const isInWishlist = wishlist
                ? wishlist.some((item) => item.id === existingProduct.id)
                : false;

            return {
                ...existingProduct,
                isInCart,
                isInWishlist,
            };
        };
    }
);

export const selectProductsInWishlist = createSelector(
    [selectProducts, selectWishlist, selectProductsPerPage],
    (products, wishlist, productsPerPage) => {
        const productsInWishList = products.filter((product) =>
            wishlist.includes(product.id)
        );
        return {
            products: productsInWishList,
            productsPerPage: productsPerPage,
        };
    }
);

export const selectProductsShuffle = createSelector(
    [selectProducts, selectCart, selectWishlist],
    (products, cart, wishlist) => {
        const productsWithCartAndWishlistStatus = products.map((product) => {
            const isInCart = cart.some((item) => item.id === product.id);
            const isInWishlist = wishlist.some(
                (item) => item.id === product.id
            );

            return {
                ...product,
                isInCart,
                isInWishlist,
            };
        });
        const shuffleProducts = productsWithCartAndWishlistStatus
            .slice()
            .sort(() => 0.5 - Math.random());
        return shuffleProducts;
    }
);

export const selectProductsInCart = createSelector(
    [selectProducts, selectCart, selectProductsPerPage],
    (products, cart, productsPerPage) => {
        const productsInCart = products
            .map((product) => {
                const existingItem = cart.find(
                    (productInCart) => productInCart.id === product.id
                );
                if (!existingItem) return null;
                return { ...product, quantity: existingItem.quantity };
            })
            .filter((productInCart) => productInCart !== null);

        return {
            products: productsInCart,
            productsPerPage: productsPerPage,
        };
    }
);

export const selectProductsInWishlistAndCart = createSelector(
    [selectProducts, selectWishlist, selectCart, selectProductsPerPage],
    (products, wishlist, cart, productsPerPage) => {
        const productsWithCartAndWishlistStatus = products.map((product) => {
            const isInCart = cart
                ? cart.some((item) => item.id === product.id)
                : false;
            const isInWishlist = wishlist
                ? wishlist.some((item) => item.id === product.id)
                : false;

            return {
                ...product,
                isInCart,
                isInWishlist,
            };
        });

        return {
            products: productsWithCartAndWishlistStatus,
            productsPerPage: productsPerPage,
            wishlist: wishlist.items,
            cart: cart.items,
        };
    }
);

export const selectProductsFiltered = createSelector(
    [selectProducts, selectWishlist, selectCart, selectProductsPerPage],
    (products, wishlist, cart, productsPerPage) => {
        const productsWithCartAndWishlistStatus = products.map((product) => {
            const isInCart = cart
                ? cart.some((item) => item.id === product.id)
                : false;
            const isInWishlist = wishlist
                ? wishlist.some((item) => item.id === product.id)
                : false;

            return {
                ...product,
                isInCart,
                isInWishlist,
            };
        });

        return (category, sortBy) => {
            let filteredProducts =
                category !== 'all'
                    ? category !== 'sale'
                        ? productsWithCartAndWishlistStatus.filter(
                              (product) => product.category === category
                          )
                        : productsWithCartAndWishlistStatus.filter(
                              (product) => product.discount > 0
                          )
                    : productsWithCartAndWishlistStatus;
            if (sortBy === 'low-to-high') {
                filteredProducts.sort((a, b) => a.price - b.price);
            }
            if (sortBy === 'high-to-low') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            return {
                products: filteredProducts,
                productsPerPage,
                wishlist: wishlist.items,
                cart: cart.items,
            };
        };
    }
);
