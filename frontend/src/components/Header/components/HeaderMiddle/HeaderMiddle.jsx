import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { useDebounce } from '../../../../hooks/useDebounce';
import { selectProducts } from './../../../../features/selector';

import wishlist from '../../../../assets/images/wishlist.svg';
import user from '../../../../assets/images/user.svg';
import cart from '../../../../assets/images/cart.svg';

import styles from './HeaderMiddle.module.css';
import { ProductCardSearch } from './../../../';

const HeaderMiddle = () => {
    const [search, setSearch] = useState('');
    const [isInputFocus, setIsInputFocus] = useState(false);
    const deboundedSearch = useDebounce(search, 500);
    const products = useSelector(selectProducts);

    const handleInputFocus = () => {
        setIsInputFocus(true);
    };

    const handleInputBlur = () => {
        setIsInputFocus(false);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredProducts = products.filter((product) => {
        const productTitle = product.title.toLowerCase();
        const searchName =
            deboundedSearch == '' ? null : deboundedSearch.toLowerCase(); // add guard clause here

        return productTitle.includes(searchName);
    });
    return (
        <header>
            <div className={`container grid ${styles['header-middle']}`}>
                <Link to={'/'} className={styles['header-logo']}>
                    San.D Store
                </Link>
                <form method='POST' className={styles['header-form']}>
                    <input
                        type='text'
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder='Search product here...'
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <button className={`btn ${styles['header-form-icon']}`}>
                        <CiSearch />
                    </button>

                    <div
                        className={`${styles['product-result']} ${
                            isInputFocus ? styles['show'] : null
                        }`}
                    >
                        {/* Product search result */}
                        {filteredProducts?.length > 0 ? (
                            filteredProducts.map((product) => {
                                return (
                                    <ProductCardSearch
                                        key={product.id}
                                        id={product.id}
                                        img={product.img}
                                        price={product.price}
                                        title={product.title}
                                        discount={product.discount}
                                    />
                                );
                            })
                        ) : (
                            <p className={`${styles['message']}`}>
                                No items found. Search something in here!
                            </p>
                        )}
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
                            <span className={`${styles['cart-item-number']}`}>
                                0
                            </span>
                            <br /> $500
                        </p>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default HeaderMiddle;
