import React from 'react';
import styles from './FilterSearch.module.css';
import { Link } from 'react-router-dom';
import { categoriesProductsPage } from '../../../../const/categoriesConst';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import product2a from '../../../../assets/images/product-2-1.jpg';
import product2b from '../../../../assets/images/product-2-2.jpg';

const FilterSearch = () => {
    const productImg = [product2a, product2b];
    return (
        <div className={`${styles['filter-container']}`}>
            <nav className={`${styles['categories-sidebar']}`}>
                <div className={`${styles['categories']}`}>
                    <h1>Category</h1>
                    <ul className={`${styles['categories-list']}`}>
                        {categoriesProductsPage.map(
                            ({ type, title }, index) => (
                                <li
                                    key={index}
                                    className={`${styles['categories-item']}`}
                                >
                                    <Link
                                        to={`?category=${type}`}
                                        className={`${styles['categories-link']}`}
                                    >
                                        {title}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </nav>
            <div className={`${styles['products-random']}`}>
                <h1>Random Products</h1>
                <div className='products-list'>
                    {[0, 1].fill(0).map((_, index) => (
                        <ProductCard
                            key={index}
                            productImg={productImg}
                            productId={index}
                            sale={index % 2 == 0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSearch;
