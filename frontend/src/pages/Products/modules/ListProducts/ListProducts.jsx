import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './ListProducts.module.css';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import { selectProductsByCategory } from '../../../../features/featureProduct';
import { Pagination, FilterProducts } from './components/';
import { productsPerPage } from './../../../../const/demoProducts';

const ListProducts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = useSearchParams();
    const [filterSortTitle, setFilterSortTitle] = useState(null);
    const [sort, setSort] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(
        searchParams[0].get('category') || 'all'
    );
    const products = useSelector((state) =>
        useMemo(
            () =>
                selectProductsByCategory(
                    state,
                    category,
                    searchParams[0].get('sort') || 'default'
                ),
            [state, category, searchParams[0].get('sort')]
        )
    );
    const isLoading = useSelector((state) => state.featureProduct.isLoading);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setSort(searchParams.get('sort') || 'default');
        setCategory(searchParams.get('category') || 'all');
        setCurrentPage(parseInt(searchParams.get('page')) || 1);
    }, [location.search]);

    useEffect(() => {
        const searchParams = new URLSearchParams();
        if (sort) searchParams.set('sort', sort);
        if (category) searchParams.set('category', category);
        if (currentPage) searchParams.set('page', currentPage.toString());
        navigate({ search: searchParams.toString() });
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

    if (isLoading) return <div>loading...</div>;
    return (
        <div className={`${styles['products-container']}`}>
            <FilterProducts
                filterSortBy={filterSort}
                filterSortTitle={filterSortTitle}
            />
            <div className={`${styles['products-list']}`}>
                {products
                    .slice(
                        (currentPage - 1) * productsPerPage,
                        currentPage * productsPerPage
                    )
                    .map((product, index) => {
                        return (
                            <ProductCard
                                productId={product.id}
                                productImg={product.img}
                                productPrice={product.price}
                                key={index}
                                discount={
                                    product.discount != 0
                                        ? product.discount
                                        : null
                                }
                            />
                        );
                    })}
            </div>
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
