import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useAddToCartMutation } from '../../operations/mutations';
import { notifySuccess, notifyWarning } from '../../utils/toast';
import styles from './ProductCardSearch.module.css';

const ProductCardSearch = ({ id, name, img, price, discount }) => {
    const productDiscount =
        discount > 0 ? Math.round(price - (price * discount) / 100) : null;
    const { mutate: addToCartHandler } = useAddToCartMutation();
    const { setCurrentUser } = useAuthContext();

    const handleAddToCart = async (event, productId) => {
        event.preventDefault();
        try {
            const data = await addToCartHandler({
                variables: {
                    productId,
                    quantity: 1,
                },
            });
            if (data.errors) {
                throw Error(data.errors.message);
            }
            setCurrentUser(data.data.addToCart);
            notifySuccess('Added success product to cart!');
        } catch (error) {
            console.log(error);
            if (error.extensions.http.status === 401) {
                setTimeout(() => navigate('/login'), 500);
            }

            notifyWarning(error.message);
            return error;
        }
    };

    return (
        <Link
            key={id}
            to={`/products/${id}`}
            className={`${styles['product-card']}`}
        >
            <img src={img[0]} alt={name} />
            <div className={`${styles['product-content']}`}>
                <h2 className={`${styles['product-name']}`}>{name}</h2>
                <div className={`${styles['product-price']}`}>
                    <div>
                        {productDiscount ? (
                            <span
                                className={`${styles['product-price--sale']}`}
                            >
                                ${productDiscount}
                            </span>
                        ) : null}
                        <span
                            className={`${styles['product-price--original']} ${
                                !productDiscount ? styles['not-sale'] : null
                            }`}
                        >
                            ${price}
                        </span>
                    </div>
                    <button
                        className='add-to-cart-btn btn'
                        onClick={(event) => handleAddToCart(event, id)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCardSearch;
