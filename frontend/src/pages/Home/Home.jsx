import React from 'react';
import { productsVar } from '../../client/client';
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
    productsVar(data?.products);

    return (
        <>
            <Banner />
            <Services />
            <FeaturedProducts listProducts={productsVar()} />
            <CTA />
            <SaleProducts listProducts={productsVar()} />
        </>
    );
};

export default Home;
