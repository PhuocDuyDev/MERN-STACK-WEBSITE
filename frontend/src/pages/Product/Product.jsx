import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// Import Swiper React components

import styles from './Product.module.css';

import GridLoader from 'react-spinners/GridLoader';
import SliderImages from './modules/SliderImage/SliderImages';
import { useGetProductById } from '../../operations/queries';

// import required modules
import { Spinner } from './../../components/';

const Product = () => {
    const { productId } = useParams();
    const { data, loading } = useGetProductById(productId);
    if (loading) {
        return <Spinner />;
    }
    return (
        <>
            <div className={`${styles['breadcrumb']}`}>
                <Link to={'/'}>Home</Link>
                <span> / </span>
                <Link to={`/products?category=${data.product.category}`}>
                    {data.product.category}
                </Link>
            </div>
            <section className={`${styles['product-section']} section`}>
                <div className={`container ${styles['product-container']}`}>
                    <SliderImages
                        productImg={data.product.images}
                        productName={data.product.name}
                    />
                    <div className='product-details'>details</div>
                </div>
            </section>
        </>
    );
};

export default Product;
