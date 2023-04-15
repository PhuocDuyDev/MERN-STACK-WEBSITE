import React, { useCallback, useMemo, useState } from 'react';
import minusIcon from '../../../../assets/icons/minus.svg';
import plusIcon from '../../../../assets/icons/plus.svg';
import { ModalRemoveFromCart } from '../../../../components/Modal';
import { useAuthContext } from '../../../../context/AuthContext';
import { notifyWarning } from '../../../../utils/toast';
import styles from './CartItem.module.css';

const CartItem = ({ item, addToCart, removeFromCart }) => {
    const { currentUser } = useAuthContext();
    const cartInfo = useMemo(() => item.cartInfo, [currentUser]);
    const [sizeProduct, setSizeProduct] = useState(null);
    const [isOpenModalRemove, setIsOpenModalRemove] = useState(false);
    const productDiscount = Math.round(
        item.price - (item.price * item.discount) / 100
    );

    const quantityChangeHandler = useCallback(
        async (event, size, dataProductBySize) => {
            const cartItemExistingIndex = cartInfo.findIndex(
                ({ sizeProductUser }) => sizeProductUser === size
            );

            if (cartItemExistingIndex < 0) {
                return;
            }

            let newQuantity = +event.target.value;

            if (newQuantity <= 0) {
                notifyWarning(
                    `At least 1 product in cart. Your entered: ${newQuantity}`,
                    5
                );
                return;
            } else if (newQuantity > dataProductBySize.quantity) {
                newQuantity = dataProductBySize.quantity;
                notifyWarning(
                    `Product in stocks: ${dataProductBySize.quantity}. Your cart is updated.`,
                    5
                );
                // return;
            }
            await addToCart(event, {
                productId: item.id,
                quantity: newQuantity,
                size: size,
                isEditQuantity: true,
            });
        },
        [cartInfo]
    );

    const quantityDecreaseHandler = useCallback(
        async (size) => {
            const cartItemExistingIndex = cartInfo.findIndex(
                ({ sizeProductUser }) => sizeProductUser === size
            );
            if (cartItemExistingIndex < 0) {
                return;
            }

            if (cartInfo[cartItemExistingIndex].quantity === 1) {
                // OPEN MODAL CONFIRM DELETE ITEM FROM CART
                setSizeProduct(cartInfo[cartItemExistingIndex].sizeProductUser);
                setIsOpenModalRemove(true);
                return;
            }

            await addToCart(event, {
                productId: item.id,
                quantity: cartInfo[cartItemExistingIndex].quantity - 1,
                size: size,
                isEditQuantity: true,
            });
        },
        [cartInfo]
    );

    const quantityIncreaseHandler = useCallback(
        async (event, size, dataProductBySize) => {
            const cartItemExistingIndex = cartInfo.findIndex(
                ({ sizeProductUser }) => sizeProductUser === size
            );
            if (cartItemExistingIndex < 0) {
                return;
            }

            if (
                cartInfo[cartItemExistingIndex].quantity >
                dataProductBySize.quantity
            ) {
                notifyWarning(
                    `Product is maximum quantity. Product in stocks: ${dataProductBySize.quantity}.`,
                    5
                );
                return;
            }

            await addToCart(event, {
                productId: item.id,
                quantity: cartInfo[cartItemExistingIndex].quantity + 1,
                size: size,
                isEditQuantity: true,
            });
        },
        [cartInfo]
    );

    return (
        <>
            <ModalRemoveFromCart
                onClose={() => {
                    setIsOpenModalRemove(false);
                }}
                open={isOpenModalRemove}
                removeFromCart={(event) =>
                    removeFromCart(event, { productId: item.id, sizeProduct })
                }
            />

            <div key={item.id} className={styles['cart-box']}>
                <div className={styles['cart-box-img']}>
                    <img src={item.images[0]} alt={item.name} />
                </div>
                <h4 className={styles['cart-box-name']}>{item.name}</h4>
                <div className={styles['cart-box-size']}>
                    {cartInfo.map(({ sizeProductUser }) => (
                        <p key={sizeProductUser}>{sizeProductUser}</p>
                    ))}
                </div>
                <div className={styles['cart-box-quantity']}>
                    {cartInfo.map(
                        ({ quantity, sizeProductUser }, indexCartInfo) => {
                            const [dataProductBySize] = item.size.items.filter(
                                ({ size: sizeProduct }) =>
                                    sizeProduct === sizeProductUser
                            );

                            return (
                                <div
                                    key={item.id + indexCartInfo}
                                    className={styles['cart-box-quantity-flex']}
                                >
                                    <button
                                        className={`${styles['btn-quantity']} ${
                                            quantity == 1
                                                ? styles['is-delete']
                                                : null
                                        }`}
                                        onClick={() =>
                                            quantityDecreaseHandler(
                                                sizeProductUser
                                            )
                                        }
                                        disabled={quantity < 1}
                                    >
                                        <img src={minusIcon} alt='minus icon' />
                                    </button>
                                    <input
                                        type='tel'
                                        className={
                                            styles['cart-box-quantity-input']
                                        }
                                        value={
                                            quantity >=
                                            dataProductBySize.quantity
                                                ? dataProductBySize.quantity
                                                : quantity
                                        }
                                        onChange={(event) =>
                                            quantityChangeHandler(
                                                event,
                                                sizeProductUser,
                                                dataProductBySize
                                            )
                                        }
                                    />
                                    <button
                                        className={styles['btn-quantity']}
                                        onClick={() =>
                                            quantityIncreaseHandler(
                                                event,
                                                sizeProductUser,
                                                dataProductBySize
                                            )
                                        }
                                        disabled={
                                            quantity >=
                                            dataProductBySize.quantity
                                        }
                                    >
                                        <img src={plusIcon} alt='plus icon' />
                                    </button>
                                </div>
                            );
                        }
                    )}
                </div>
                <div className={styles['cart-box-price']}>
                    {item.discount > 0 ? (
                        <span className={styles['cart-box-price-sale']}>
                            ${productDiscount}
                        </span>
                    ) : null}
                    <span
                        className={`${styles['cart-box-price-original']} ${
                            !item.discount ? styles['not-sale'] : null
                        }`}
                    >
                        ${item.price}
                    </span>
                </div>
            </div>
        </>
    );
};

export default CartItem;
