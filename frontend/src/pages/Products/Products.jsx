import React from 'react';
// import { useLocation, useSearchParams } from 'react-router-dom';
import styles from './Products.module.css';
import { FilterSearch, ListProducts } from './modules';

const Products = () => {
    // const [filter, _] = useSearchParams();
    // const a = filter.get('category');
    // console.log(a);

    return (
        <section className={`${styles['products-section']} section`}>
            <div className={`container ${styles['products-container']}`}>
                <FilterSearch />
                <ListProducts />
            </div>
        </section>
    );
};

export default Products;
