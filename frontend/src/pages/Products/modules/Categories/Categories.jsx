import React from 'react';
import styles from './Categories.module.css';
import { Link } from 'react-router-dom';
import { PRODUCTS_PAGE } from './../../../../const/NavigateConst';
import {
    categoriesAll,
    categoriesDresses,
    categoriesJacket,
    categoriesJean,
    categoriesSanD,
    categoriesTShirt,
} from './../../../../const/categoriesConst';

const Categories = () => {
    return (
        <sidebar className={`${styles['categories-sidebar']}`}>
            <ul className={`${styles['categories-list']}`}>
                <li className={`${styles['categories-item']}`}>
                    <Link
                        to={`${PRODUCTS_PAGE}/products?category=${categoriesAll}`}
                        className={`${styles['categories-link']}`}
                    >
                        All Products
                    </Link>
                </li>
                <li className={`${styles['categories-item']}`}>
                    <Link
                        to={`${PRODUCTS_PAGE}/products?category=${categoriesSanD}`}
                        className={`${styles['categories-link']}`}
                    >
                        San.D
                    </Link>
                </li>
                <li className={`${styles['categories-item']}`}>
                    <Link
                        to={`${PRODUCTS_PAGE}/products?category=${categoriesTShirt}`}
                        className={`${styles['categories-link']}`}
                    >
                        T-Shirt
                    </Link>
                </li>
                <li className={`${styles['categories-item']}`}>
                    <Link
                        to={`${PRODUCTS_PAGE}/products?category=${categoriesJean}`}
                        className={`${styles['categories-link']}`}
                    >
                        Jean
                    </Link>
                </li>
                <li className={`${styles['categories-item']}`}>
                    <Link
                        to={`${PRODUCTS_PAGE}/products?category=${categoriesDresses}`}
                        className={`${styles['categories-link']}`}
                    >
                        Dresses
                    </Link>
                </li>
                <li className={`${styles['categories-item']}`}>
                    <Link
                        to={`${PRODUCTS_PAGE}/products?category=${categoriesJacket}`}
                        className={`${styles['categories-link']}`}
                    >
                        Jacket
                    </Link>
                </li>
            </ul>
        </sidebar>
    );
};

export default Categories;
