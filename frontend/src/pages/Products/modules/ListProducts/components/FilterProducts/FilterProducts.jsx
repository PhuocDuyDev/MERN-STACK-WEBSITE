import React from 'react';
import { Link } from 'react-router-dom';
import { categoryFilterVar } from '../../../../../../client/client';
import {
    categoriesAll,
    categoriesFeature,
    categoriesSale
} from '../../../../../../const/';
import { SortFilters } from '../../../../../../models';
import { sortFilterVar } from './../../../../../../client/client';
import { filterProductsMutations } from './../../../../../../operations/mutations/index';
import styles from './FilterProducts.module.css';

const FilterProducts = () => {
    const { setSortFilter } = filterProductsMutations;
    return (
        <div className={`${styles['filter-products']}`}>
            <div className={`${styles['filter-category']}`}>
                <Link
                    to={`?category=${categoriesAll}`}
                    className={`${styles['filter-category-link']} ${
                        categoryFilterVar().id === categoriesAll
                            ? styles['active']
                            : undefined
                    }`}
                >
                    All
                </Link>
                <Link
                    to={`?category=${categoriesFeature}`}
                    className={`${styles['filter-category-link']} ${
                        categoryFilterVar().id === categoriesFeature
                            ? styles['active']
                            : undefined
                    }`}
                >
                    Featured
                </Link>
                <Link
                    to={`?category=${categoriesSale}`}
                    className={`${styles['filter-category-link']} ${
                        categoryFilterVar().id === categoriesSale
                            ? styles['active']
                            : undefined
                    }`}
                >
                    Hot Sale
                </Link>
                <div className={`${styles['filter-sort']}`}>
                    <h2 className='filter-sort--selected'>
                        {sortFilterVar().displayName}
                    </h2>
                    <ul>
                        {Object.values(SortFilters).map(
                            ({ id, displayName }) => (
                                <Link
                                    to={`?category=${
                                        categoryFilterVar().id
                                    }&sort=${id}`}
                                    key={id}
                                    onClick={() => {
                                        setSortFilter({ id, displayName });
                                    }}
                                >
                                    {displayName}
                                </Link>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FilterProducts;
