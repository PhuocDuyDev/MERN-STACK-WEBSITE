import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = ({ hideHeaderPaths = ['login'] }) => {
    const { pathname } = useLocation();
    return (
        <>
            {!hideHeaderPaths.includes(pathname) && <Header />}
            <Outlet />
            {!hideHeaderPaths.includes(pathname) && <Footer />}
        </>
    );
};

export default Layout;
