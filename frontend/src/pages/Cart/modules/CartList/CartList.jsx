import React from 'react';
import { CartItem } from '../';
import styles from './CartList.module.css';
import { useAddToCartMutation } from './../../../../operations/mutations/';
import { notifySuccess, notifyWarning } from '../../../../utils/toast';
import { useAuthContext } from '../../../../context/AuthContext';

const CartList = ({ cartList }) => {
    const { mutate: addToCartHandler } = useAddToCartMutation();
    const { setCurrentUser } = useAuthContext();
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
            notifySuccess('Adjust cart success!');
        } catch (error) {
            if (error.extensions.http.status === 401) {
                setTimeout(() => navigate('/login'), 500);
            }
            notifyWarning(error.message);
            return error;
        }
    };

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
                        addCart={handleAddToCart}
                    />
                );
            })}
        </div>
    );
    return;
};

export default CartList;
