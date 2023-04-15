export const PRODUCTS_PAGE = '/products';
export const CART_PAGE = '/cart';
export const LOGIN_PAGE = '/login';
export const REGISTER_PAGE = '/register';
export const WISHLIST_PAGE = '/wishlist';

export const categoriesAll = 'all';
export const categoriesSanD = 'san.d';
export const categoriesTShirt = 'tshirt';
export const categoriesJean = 'jean';
export const categoriesDresses = 'dresses';
export const categoriesJacket = 'jacket';
export const categoriesFeature = 'feature';
export const categoriesSale = 'sale';

export const categoriesProductsPage = [
    { category: categoriesAll, title: 'All products' },
    { category: categoriesSanD, title: 'San.D' },
    { category: categoriesTShirt, title: 'T-Shirt' },
    { category: categoriesJean, title: 'Jeans' },
    { category: categoriesDresses, title: 'Dresses' },
    { category: categoriesJacket, title: 'Jacket' },
];

export const navLink = [
    {
        path: '/',
        title: 'Home',
    },
    {
        path: PRODUCTS_PAGE,
        title: 'Our Store',
    },
    {
        path: CART_PAGE,
        title: 'Cart',
    },
];

export const PRODUCTS_PER_PAGE = 9;

export const TIME_SHOW_TOAST_DEFAULT = 1.5;
