import React from 'react';
import {
    Banner,
    FeaturedProducts,
    CTA,
    SaleProducts,
    Services,
} from './modules';

const Home = () => {
    return (
        <>
            <Banner />
            <Services />
            <FeaturedProducts />
            <CTA />
            <SaleProducts />
        </>
    );
};

export default Home;
