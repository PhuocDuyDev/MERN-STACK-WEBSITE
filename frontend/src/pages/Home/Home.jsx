import React from 'react';
import { Banner, FeaturedProducts, CTA,SaleProducts } from './modules';

const Home = () => {
    return (
        <>
            <Banner />
            <FeaturedProducts />
            <CTA />
            <SaleProducts />
        </>
    );
};

export default Home;
