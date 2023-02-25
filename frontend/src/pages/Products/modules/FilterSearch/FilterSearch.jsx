import React from 'react';
import styles from './FilterSearch.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import { categoriesProductsPage } from '../../../../const/categoriesConst';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import { selectProductsShuffle } from '../../../../features/selector';
import { useSelector } from 'react-redux';

const FilterSearch = () => {
    const searchParams = useSearchParams();
    const categoryLink = searchParams[0].get('category');
    const products = useSelector(selectProductsShuffle);

    return (
        <div className={`${styles['filter-container']}`}>
            <nav className={`${styles['categories-sidebar']}`}>
                <div className={`${styles['categories']}`}>
                    <h1>Category</h1>
                    <ul className={`${styles['categories-list']}`}>
                        {categoriesProductsPage.map(
                            ({ category, title }, index) => (
                                <li
                                    key={index}
                                    className={`${styles['categories-item']} ${
                                        categoryLink === category
                                            ? styles['active']
                                            : undefined
                                    }`}
                                >
                                    <Link
                                        to={`?category=${category}`}
                                        className={`${styles['categories-link']}`}
                                    >
                                        {title}
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </nav>
            <div className={`${styles['products-random']}`}>
                <h1>Random Products</h1>
                <div className='products-list'>
                    {products.slice(0, 2).map((product) => (
                        <ProductCard
                            id={product.id}
                            productImg={product.img}
                            price={product.price}
                            category={product.category}
                            title={product.title}
                            key={product.id}
                            discount={
                                product.discount != 0 ? product.discount : null
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSearch;
