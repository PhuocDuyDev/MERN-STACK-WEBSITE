import React from 'react';
import { useGetProductsQuery } from '../../operations/queries';
import {
    Banner,
    CTA,
    FeaturedProducts,
    SaleProducts,
    Services,
} from './modules';

const Home = () => {
    const { data } = useGetProductsQuery();

    return (
        <>
            <Banner />
            <Services />
            <FeaturedProducts listProducts={data?.products} />
            <CTA />
            <SaleProducts listProducts={data?.products} />
        </>
    );
};

export default Home;
