import {
    categoriesAll,
    categoriesJean,
    categoriesTShirt,
    categoriesDresses,
    categoriesFeature,
    categoriesJacket,
    categoriesSanD,
    categoriesSale,
} from '../const/index';

export const CategoryFilters = {
    ALL: {
        id: categoriesAll,
        displayName: 'All products',
    },
    SAND: {
        id: categoriesSanD,
        displayName: 'San.D',
    },
    FEATURE: {
        id: categoriesFeature,
        displayName: 'Feature',
    },
    TSHIRT: {
        id: categoriesTShirt,
        displayName: 'T-Shirt',
    },
    DRESS: {
        id: categoriesDresses,
        displayName: 'Dresses',
    },
    JEAN: {
        id: categoriesJean,
        displayName: 'Jeans',
    },
    JACKET: {
        id: categoriesJacket,
        displayName: 'Jacket',
    },
    SALE: {
        id: categoriesSale,
        displayName: 'Sale',
    },
};
