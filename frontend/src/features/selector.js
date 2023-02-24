import { createSelector } from 'reselect';

export const selectProducts = (state) => state.featureProduct.products;
export const selectProductsPerPage = (state) =>
    state.featureProduct.productsPerPage;
export const selectWishlist = (state) => state.featureWishlish.items;
export const selectCart = (state) => state.featureCart.items;

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

export const selectProductsInCart = createSelector(
    [selectProducts, selectCart, selectProductsPerPage],
    (products, cart, productsPerPage) => {
        const productsInCart = products.filter((product) =>
            cart.includes(product.id)
        );
        return {
            products: productsInCart,
            productsPerPage: productsPerPage,
        };
    }
);

export const selectProductsAndWishlistAndCart = createSelector(
    [selectProducts, selectWishlist, selectCart, selectProductsPerPage],
    (products, wishlist, cart, productsPerPage) => {
        const productsWithCartAndWishlistStatus = products.map((product) => {
            const isInCart = cart.items.some((item) => item.id === product.id);
            const isInWishlist = wishlist.items.some(
                (item) => item.id === product.id
            );

            return {
                ...product,
                isInCart,
                isInWishlist,
            };
        });

        return {
            products: productsWithCartAndWishlistStatus,
            wishlist: wishlist.items,
            cart: cart.items,
        };
    }
);

export const selectProductsFiltered = createSelector(
    [selectProducts, selectWishlist, selectCart, selectProductsPerPage],
    (products, wishlist, cart, productsPerPage) => {
        const productsWithCartAndWishlistStatus = products.map((product) => {
            const isInCart = cart.some((item) => {
                return item.id === product.id;
            });
            const isInWishlist = wishlist.some(
                (item) => item.id === product.id
            );

            return {
                ...product,
                isInCart,
                isInWishlist,
            };
        });
        return (category, sortBy) => {
            let filteredProducts = [...productsWithCartAndWishlistStatus];

            if (category != 'all' && category != 'sale') {
                filteredProducts = filteredProducts.filter(
                    (product) => product.category == category
                );
            } else if (category == 'sale') {
                filteredProducts = filteredProducts.filter(
                    (product) => product.discount > 0
                );
            }
            if (sortBy == 'low-to-high') {
                filteredProducts.sort((a, b) => a.price - b.price);
            }
            if (sortBy == 'high-to-low') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            return {
                products: filteredProducts,
                productsPerPage: productsPerPage,
                wishlist: wishlist.items,
                cart: cart.items,
            };
        };
    }
);
