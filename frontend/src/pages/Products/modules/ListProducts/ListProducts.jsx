import React, { useState } from 'react';
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

const ListProducts = () => {
    const demoProduct = Array.from({ length: 123 }, (_, index) => [
        {
            id: index,
            productPrice: Math.floor(Math.random() * (249 - 219 + 1)) + 219,
            discount: Math.floor(Math.random() * (70 - 20 + 1)) + 20,
        },
    ]);
    const demoTotalPage = 10;
    const [pageNumbers] = useState(
        Array.from({ length: demoTotalPage }, (_, index) => index + 1)
    );
    const [currentPage, setCurrentPage] = useState(1);
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
                        <h2 className='filter-sort--selected'>Sort by</h2>
                        <ul>
                            <li value='low-to-high'>Price: Low to high</li>
                            <li value='high-to-low'>Price: High to low</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`${styles['products-list']}`}>
                {demoProduct
                    .slice(currentPage * 12, (currentPage + 1) * 12)
                    .map((_, index) => (
                        <ProductCard
                            productId={index}
                            productImg={[product2a, product2b]}
                            key={index}
                        />
                    ))}
            </div>
            <ul>
                {pageNumbers.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        style={{
                            margin: '0.5rem',
                            padding: '0.5rem',
                            borderRadius: '0.25rem',
                            backgroundColor:
                                pageNumber === currentPage
                                    ? '#febd69'
                                    : 'transparent',
                            color:
                                pageNumber === currentPage ? 'white' : 'black',
                            cursor: 'pointer',
                        }}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                ))}
            </ul>
            <div className={`${styles['filter-pagination']}`}>pagination</div>
        </div>
    );
};

export default ListProducts;
