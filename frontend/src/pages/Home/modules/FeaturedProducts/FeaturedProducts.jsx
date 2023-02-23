import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FeaturedProducts.module.css';
import { ProductCard } from '../../../../components';
import { PRODUCTS_PAGE } from './../../../../const/NavigateConst';
import { demoProducts } from './../../../../const/demoProducts';

import product1a from '../../../../assets/images/product-1-1.jpg';
import product1b from '../../../../assets/images/product-1-2.jpg';
import product2a from '../../../../assets/images/product-2-1.jpg';
import product2b from '../../../../assets/images/product-2-2.jpg';
import product3a from '../../../../assets/images/product-3-1.jpg';
import product3b from '../../../../assets/images/product-3-2.jpg';

const FeaturedProducts = () => {
    return (
        <section className={`${styles['featured-section']} section`}>
            <div className={`container ${styles['featured']}`}>
                <h1 className='section-heading'>Featured Collection</h1>
                <div className={`grid ${styles['featured-products']}`}>
                    {demoProducts.slice(0, 8).map((product) => {
                        return (
                            <ProductCard
                                productPrice={product.price}
                                productImg={product.img}
                                key={product.id}
                                productId={product.id}
                                discount={
                                    product.discount != 0
                                        ? product.discount
                                        : null
                                }
                            />
                        );
                    })}
                </div>
                <Link
                    to={`${PRODUCTS_PAGE}?category=featured`}
                    className={`${styles['featured-btn']} see-more-btn`}
                >
                    See More
                </Link>
            </div>
        </section>
    );
};

export default FeaturedProducts;
