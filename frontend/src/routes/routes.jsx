import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/';
import {
    PRODUCTS_PAGE,
    CART_PAGE,
    CHECKOUT_PAGE,
} from '../const/NavigateConst';
import {
    Home,
    Products,
    Product as SingleProduct,
    Cart,
    Checkout,
} from '../pages/';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: PRODUCTS_PAGE,
                // loader: 
                element: <Products />,
            },
            {
                path: `${PRODUCTS_PAGE}/:productId`,
                element: <SingleProduct />,
            },
            {
                path: CART_PAGE,
                element: <Cart />,
            },
            {
                path: CHECKOUT_PAGE,
                element: <Checkout />,
            },
        ],
    },
]);
