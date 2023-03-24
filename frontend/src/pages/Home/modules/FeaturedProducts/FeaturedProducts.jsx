import React from 'react';
import { Link } from 'react-router-dom';

import { ProductCard, Spinner } from '../../../../components';
import { CategoryFilters } from '../../../../models';
import { filterProductsMutations } from '../../../../operations/mutations';
import { PRODUCTS_PAGE } from './../../../../const/';
import { categoriesFeature } from './../../../../const/index';

import styles from './FeaturedProducts.module.css';

const FeaturedProducts = ({ listProducts }) => {
    const { setCategoryFilter } = filterProductsMutations;
    return (
        <section className={`${styles['featured-section']} section`}>
            <div className={`container ${styles['featured']}`}>
                <h1 className='section-heading'>Featured Collection</h1>
                {listProducts?.length > 0 ? (
                    <div className={`grid ${styles['featured-products']}`}>
                        {listProducts
                            .filter((product) => product.feature === true)
                            .slice(0, 8)
                            .map((product) => {
                                return (
                                    <ProductCard
                                        id={product.id}
                                        productImg={product.images}
                                        price={product.price}
                                        category={product.category}
                                        name={product.name}
                                        key={product.id}
                                        discount={
                                            product.discount != 0
                                                ? product.discount
                                                : null
                                        }
                                        isInCart={product.inCart}
                                        isInWishlist={product.inWishlist}
                                        size={product.size}
                                    />
                                );
                            })}
                    </div>
                ) : (
                    <Spinner />
                )}

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
