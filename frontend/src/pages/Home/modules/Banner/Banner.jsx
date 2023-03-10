import React from 'react';
import { Link } from 'react-router-dom';
import rightBanner1 from '../../../../assets/images/category-01.jpg';
import rightBanner2 from '../../../../assets/images/category-02.jpg';
import rightBanner3 from '../../../../assets/images/category-03.jpg';
import rightBanner4 from '../../../../assets/images/category-04.jpg';
import mainBanner from '../../../../assets/images/main-banner-1.png';
import { PRODUCTS_PAGE } from '../../../../const/';
import { CategoryFilters } from '../../../../models';
import { filterProductsMutations } from '../../../../operations/mutations';
import {
    categoriesAll,
    categoriesDresses,
    categoriesJacket,
    categoriesJean,
    categoriesTShirt,
} from './../../../../const/';
import styles from './Banner.module.css';

const Banner = () => {
    const { setCategoryFilter } = filterProductsMutations;
    return (
        <section className='container section'>
            <div className={`grid ${styles['banner']}`}>
                <div className={styles['banner-left']}>
                    <div className={`${styles['banner-left-img']}`}>
                        <img src={mainBanner} alt='banner big' />
                        <div className={`${styles['banner-left-content']}`}>
                            <Link
                                to={`${PRODUCTS_PAGE}?category=${categoriesAll}`}
                                onClick={() =>
                                    setCategoryFilter({
                                        ...Object.values(CategoryFilters).find(
                                            (category) =>
                                                category.id === categoriesAll
                                        ),
                                    }) || { ...CategoryFilters.ALL }
                                }
                                className={`btn ${styles['button-content']}`}
                            >
                                San.D Store
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`grid ${styles['banner-right']}`}>
                    <div className={`${styles['banner-right-img']}`}>
                        <img src={rightBanner1} alt='banner big' />
                        <div className={`${styles['banner-right-content']}`}>
                            <Link
                                to={`${PRODUCTS_PAGE}?category=${categoriesTShirt}`}
                                onClick={() =>
                                    setCategoryFilter({
                                        ...Object.values(CategoryFilters).find(
                                            (category) =>
                                                category.id === categoriesTShirt
                                        ),
                                    }) || { ...CategoryFilters.ALL }
                                }
                                className={`btn ${styles['button-content']}`}
                            >
                                T-Shirt
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles['banner-right-img']}`}>
                        <img src={rightBanner2} alt='banner big' />
                        <div className={`${styles['banner-right-content']}`}>
                            <Link
                                to={`${PRODUCTS_PAGE}?category=${categoriesDresses}`}
                                onClick={() =>
                                    setCategoryFilter({
                                        ...Object.values(CategoryFilters).find(
                                            (category) =>
                                                category.id ===
                                                categoriesDresses
                                        ),
                                    }) || { ...CategoryFilters.ALL }
                                }
                                className={`btn ${styles['button-content']}`}
                            >
                                Dresses
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles['banner-right-img']}`}>
                        <img src={rightBanner3} alt='banner big' />
                        <div className={`${styles['banner-right-content']}`}>
                            <Link
                                to={`${PRODUCTS_PAGE}?category=${categoriesJean}`}
                                onClick={() =>
                                    setCategoryFilter({
                                        ...Object.values(CategoryFilters).find(
                                            (category) =>
                                                category.id === categoriesJean
                                        ),
                                    }) || { ...CategoryFilters.ALL }
                                }
                                className={`btn ${styles['button-content']}`}
                            >
                                Jeans
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles['banner-right-img']}`}>
                        <img src={rightBanner4} alt='banner big' />
                        <div className={`${styles['banner-right-content']}`}>
                            <Link
                                to={`${PRODUCTS_PAGE}?category=${categoriesJacket}`}
                                onClick={() =>
                                    setCategoryFilter({
                                        ...Object.values(CategoryFilters).find(
                                            (category) =>
                                                category.id === categoriesJacket
                                        ),
                                    }) || { ...CategoryFilters.ALL }
                                }
                                className={`btn ${styles['button-content']}`}
                            >
                                Jacket
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
