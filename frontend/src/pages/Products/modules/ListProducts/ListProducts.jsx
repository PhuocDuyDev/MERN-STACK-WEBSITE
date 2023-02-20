import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import {
    categoriesAll,
    categoriesFeatured,
    categoriesSale,
} from '../../../../const/categoriesConst';
import styles from './ListProducts.module.css';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import product2a from '../../../../assets/images/product-2-1.jpg';
import product2b from '../../../../assets/images/product-2-2.jpg';
import Pagination from './components/Pagination/Pagination';
import { useEffect } from 'react';

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterSortTitle, setFilterSortTitle] = useState(null);

    const demoProductsPerPage = 12;
    const demoProductsQuantity = 101;
    const demoProducts = useMemo(
        () =>
            Array.from({ length: demoProductsQuantity }, (_, index) => ({
                id: index,
                img: [product2a, product2b],
                price: Math.floor(Math.random() * (249 - 169 + 1)) + 169,
                discount: Math.floor(Math.random() * (50 - 10 + 1)) + 10,
            })),
        []
    );

    useEffect(() => {
        setProducts([...demoProducts]);
    }, []);

    const filterSort = (event) => {
        if (event.target.dataset.filter == 'low-to-high') {
            setProducts([...products.sort((a, b) => a.price - b.price)]);
        }
        if (event.target.dataset.filter == 'high-to-low') {
            setProducts([...products.sort((a, b) => b.price - a.price)]);
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
                                discount={
                                    index % 2 == 0 ? product.discount : ''
                                }
                            />
                        );
                    })}
            </div>
            <ul className={`${styles['filter-pagination']}`}>
                <Pagination
                    currentPage={currentPage}
                    productsPerPage={demoProductsPerPage}
                    totalProducts={demoProductsQuantity}
                    paginateHandle={onPageChange}
                />
            </ul>
        </div>
    );
};

export default ListProducts;
