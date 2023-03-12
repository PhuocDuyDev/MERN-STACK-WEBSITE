import React from 'react';
import { Layout } from './components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    Home,
    Products,
    Product as SingleProduct,
    Login,
    Cart,
    Checkout,
    Register
} from './pages/';
import PrivateRoutes from './utils/PrivateRoutes';
import {
    LOGIN_PAGE,
    PRODUCTS_PAGE,
    CART_PAGE,
    CHECKOUT_PAGE,
    REGISTER_PAGE,
} from './const/';

const App = () => {
    return (
        <BrowserRouter>
            <main className='main'>
                <Routes>
                    <Route
                        element={
                            <Layout
                                hideHeaderPaths={[
                                    LOGIN_PAGE,
                                    '/register',
                                    'forgot-password',
                                ]}
                            />
                        }
                    >
                        <Route path='/' index element={<Home />} />
                        <Route path={PRODUCTS_PAGE} element={<Products />} />
                        <Route
                            path={`${PRODUCTS_PAGE}/:productId`}
                            element={<SingleProduct />}
                        />
                        <Route path={LOGIN_PAGE} element={<Login />} />
                        <Route path={REGISTER_PAGE} element={<Register />} />
                        <Route element={<PrivateRoutes />}>
                            <Route path={CART_PAGE} element={<Cart />} />
                            <Route
                                path={CHECKOUT_PAGE}
                                element={<Checkout />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default App;
