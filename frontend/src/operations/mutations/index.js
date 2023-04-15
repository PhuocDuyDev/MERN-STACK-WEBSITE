import { sortFilterVar, categoryFilterVar } from '../../client/client';
import createSetSortFilter from './setSortFilter';
import createSetCategoryFilter from './setCategoryFilter';
import { filterProductByCategory } from './setCategoryFilter';
import { filterProductsBySort } from './setSortFilter';

export { default as useLoginMutation } from './login';
export { default as useRegisterMutation } from './register';
export { default as useLogoutMutation } from './logout';
export { default as useAddToCartMutation } from './addToCart';
export { default as useAddToWishlist } from './addToWishlist';
export { default as useRemoveFromWishlist } from './removeFromWishlist';
export { default as useRemoveFromCartMutation } from './removeFromCart';

export const filterProductsMutations = {
    setSortFilter: createSetSortFilter(sortFilterVar),
    setCategoryFilter: createSetCategoryFilter(categoryFilterVar),
};
export { filterProductByCategory, filterProductsBySort };
