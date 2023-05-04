import React from 'react';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import { FilterProducts, Pagination } from './components/';
import styles from './ListProducts.module.css';

import { Spinner } from '../../../../components';
import { PRODUCTS_PER_PAGE } from './../../../../const/index';

const ListProducts = ({ products, pageChangeHandler, currentPage }) => {
    const listProduct = products.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );
    
    return (
        <div className={`${styles['products-container']}`}>
            <FilterProducts />
            {listProduct?.length > 0 ? (
                <div className={`${styles['products-list']}`}>
                    {listProduct.map((product) => {
                        return (
                            <ProductCard
                                id={product.id}
                                productImg={product.images}
                                price={product.price}
                                category={product.category}
                                name={product.name}
                                description={product.description}
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

            <ul className={`${styles['filter-pagination']}`}>
                {products?.length ? (
                    <Pagination
                        currentPage={currentPage}
                        productsPerPage={PRODUCTS_PER_PAGE}
                        totalProducts={products.length}
                        pageChangeHandler={pageChangeHandler}
                    />
                ) : null}
            </ul>
        </div>
    );
};

export default ListProducts;
