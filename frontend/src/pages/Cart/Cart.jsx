import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import styles from './Cart.module.css';

import {
    useAddToCartMutation,
    useRemoveFromCartMutation,
} from '../../operations/mutations';
import { notifySuccess, notifyWarning } from '../../utils/toast';
import { CartList, FormCheckOut, SummaryList } from './modules';

const Cart = () => {
    const { setCurrentUser, currentUser } = useAuthContext();
    const { mutate: addToCartHandler } = useAddToCartMutation();
    const { mutate: removeFromCartHandler } = useRemoveFromCartMutation();
    const [isShowForm, setIsShowForm] = useState(false);
    // using Object.values to get values from object and convert it to array
    const cartItems = useMemo(
        () =>
            Object.values(
                currentUser.cart.itemsInfo.reduce((acc, cartItem) => {
                    const { id, quantity, sizeProductUser, ...itemInfo } =
                        cartItem;
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
            ),
        [currentUser]
    );

    const totalPrice = useMemo(
        () =>
            cartItems.reduce((prevPrice, product) => {
                const quantity = product.cartInfo.reduce(
                    (prevQty, { quantity }) => prevQty + quantity,
                    0
                );
                const price = Math.round(
                    product.price - (product.price * product.discount) / 100
                );

                return prevPrice + quantity * price;
            }, 0),
        [cartItems]
    );

    const handleAddToCart = async (event, inputProductCart) => {
        event.preventDefault();
        const { productId, quantity, size, isEditQuantity } = inputProductCart;

        try {
            const data = await addToCartHandler({
                variables: {
                    inputProduct: {
                        productId,
                        quantity: +quantity,
                        size: size,
                        isEditQuantity: isEditQuantity,
                    },
                },
            });
            setCurrentUser(data.data.addToCart);
            // notifySuccess('Adjust cart success!');
        } catch (error) {
            if (error.extensions.http.status === 401) {
                setTimeout(() => navigate('/login'), 500);
            }
            notifyWarning(error.message);
            return error;
        }
    };

    const handleRemoveFromCart = async (event, { productId, sizeProduct }) => {
        event.preventDefault();
        try {
            const data = await removeFromCartHandler({
                variables: {
                    productId,
                    sizeProduct,
                },
            });
            setCurrentUser(data.data.removeProductFromCart);
            notifySuccess('Delete Succcess!');
        } catch (error) {
            if (error?.extensions?.http?.status === 401) {
                setTimeout(() => navigate('/login'), 500);
            }
            notifyWarning(error.message);
        }
    };

    return (
        <div className={styles['cart']}>
            <div className={`container ${styles['cart-container']}`}>
                <div className={styles['cart-infomation']}>
                    <h1>{!isShowForm ? 'Shopping cart' : 'Check Out'}</h1>

                    {!isShowForm ? (
                        <CartList
                            cartList={cartItems}
                            addToCart={handleAddToCart}
                            removeFromCart={handleRemoveFromCart}
                        />
                    ) : (
                        <FormCheckOut />
                    )}

                    <Link
                        className={styles['cart-button-home']}
                        to={!isShowForm ? '/' : '/cart'}
                        onClick={
                            !isShowForm
                                ? null
                                : (event) => {
                                      event.preventDefault();
                                      setIsShowForm(false);
                                  }
                        }
                    >
                        <span>
                            {!isShowForm ? 'Back to Home' : 'Back to Cart'}
                        </span>
                    </Link>
                </div>
                <div className={styles['cart-summary']}>
                    <h1>Summary</h1>
                    <SummaryList cartList={cartItems} />

                    <div className={styles['cart-summary-total']}>
                        <h3>
                            <span>Total:</span> ${totalPrice}
                        </h3>
                        <button
                            className={styles['cart-button-checkout']}
                            onClick={
                                !isShowForm ? () => setIsShowForm(true) : null
                            }
                        >
                            Check out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
