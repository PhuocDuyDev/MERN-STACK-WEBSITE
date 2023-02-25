import React from 'react';
import { useSelector } from 'react-redux';
import { selectProductsShuffle } from '../../features/selector';
import {
    Banner,
    FeaturedProducts,
    CTA,
    SaleProducts,
    Services,
} from './modules';

const Home = () => {
    const products = useSelector(selectProductsShuffle);
    return (
        <>
            <Banner />
            <Services />
            <FeaturedProducts listProducts={products} />
            <CTA />
            <SaleProducts listProducts={products} />
        </>
    );
};

export default Home;
