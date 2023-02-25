import React from 'react';
// import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './Products.module.css';
import { FilterSearch, ListProducts } from './modules';
import { useFilteredProducts } from './../../hooks/useFilteredProducts';

const Products = () => {
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
        <section className={`${styles['products-section']} section`}>
            <div className={`container ${styles['products-container']}`}>
                <FilterSearch />
                <ListProducts
                    filterSortTitle={filterSortTitle}
                    filterSort={filterSort}
                    currentPage={currentPage}
                    isLoading={isLoading}
                    products={products}
                    onPageChange={onPageChange}
                    productsPerPage={productsPerPage}
                />
            </div>
        </section>
    );
};

export default Products;
