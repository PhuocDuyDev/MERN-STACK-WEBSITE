import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    categoriesAll,
    categoriesFeatured,
    categoriesSale,
} from '../../../../const/categoriesConst';
import styles from './ListProducts.module.css';
import ProductCard from './../../../../components/ProductCard/ProductCard';

import Pagination from './components/Pagination/Pagination';
import { useEffect } from 'react';
import { demoProducts } from './../../../../const/demoProducts';

const ListProducts = () => {
    const [products, setProducts] = useState([...demoProducts]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterSortTitle, setFilterSortTitle] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [sort, setSort] = useState(null);
    const [category, setCategory] = useState(
        new URLSearchParams(location.search).get('category') || 'all'
    );

    const demoProductsPerPage = 12;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setSort(searchParams.get('sort'));
        setCategory(searchParams.get('category'));
        setCurrentPage(parseInt(searchParams.get('page')) || 1);
        setProducts(() => {
            let filteredProducts = [...demoProducts];
            if (category != 'all') {
                filteredProducts = filteredProducts.filter(
                    (product) => product.category == category
                );
            }
            if (sort == 'low-to-high') {
                filteredProducts.sort((a, b) => a.price - b.price);
            }
            if (sort == 'high-to-low') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }
            return [...filteredProducts];
        });
        console.log('first');
    }, [location.search]);

    useEffect(() => {
        const searchParams = new URLSearchParams();
        if (sort) searchParams.set('sort', sort);
        if (category) searchParams.set('category', category);

        if (currentPage) searchParams.set('page', currentPage.toString());
        navigate({ search: searchParams.toString() });
        console.log('second');
    }, [sort, category, currentPage, navigate]);

    const filterSort = (event) => {
        if (event.target.dataset.filter == 'low-to-high') {
            setSort('low-to-high');
        }
        if (event.target.dataset.filter == 'high-to-low') {
            setSort('high-to-low');
        }
        setFilterSortTitle(event.target.textContent);
    };

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={`${styles['products-container']}`}>
            <div className={`${styles['filter-products']}`}>
                <div className={`${styles['filter-category']}`}>
                    <Link
                        to={`?category=${categoriesAll}`}
                        className={`${styles['filter-category-link']} ${styles['active']}`}
                    >
                        All
                    </Link>
                    <Link
                        to={`?category=${categoriesFeatured}`}
                        className={`${styles['filter-category-link']}`}
                    >
                        Featured
                    </Link>
                    <Link
                        to={`?category=${categoriesSale}`}
                        className={`${styles['filter-category-link']}`}
                    >
                        Hot Sale
                    </Link>
                    <div className={`${styles['filter-sort']}`}>
                        <h2 className='filter-sort--selected'>
                            {filterSortTitle ? filterSortTitle : 'Sort by'}
                        </h2>
                        <ul>
                            <li data-filter='low-to-high' onClick={filterSort}>
                                Price: Low to high
                            </li>
                            <li data-filter='high-to-low' onClick={filterSort}>
                                Price: High to low
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`${styles['products-list']}`}>
                {products
                    .slice(
                        (currentPage - 1) * demoProductsPerPage,
                        currentPage * demoProductsPerPage
                    )
                    .map((product, index) => {
                        return (
                            <ProductCard
                                productId={product.id}
                                productImg={product.img}
                                productPrice={product.price}
                                key={index}
                                // discount={
                                //     index % 4 == 0 ? product.discount : ''
                                // }
                            />
                        );
                    })}
            </div>
            <ul className={`${styles['filter-pagination']}`}>
                <Pagination
                    currentPage={currentPage}
                    productsPerPage={demoProductsPerPage}
                    totalProducts={products.length}
                    paginateHandle={onPageChange}
                />
            </ul>
        </div>
    );
};

export default ListProducts;
