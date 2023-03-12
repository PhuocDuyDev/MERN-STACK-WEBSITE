import React from 'react';
import { Link } from 'react-router-dom';
import { categoryFilterVar } from '../../../../client/client';
import { CategoryFilters } from '../../../../models';
import { filterProductsMutations } from '../../../../operations/mutations';
import ProductCard from './../../../../components/ProductCard/ProductCard';
import styles from './FilterSearch.module.css';

const FilterSearch = ({ productsRandom }) => {
    productsRandom = [...productsRandom.slice(0, 2)];
    const { setCategoryFilter } = filterProductsMutations;
    return (
        <div className={`${styles['filter-container']}`}>
            <nav className={`${styles['categories-sidebar']}`}>
                <div className={`${styles['categories']}`}>
                    <h1>Category</h1>
                    <ul className={`${styles['categories-list']}`}>
                        {Object.values(CategoryFilters).map(
                            ({ id, displayName }) => (
                                <li
                                    key={id}
                                    className={`${styles['categories-item']} ${
                                        categoryFilterVar().id === id
                                            ? styles['active']
                                            : undefined
                                    }`}
                                >
                                    <Link
                                        to={`?category=${id}`}
                                        onClick={() => {
                                            setCategoryFilter({
                                                id,
                                                displayName,
                                            });
                                        }}
                                        className={`${styles['categories-link']}`}
                                    >
                                        {displayName}
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
                    {productsRandom.map((product) => (
                        <ProductCard
                            id={product.id}
                            productImg={product.images}
                            price={product.price}
                            category={product.category}
                            title={product.title}
                            key={product.id}
                            discount={
                                product.discount != 0 ? product.discount : null
                            }
                            isInCart={product.inCart}
                            isInWishlist={product.inWishlist}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterSearch;
