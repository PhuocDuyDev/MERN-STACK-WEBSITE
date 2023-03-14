import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    categoryFilterVar,
    productsVar,
    sortFilterVar
} from '../../client/client';
import { CategoryFilters, SortFilters } from '../../models';
import {
    filterProductByCategory,
    filterProductsBySort,
    filterProductsMutations
} from '../../operations/mutations';
import { useGetProductsQuery } from '../../operations/queries';
import { FilterSearch, ListProducts } from './modules';
import styles from './Products.module.css';

const Products = () => {
    const { data } = useGetProductsQuery();
    const [search, setSearch] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        parseInt(search.get('page')) || 1
    );
    const navigate = useNavigate();
    const { setCategoryFilter, setSortFilter } = filterProductsMutations;

    useEffect(() => {
        const categoryFilter = Object.values(CategoryFilters).find(
            ({ id }) => id == search.get('category')
        );

        setCategoryFilter(
            categoryFilter ? { ...categoryFilter } : { ...CategoryFilters.ALL }
        );
        const sortFilter = Object.values(SortFilters).find(
            ({ id }) => id == search.get('sort')
        );

        setSortFilter(
            sortFilter ? { ...sortFilter } : { ...SortFilters.DEFAULT }
        );

        navigate(
            `?category=${categoryFilterVar().id}&sort=${
                sortFilterVar().id
            }&page=${currentPage}`
        );
    }, [search, currentPage]);

    const pageChangeHandler = (numPage) => {
        setCurrentPage(numPage);
    };

    productsVar(data?.products);
    if (productsVar()?.length > 0) {
        productsVar(
            filterProductsBySort(
                sortFilterVar(),
                filterProductByCategory(categoryFilterVar(), productsVar())
            )
        );
    }
    return (
        <section className={`${styles['products-section']} section`}>
            <div className={`container ${styles['products-container']}`}>
                <FilterSearch productsRandom={productsVar()} />
                <ListProducts
                    products={productsVar()}
                    pageChangeHandler={pageChangeHandler}
                    currentPage={currentPage}
                />
            </div>
        </section>
    );
};

export default Products;
