import React from 'react';
import { Link } from 'react-router-dom';
import { sortFilterVar } from '../../../../client/client';

import { ProductCard } from '../../../../components';
import { CategoryFilters } from '../../../../models';
import { filterProductsMutations } from '../../../../operations/mutations';
import { categoriesSale, PRODUCTS_PAGE } from './../../../../const/';
import styles from './SaleProducts.module.css';

const SaleProducts = ({ listProducts }) => {
    const { setCategoryFilter } = filterProductsMutations;
    return (
        <section className={`${styles['sale-section']} section`}>
            <div className={`container ${styles['sale']}`}>
                <h1 className='section-heading'>On Sale</h1>
                <div className={`grid ${styles['sale-products']}`}>
                    {listProducts
                        .filter((product) => product.discount > 0)
                        .slice(0, 8)
                        .map((product) => {
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
                    to={`${PRODUCTS_PAGE}?category=${categoriesSale}`}
                    onClick={() =>
                        setCategoryFilter(
                            {
                                ...Object.values(CategoryFilters).find(
                                    (category) => category.id === categoriesSale
                                ),
                            } || { ...CategoryFilters.ALL }
                        )
                    }
                    className={`${styles['sale-btn']} see-more-btn`}
                >
                    See More
                </Link>
            </div>
        </section>
    );
};

export default SaleProducts;
