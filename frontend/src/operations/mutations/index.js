import { sortFilterVar, categoryFilterVar } from '../../client/client';
import createSetSortFilter from './setSortFilter';
import createSetCategoryFilter from './setCategoryFilter';
import { filterProductByCategory } from './setCategoryFilter';
import { filterProductsBySort } from './setSortFilter';

export { default as useLoginMutation } from './login';
export { default as useRegisterMutation } from './register';
export { default as useLogoutMutation } from './logout';

export const filterProductsMutations = {
    setSortFilter: createSetSortFilter(sortFilterVar),
    setCategoryFilter: createSetCategoryFilter(categoryFilterVar),
};
export { filterProductByCategory, filterProductsBySort };
