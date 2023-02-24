import React from 'react';
import styles from './ListProducts.module.css';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import { Pagination, FilterProducts } from './components/';
import { useFilteredProducts } from '../../../../hooks/useFilteredProducts';
import { productsPerPage } from './../../../../const/demoProducts';

import GridLoader from 'react-spinners/GridLoader';

const ListProducts = () => {
    const {
        filterSortTitle,
        filterSort,
        currentPage,
        isLoading,
        products,
        onPageChange,
        productsPerPage,
    } = useFilteredProducts();

    return (
        <div className={`${styles['products-container']}`}>
            <FilterProducts
                filterSortBy={filterSort}
                filterSortTitle={filterSortTitle}
            />
            {isLoading && (
                <div className={styles['loading-spinner']}>
                    <GridLoader color='#febd69' />
                </div>
            )}
            <div className={`${styles['products-list']}`}>
                {!isLoading &&
                    products
                        .slice(
                            (currentPage - 1) * productsPerPage,
                            currentPage * productsPerPage
                        )
                        .map((product, index) => {
                            return (
                                <ProductCard
                                    productId={product.id}
                                    productImg={product.img}
                                    productPrice={product.price}
                                    key={index}
                                    discount={
                                        product.discount != 0
                                            ? product.discount
                                            : null
                                    }
                                />
                            );
                        })}
            </div>
            <ul className={`${styles['filter-pagination']}`}>
                <Pagination
                    currentPage={currentPage}
                    productsPerPage={productsPerPage}
                    totalProducts={products.length}
                    paginateHandle={onPageChange}
                />
            </ul>
        </div>
    );
};

export default ListProducts;
