import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDebounce } from '../../../../hooks/useDebounce';
import { selectProducts } from './../../../../features/selector';

import cart from '../../../../assets/images/cart.svg';
import user from '../../../../assets/images/user.svg';
import wishlist from '../../../../assets/images/wishlist.svg';

import { ProductCardSearch } from './../../../';
import { CART_PAGE, LOGIN_PAGE, WISHLIST_PAGE } from './../../../../const/';
import styles from './HeaderMiddle.module.css';

import { useAuthContext } from '../../../../context/AuthContext';
import { useLogoutMutation } from '../../../../operations/mutations/';
import JWTManager from './../../../../utils/jwt';

const HeaderMiddle = () => {
    const [search, setSearch] = useState('');
    const [isInputFocus, setIsInputFocus] = useState(false);
    const deboundedSearch = useDebounce(search, 500);
    const products = useSelector(selectProducts);
    const { isAuthenticated, logoutClient, checkAuth } = useAuthContext();
    const [loadingCheckAuth, setLoadingCheckAuth] = useState(true);
    const { setIsAuthenticated } = useAuthContext();
    const { mutate: logoutMutation } = useLogoutMutation();

    useEffect(() => {
        const authenticate = async () => {
            await checkAuth();
            setLoadingCheckAuth(false);
        };
        authenticate();
    }, [checkAuth]);

    const handleInputFocus = () => {
        setIsInputFocus(true);
    };

    const handleInputBlur = () => {
        setIsInputFocus(false);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleLogout = async () => {
        await logoutMutation({
            variables: { userId: JWTManager.getUserId() },
        });
        logoutClient();
        setIsAuthenticated(false);
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
                                No items found. Please try again!
                            </p>
                        )}
                        {/* Product search result end */}
                    </div>
                </form>
                <div className={`grid ${styles['header-action']}`}>
                    <Link
                        to={WISHLIST_PAGE}
                        className={`grid ${styles['header-action-item']}`}
                    >
                        <img src={wishlist} alt='favourite' />
                        <p>
                            Favourite <br /> wishlish
                        </p>
                    </Link>
                    {/* Login Start */}
                    {loadingCheckAuth ? (
                        <h1>loading...</h1>
                    ) : isAuthenticated ? (
                        <div className={styles['menu-user']}>
                            <h2>Duy Tran Phuoc</h2>
                            <ul>
                                <Link to={'/myprofile'}>My account</Link>
                                <Link to={'/myorder'}>My order</Link>
                                <p onClick={handleLogout}>Log out</p>
                            </ul>
                        </div>
                    ) : (
                        <Link
                            to={LOGIN_PAGE}
                            className={`grid ${styles['header-action-item']}`}
                        >
                            <img src={user} alt='user action' />
                            <p>
                                Login <br /> My account
                            </p>
                        </Link>
                    )}

                    {/* Login End */}
                    <Link
                        to={CART_PAGE}
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
