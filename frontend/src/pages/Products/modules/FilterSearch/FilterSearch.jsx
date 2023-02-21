import React from 'react';
import styles from './FilterSearch.module.css';
import { Link } from 'react-router-dom';
import { categoriesProductsPage } from '../../../../const/categoriesConst';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import { demoProducts } from './../../../../const/demoProducts';

const FilterSearch = () => {
    const randomProduct = Math.floor(Math.random() * 99);
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
                    {demoProducts
                        .slice(randomProduct, randomProduct + 2)
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                productPrice={product.price}
                                productImg={product.img}
                                productId={product.id}
                                // discount={product.discount}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSearch;
