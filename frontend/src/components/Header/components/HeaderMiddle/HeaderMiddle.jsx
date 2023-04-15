import React, { memo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import cart from '../../../../assets/icons/cart.svg';
import user from '../../../../assets/icons/user.svg';

import { Input, ProductCardSearch } from './../../../';
import { CART_PAGE, LOGIN_PAGE } from './../../../../const/';
import styles from './HeaderMiddle.module.css';

import { client } from '../../../../client/client';
import { useAuthContext } from '../../../../context/AuthContext';
import { useLogoutMutation } from '../../../../operations/mutations/';
import { useGetProductsQuery } from '../../../../operations/queries';
import { useDebounce } from './../../../../hooks/';
import JWTManager from './../../../../utils/jwt';

const HeaderMiddle = memo(() => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [isInputFocus, setIsInputFocus] = useState(false);
    const {
        isAuthenticated,
        logoutClient,
        currentUser,
        setIsAuthenticated,
        setCurrentUser,
    } = useAuthContext();
    const { mutate: logoutMutation } = useLogoutMutation();
    const { data } = useGetProductsQuery();

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
        client.resetStore();
        window.location.reload();
    };

    const filteredProducts = data?.products.filter((product) => {
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
    const itemsInCart = currentUser.id
        ? [
              ...new Set(
                  currentUser.cart.itemsInfo.map((cartItem) => cartItem.id)
              ),
          ].length
        : // if different size (keep length of items)
          0;

    return (
        <header>
            <div className={`container grid ${styles['header-middle']}`}>
                <Link to={'/'} className={styles['header-logo']}>
                    San.D Store
                </Link>
                <form method='POST' className={styles['header-form']}>
                    <Input
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
                    {/* <Link
                        to={WISHLIST_PAGE}
                        className={`grid ${styles['header-action-item']}`}
                    >
                        <img src={wishlist} alt='favourite' />
                        <p>
                            Favourite <br /> wishlish
                        </p>
                    </Link> */}
                    {/* Login Start */}
                    {isAuthenticated ? (
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
