import React from 'react';
import { Link, useParams } from 'react-router-dom';
// Import Swiper React components

import styles from './Product.module.css';
import { useGetProductById } from '../../operations/queries';

// import required modules
import { Spinner } from './../../components/';
import { PRODUCTS_PAGE } from './../../const/index';
import { categoriesProductsPage } from '../../const/';
import {SliderImages} from './../../components/';

const Product = () => {
    const { productId } = useParams();
    const { data, loading } = useGetProductById(productId);
    if (loading) {
        return <Spinner />;
    }

    const [category] = categoriesProductsPage.filter(
        ({ category }) => category === data.product.category
    );

    return (
        <>
            <div className={`${styles['breadcrumb']}`}>
                <Link to={'/'}>Home</Link>
                <span> / </span>
                <Link to={PRODUCTS_PAGE}>Products</Link>
                <span> / </span>
                <Link to={`/products?category=${data.product.category}`}>
                    {category.title}
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
