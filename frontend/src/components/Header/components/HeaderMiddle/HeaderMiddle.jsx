import React, { useEffect, useState, memo } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import cart from '../../../../assets/images/cart.svg';
import user from '../../../../assets/images/user.svg';
import wishlist from '../../../../assets/images/wishlist.svg';

import { ProductCardSearch, Spinner } from './../../../';
import { CART_PAGE, LOGIN_PAGE, WISHLIST_PAGE } from './../../../../const/';
import styles from './HeaderMiddle.module.css';

import { productsVar } from '../../../../client/client';
import { useAuthContext } from '../../../../context/AuthContext';
import { useLogoutMutation } from '../../../../operations/mutations/';
import { useDebounce } from './../../../../hooks/useDebounce';
import JWTManager from './../../../../utils/jwt';

const HeaderMiddle = memo(() => {
    console.log('HeaderMiddle re-render');
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [isInputFocus, setIsInputFocus] = useState(false);
    const {
        isAuthenticated,
        logoutClient,
        checkAuth,
        currentUser,
        setIsAuthenticated,
        setCurrentUser,
    } = useAuthContext();
    const [loadingCheckAuth, setLoadingCheckAuth] = useState(true);
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
        setCurrentUser(false);
        setIsAuthenticated(false);
    };

    const filteredProducts = productsVar()?.filter((product) => {
        const productName = product.name.toLowerCase();
        const searchName =
            debouncedSearch == '' ? null : debouncedSearch.toLowerCase(); // add guard clause here

        return productName.includes(searchName);
    });

    const priceOfCart = currentUser.id
        ? currentUser.cart.itemsInfo.reduce((prev, curr) => {
              const priceDiscount = Math.round(
                  curr.price - (curr.price * curr.discount) / 100
              );
              return curr.discount
                  ? prev + priceDiscount * curr.quantity
                  : prev + curr.price * curr.quantity;
          }, 0)
        : 0;
    const itemsInCart = currentUser.id ? currentUser.cart.itemsInfo.length : 0;

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
                        {filteredProducts?.length > 0 ? (
                            filteredProducts.map((product) => {
                                return (
                                    <ProductCardSearch
                                        key={product.id}
                                        id={product.id}
                                        img={product.images}
                                        price={product.price}
                                        name={product.name}
                                        discount={product.discount}
                                    />
                                );
                            })
                        ) : (
                            <p className={`${styles['message']}`}>
                                No items found. Please try again!
                            </p>
                        )}
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
                        <Spinner />
                    ) : isAuthenticated ? (
                        <div className={styles['menu-user']}>
                            <h2>{currentUser.name}</h2>
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
                                {itemsInCart}
                            </span>
                            <br /> ${currentUser.id ? priceOfCart : 0}
                        </p>
                    </Link>
                </div>
            </div>
        </header>
    );
});

export default HeaderMiddle;
