import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FeaturedProducts.module.css';
import { ProductCard } from '../../../../components';
import { PRODUCTS_PAGE } from './../../../../const/NavigateConst';

const FeaturedProducts = ({ listProducts }) => {
    return (
        <section className={`${styles['featured-section']} section`}>
            <div className={`container ${styles['featured']}`}>
                <h1 className='section-heading'>Featured Collection</h1>
                <div className={`grid ${styles['featured-products']}`}>
                    {listProducts.slice(0, 8).map((product) => {
                        return (
                            <ProductCard
                                id={product.id}
                                productImg={product.img}
                                price={product.price}
                                category={product.category}
                                title={product.title}
                                key={product.id}
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
