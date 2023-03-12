import { SortFilters } from '../../models';

export default (sortFilterVar) => {
    return (filter) => {
        sortFilterVar(filter);
    };
};

export const filterProductsBySort = (sort, products) => {
    const filteredProducts = [...products];
    if (sort.id === SortFilters.ASC.id) {
        return filteredProducts.sort((a, b) => b.price - a.price); // high -> low
    }

    if (sort.id === SortFilters.DESC.id)
        return filteredProducts.sort((a, b) => a.price - b.price); // low -> high
    return filteredProducts; // default
};
