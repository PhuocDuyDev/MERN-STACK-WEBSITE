import React, { useState } from 'react';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import { FilterProducts, Pagination } from './components/';
import styles from './ListProducts.module.css';

import { PRODUCTS_PER_PAGE } from './../../../../const/index';

const ListProducts = ({ products, pageChangeHandler, currentPage }) => {
    return (
        <div className={`${styles['products-container']}`}>
            <FilterProducts />
            <div className={`${styles['products-list']}`}>
                {products
                    .slice(
                        (currentPage - 1) * PRODUCTS_PER_PAGE,
                        currentPage * PRODUCTS_PER_PAGE
                    )
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
                            />
                        );
                    })}
            </div>

            <ul className={`${styles['filter-pagination']}`}>
                <Pagination
                    currentPage={currentPage}
                    productsPerPage={PRODUCTS_PER_PAGE}
                    totalProducts={products.length}
                    pageChangeHandler={pageChangeHandler}
                />
            </ul>
        </div>
    );
};

export default ListProducts;
