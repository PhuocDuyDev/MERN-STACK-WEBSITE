import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { currentUser } = useAuthContext();
    // const cartItems = currentUser.cart.itemsInfo;
    const wishlistIds = currentUser.wishlist.items.map(
        ({ productId }) => productId
    );

    // using Object.values to get values from object and convert it to array
    const cartItems = Object.values(
        currentUser.cart.itemsInfo.reduce((acc, cartItem) => {
            const { id, quantity, sizeProductUser, ...itemInfo } = cartItem;

            // id in acc (acc is object temp).
            // push new object contain quantity and sizeProductUser
            // if not : create new object contain all info with id is a key
            id in acc
                ? acc[id].cartInfo.push({
                      quantity,
                      sizeProductUser,
                  })
                : (acc[id] = {
                      id,
                      ...itemInfo,
                      cartInfo: [
                          {
                              quantity,
                              sizeProductUser,
                          },
                      ],
                  });
            return acc;
        }, {})
    );

    // console.log(cartItems);

    return (
        <div className={styles['cart']}>
            <div className={`container ${styles['cart-container']}`}>
                <div className={styles['cart-infomation']}>
                    <h1>Shopping cart</h1>
                    <div className={styles['cart-list']}>
                        <div className={styles['cart-fields']}>
                            <h4>Images</h4>
                            <h4>Name</h4>
                            <h4>Size</h4>
                            <h4>Quantity</h4>
                            <h4>Price</h4>
                        </div>
                        <div className={styles['cart-box']}>
                            <div className={styles['cart-box-img']}>
                                <img
                                    src={cartItems[0].images[0]}
                                    alt={cartItems[0].name}
                                />
                            </div>
                            <h4 className={styles['cart-box-name']}>
                                {cartItems[0].name}
                            </h4>
                            <div className={styles['cart-box-size']}>
                                {cartItems[0].cartInfo.map(
                                    ({ sizeProductUser }) => (
                                        <p key={sizeProductUser}>
                                            {sizeProductUser}
                                        </p>
                                    )
                                )}
                            </div>
                            <div className={styles['cart-box-quantity']}>
                                {cartItems[0].cartInfo.map(({ quantity }) => (
                                    <p key={quantity}>{quantity}</p>
                                ))}
                            </div>
                            <p className={styles['cart-box-price']}>
                                {cartItems[0].price}
                            </p>
                        </div>
                    </div>
                    <Link className={styles['cart-button-home']} to='/'>
                        <span>Back to Home</span>
                    </Link>
                </div>
                <div className={styles['cart-summary']}>
                    <h1>Summary</h1>
                    <div className={styles['summary-list']}>
                        {/* <div className={styles['card-box']}></div>
                        <div className={styles['card-box']}></div>
                        <div className={styles['card-box']}></div>
                        <div className={styles['card-box']}></div>
                        <div className={styles['card-box']}></div> */}
                    </div>
                    <button className={styles['cart-button-checkout']}>
                        Check out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
