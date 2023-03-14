import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GridLoader from 'react-spinners/GridLoader';
import { Layout } from './components';
import {
    CART_PAGE,
    CHECKOUT_PAGE,
    LOGIN_PAGE,
    PRODUCTS_PAGE,
    REGISTER_PAGE
} from './const/';
import { useAuthContext } from './context/AuthContext';
import {
    Cart,
    Checkout,
    Home,
    Login,
    Product as SingleProduct,
    Products,
    Register
} from './pages/';
import PrivateRoutes from './utils/PrivateRoutes';

const App = () => {
    const [loadingCheckAuth, setLoadingCheckAuth] = useState(true);
    const { checkAuth } = useAuthContext();
    useEffect(() => {
        const authenticate = async () => {
            await checkAuth();
            setLoadingCheckAuth(false);
        };

        authenticate();
    }, [checkAuth]);

    if (loadingCheckAuth) {
        return (
            <div
                style={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <GridLoader color='#febd69' />
            </div>
        );
    }

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
