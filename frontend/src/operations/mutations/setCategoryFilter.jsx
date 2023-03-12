import { CategoryFilters } from '../../models';

export default (categoryFilterVar) => {
    return (filter) => {
        categoryFilterVar(filter);
    };
};
export const filterProductByCategory = (category, products) => {
    const filteredProducts = [...products];
    switch (category.id) {
        case CategoryFilters.DRESS.id:
            return filteredProducts.filter(
                (product) => product.category === CategoryFilters.DRESS.id
            );
        case CategoryFilters.FEATURE.id:
            return filteredProducts.filter(
                (product) => product.feature === true
            );
        case CategoryFilters.JEAN.id:
            return filteredProducts.filter(
                (product) => product.category === CategoryFilters.JEAN.id
            );
        case CategoryFilters.JACKET.id:
            return filteredProducts.filter(
                (product) => product.category === CategoryFilters.JACKET.id
            );
        case CategoryFilters.SAND.id:
            return filteredProducts.filter(
                (product) => product.category === CategoryFilters.SAND.id
            );
        case CategoryFilters.TSHIRT.id:
            return filteredProducts.filter(
                (product) => product.category === CategoryFilters.TSHIRT.id
            );
        case CategoryFilters.SALE.id:
            return filteredProducts.filter((product) => product.discount > 0);

        default:
            return filteredProducts;
    }
};
