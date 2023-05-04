import React from 'react';
import { useGetProducts } from '../../hooks/';
import { FilterSearch, ListProducts } from './modules';
import styles from './Products.module.css';

const Products = () => {
    const { products, currentPage, pageChangeHandler } = useGetProducts();

    return (
        <section className={`${styles['products-section']} section`}>
            <div className={`container ${styles['products-container']}`}>
                <FilterSearch productsRandom={products} />
                <ListProducts
                    products={products}
                    pageChangeHandler={pageChangeHandler}
                    currentPage={currentPage}
                />
            </div>
        </section>
    );
};

export default Products;
