import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Import Swiper React components

import styles from './Product.module.css';

import { categoriesProductsPage } from '../../const/';
import GridLoader from 'react-spinners/GridLoader';
import { selectSingleProductInWishlistAndCart } from './../../features/selector';
import SliderImages from './modules/SliderImage/SliderImages';

// import required modules

const Product = () => {
    const { productId } = useParams();
    const getProduct = useSelector(selectSingleProductInWishlistAndCart);
    const product = getProduct(productId);
    const [categoryProduct] = categoriesProductsPage.filter(
        (category) => category.category === product.category
    );
    return (
        <>
            {product.title ? (
                <>
                    <div className={`${styles['breadcrumb']}`}>
                        <Link to={'/'}>Home</Link>
                        <span> / </span>
                        <Link
                            to={`/products?category=${categoryProduct.category}`}
                        >
                            {categoryProduct.title}
                        </Link>
                    </div>
                    <section className={`${styles['product-section']} section`}>
                        <div
                            className={`container ${styles['product-container']}`}
                        >
                            <SliderImages
                                productImg={product.img}
                                productTitle={product.title}
                            />
                            <div className='product-details'>details</div>
                        </div>
                    </section>
                </>
            ) : (
                <div className={styles['loading-spinner']}>
                    <GridLoader color='#febd69' />
                </div>
            )}
        </>
    );
};

export default Product;
