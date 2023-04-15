import React, { memo } from 'react';
import { CartItem } from '../';
import styles from './CartList.module.css';

const CartList = memo(({ cartList, addToCart, removeFromCart }) => {
    return (
        <div className={styles['cart-list']}>
            <div className={styles['cart-fields']}>
                <h4>Images</h4>
                <h4>Name</h4>
                <h4>Size</h4>
                <h4>Quantity</h4>
                <h4>Price</h4>
            </div>
            {cartList.map((cartItem) => {
                return (
                    <CartItem
                        key={cartItem.id}
                        item={cartItem}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                    />
                );
            })}
        </div>
    );
});

export default CartList;
