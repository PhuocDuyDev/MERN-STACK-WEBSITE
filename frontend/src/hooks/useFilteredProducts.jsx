import { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { selectProductsFiltered } from '../features/selector';
import { fetchDemoProducts } from '../features/featureProduct';

export const useFilteredProducts = () => {
    const dispatch = useDispatch();
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

    const handleCategoryChange = (category) => {
        dispatch(fetchDemoProducts(category));
    };

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
        if (sort) searchParams.set('sort', sort);
        if (category) {
            searchParams.set('category', category);
            handleCategoryChange(category);
        }
        if (currentPage) {
            searchParams.set('page', currentPage.toString());
        }
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
