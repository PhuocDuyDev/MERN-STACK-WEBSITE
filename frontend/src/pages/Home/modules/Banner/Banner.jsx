import React from 'react';
import { Link } from 'react-router-dom';
import jeanImg from '../../../../assets/images/jean.jpg';
import tshirtImg from '../../../../assets/images/tshirt.jpg';
import jacketImg from '../../../../assets/images/jacket.jpg';
import dressesImg from '../../../../assets/images/dresses.jpg';
import mainBanner from '../../../../assets/images/main-banner-1.png';
import { MyImage } from '../../../../components';
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
                        <MyImage
                            src={mainBanner}
                            alt='mainBanner'
                            classNames={styles['img-lazy']}
                        />

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
                        <MyImage
                            src={tshirtImg}
                            alt='category t-shirt'
                            classNames={styles['img-lazy']}
                        />
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
                        <MyImage
                            src={dressesImg}
                            alt='category dress'
                            classNames={styles['img-lazy']}
                        />

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
                        <MyImage
                            src={jeanImg}
                            alt='category jean'
                            classNames={styles['img-lazy']}
                        />

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
                        <MyImage
                            src={jacketImg}
                            alt='category jacket'
                            classNames={styles['img-lazy']}
                        />

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
