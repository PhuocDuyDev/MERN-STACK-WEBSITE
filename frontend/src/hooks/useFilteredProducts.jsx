import { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { selectProductsFiltered } from '../features/selector';
import { useDebounce } from './useDebounce';

export const useFilteredProducts = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = useSearchParams();
    const [sort, setSort] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterSortTitle, setFilterSortTitle] = useState(null);
    const [category, setCategory] = useState(
        searchParams[0].get('category') || 'all'
    );
    const isLoading = useSelector((state) => state.featureProduct.isLoading); // real world
    const { products, productsPerPage } = useSelector(
        (state) =>
            selectProductsFiltered(state)(
                category,
                searchParams[0].get('sort') || 'default'
            ),
        shallowEqual
    );

    const debouncedSort = useDebounce(sort, 500);
    const debouncedCategory = useDebounce(category, 500);
    const debouncedCurrentPage = useDebounce(currentPage, 500);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setSort(searchParams.get('sort') || 'default');
        setFilterSortTitle(
            searchParams.get('sort') ? filterSortTitle : 'Sort by'
        );
        setCategory(searchParams.get('category') || 'all');
        setCurrentPage(parseInt(searchParams.get('page')) || 1);
    }, [location.search]);

    useEffect(() => {
        const searchParams = new URLSearchParams();
        if (debouncedSort) searchParams.set('sort', debouncedSort);
        if (debouncedCategory) {
            searchParams.set('category', debouncedCategory);
        }
        if (debouncedCurrentPage)
            searchParams.set('page', debouncedCurrentPage.toString());
        navigate({ search: searchParams.toString() });
    }, [debouncedSort, debouncedCategory, debouncedCurrentPage, navigate]);

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
    return {
        filterSort,
        filterSortTitle,
        currentPage,
        isLoading,
        products,
        onPageChange,
        productsPerPage,
    };
};
