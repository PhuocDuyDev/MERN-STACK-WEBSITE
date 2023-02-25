import React from 'react';
import styles from './ListProducts.module.css';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import { Pagination, FilterProducts } from './components/';

import GridLoader from 'react-spinners/GridLoader';

const ListProducts = ({
    filterSortTitle,
    filterSort,
    currentPage,
    isLoading,
    products,
    onPageChange,
    productsPerPage,
}) => {
    return (
        <div className={`${styles['products-container']}`}>
            <FilterProducts
                filterSortBy={filterSort}
                filterSortTitle={filterSortTitle}
            />
            {isLoading ? (
                <div className={styles['loading-spinner']}>
                    <GridLoader color='#febd69' />
                </div>
            ) : null}
            {!isLoading ? (
                <div className={`${styles['products-list']}`}>
                    {products
                        .slice(
                            (currentPage - 1) * productsPerPage,
                            currentPage * productsPerPage
                        )
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
                                />
                            );
                        })}
                </div>
            ) : null}
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
