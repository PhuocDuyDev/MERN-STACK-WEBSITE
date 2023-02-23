import { demoProducts } from '../../const/demoProducts';

export const selectProductsByCategory = (state, category, sortBy) => {
    let filteredProducts = [...state.featureProduct.products];

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

    return [...filteredProducts];
};
