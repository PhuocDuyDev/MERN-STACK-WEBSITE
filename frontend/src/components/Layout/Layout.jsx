import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import GridLoader from 'react-spinners/GridLoader';
import { useAuthContext } from '../../context/AuthContext';

const Layout = ({ hideHeaderPaths = ['login'] }) => {
    const { pathname } = useLocation();
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
        <>
            {!hideHeaderPaths.includes(pathname) && <Header />}
            <Outlet />
            {!hideHeaderPaths.includes(pathname) && <Footer />}
        </>
    );
};

export default Layout;
