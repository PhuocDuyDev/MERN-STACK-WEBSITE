import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FeaturedProducts.module.css';
import { ProductCard } from '../../../../components';
import { PRODUCTS_PAGE } from './../../../../const/';
import { categoriesFeature } from './../../../../const/index';
import { filterProductsMutations } from '../../../../operations/mutations';
import { CategoryFilters } from '../../../../models';
import { sortFilterVar } from '../../../../client/client';

const FeaturedProducts = ({ listProducts }) => {
    const { setCategoryFilter } = filterProductsMutations;
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
                                isInCart={product.isInCart}
                                isInWishlist={product.isInWishlist}
                            />
                        );
                    })}
                </div>
                <Link
                    to={`${PRODUCTS_PAGE}?category=${categoriesFeature}`}
                    onClick={() =>
                        setCategoryFilter({
                            ...Object.values(CategoryFilters).find(
                                (category) => category.id === categoriesFeature
                            ),
                        }) || { ...CategoryFilters.ALL }
                    }
                    className={`${styles['featured-btn']} see-more-btn`}
                >
                    See More
                </Link>
            </div>
        </section>
    );
};

export default FeaturedProducts;
