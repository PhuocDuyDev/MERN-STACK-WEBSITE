import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
    categoriesAll,
    categoriesFeatured,
    categoriesSale,
} from '../../../../../../const/categoriesConst';
import styles from './FilterProducts.module.css';

const FilterProducts = ({ filterSortTitle, filterSortBy }) => {
    const searchParams = useSearchParams();
    const categoryLink = searchParams[0].get('category');

    return (
        <div className={`${styles['filter-products']}`}>
            <div className={`${styles['filter-category']}`}>
                <Link
                    to={`?category=${categoriesAll}`}
                    // className={({ isActive }) => {
                    //     console.log(isActive);
                    //     return `${styles['filter-category-link']} ${}`;
                    // }}
                    className={`${styles['filter-category-link']} ${
                        categoryLink === categoriesAll
                            ? styles['active']
                            : undefined
                    }`}
                >
                    All
                </Link>
                <Link
                    to={`?category=${categoriesFeatured}`}
                    className={`${styles['filter-category-link']} ${
                        categoryLink === categoriesFeatured
                            ? styles['active']
                            : undefined
                    }`}
                >
                    Featured
                </Link>
                <Link
                    to={`?category=${categoriesSale}`}
                    className={`${styles['filter-category-link']} ${
                        categoryLink === categoriesSale
                            ? styles['active']
                            : undefined
                    }`}
                >
                    Hot Sale
                </Link>
                <div className={`${styles['filter-sort']}`}>
                    <h2 className='filter-sort--selected'>
                        {filterSortTitle ? filterSortTitle : 'Sort by'}
                    </h2>
                    <ul>
                        <li data-filter='low-to-high' onClick={filterSortBy}>
                            Price: Low to high
                        </li>
                        <li data-filter='high-to-low' onClick={filterSortBy}>
                            Price: High to low
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FilterProducts;
