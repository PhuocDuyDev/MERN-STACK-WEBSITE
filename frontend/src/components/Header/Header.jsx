import React from 'react';
import { Link } from 'react-router-dom';

import { PRODUCTS_PAGE } from '../../const/NavigateConst';

import styles from './Header.module.css';

import { CiSearch } from 'react-icons/ci';
import wishlist from '../../assets/images/wishlist.svg';
import user from '../../assets/images/user.svg';
import cart from '../../assets/images/cart.svg';
import productImg1 from '../../assets/images/product-1-1.jpg';
import productImg2 from '../../assets/images/product-2-1.jpg';

const Header = () => {
    return (
        <>
            <header>
                <div className={`container grid ${styles['header-top']}`}>
                    <p>Free Shipping Over $100 & Free Returns</p>
                    <p className='text-align-right'>
                        Hotline:{' '}
                        <Link href='tel:+84 334820317'>+84 334820317</Link>
                    </p>
                </div>
            </header>
            <header>
                <div className={`container grid ${styles['header-middle']}`}>
                    <Link to={'/'} className={styles['header-logo']}>San.D Store</Link>
                    <form method='POST' className={styles['header-form']}>
                        <input
                            type='text'
                            placeholder='Search product here...'
                        />
                        <button className={`btn ${styles['header-form-icon']}`}>
                            <CiSearch />
                        </button>
                        <div className={`${styles['product-result']}`}>
                            {/* Product search result */}
                            <Link
                                to={'/products/1'}
                                className={`${styles['product-card']}`}
                            >
                                <img src={productImg1} alt='product card' />
                                <div className={`${styles['product-content']}`}>
                                    <h2 className={`${styles['product-name']}`}>
                                        Apple watch series 6 2022 New Seal
                                    </h2>
                                    <div
                                        className={`${styles['product-price']}`}
                                    >
                                        <div>
                                            <span
                                                className={`${styles['product-price--sale']}`}
                                            >
                                                $99.29
                                            </span>
                                            <span
                                                className={`${styles['product-price--original']}`}
                                            >
                                                $109.99
                                            </span>
                                        </div>
                                        <button className='add-to-cart-btn btn'>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to={'/products/2'}
                                className={`${styles['product-card']}`}
                            >
                                <img src={productImg2} alt='product card' />
                                <div className={`${styles['product-content']}`}>
                                    <h2 className={`${styles['product-name']}`}>
                                        Apple watch series 6 2022 New Seal
                                    </h2>
                                    <div
                                        className={`${styles['product-price']}`}
                                    >
                                        <span
                                            className={`${styles['product-price--sale']}`}
                                        >
                                            $99.29
                                        </span>
                                        <span
                                            className={`${styles['product-price--original']}`}
                                        >
                                            $109.99
                                        </span>
                                        <button className='add-to-cart-btn btn'>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                            {/* Product search result end */}
                        </div>
                    </form>
                    <div className={`grid ${styles['header-action']}`}>
                        <Link
                            to={'/favourite'}
                            className={`grid ${styles['header-action-item']}`}
                        >
                            <img src={wishlist} alt='favourite' />
                            <p>
                                Favourite <br /> wishlish
                            </p>
                        </Link>
                        <Link
                            to={'/login'}
                            className={`grid ${styles['header-action-item']}`}
                        >
                            <img src={user} alt='user action' />
                            <p>
                                Login <br /> My account
                            </p>
                        </Link>
                        <Link
                            to={'/cart'}
                            className={`grid ${styles['header-action-item']}`}
                        >
                            <img src={cart} alt='cart item' />
                            <p>
                                <span
                                    className={`${styles['cart-item-number']}`}
                                >
                                    0
                                </span>
                                <br /> $500
                            </p>
                        </Link>
                    </div>
                </div>
            </header>
            <header>
                <div className={`container grid ${styles['header-bottom']}`}>
                    <ul>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={PRODUCTS_PAGE}>Our Store</Link>
                        </li>
                        <li>
                            <Link to={'/contact'}>Contact</Link>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
};

export default Header;
