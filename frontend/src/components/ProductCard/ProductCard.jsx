import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS_PAGE } from '../../const/';
import styles from './ProductCard.module.css';

import {
    BsHandbag,
    BsHandbagFill,
    BsSuitHeart,
    BsSuitHeartFill,
} from 'react-icons/bs';
import { useAuthContext } from '../../context/AuthContext';
import {
    useAddToCartMutation,
    useAddToWishlist,
    useRemoveFromWishlist,
} from '../../operations/mutations';
import { notifyInfo, notifySuccess, notifyWarning } from '../../utils/toast';

const ProductCard = ({
    price,
    discount,
    productImg,
    id,
    name,
    category,
    isInCart,
    isInWishlist,
}) => {
    const productDiscount = Math.round(price - (price * discount) / 100);
    const { mutate: addToCartHandler } = useAddToCartMutation();
    const { mutate: addToWishlishHandler } = useAddToWishlist();
    const { mutate: removeFromWishlistHandler } = useRemoveFromWishlist();
    const [addCartSuccess, setAddCartSuccess] = useState(isInCart);
    const [addWishlistSuccess, setAddWishlistSuccess] = useState(isInWishlist);
    const { setCurrentUser } = useAuthContext();
    const navigate = useNavigate();

    const handleAddToWishlist = async (event, productId) => {
        event.preventDefault();

        try {
            const data = await addToWishlishHandler({
                variables: {
                    productId,
                },
            });
            setCurrentUser(data.data.addProductToWishlist);
            notifySuccess('Added success product to wishlist!');
            setAddWishlistSuccess(true);
        } catch (error) {
            // already has product
            if (error.extensions.http.status === 409) {
                setAddWishlistSuccess(true);
            } else {
                setAddWishlistSuccess(false);
                setTimeout(() => navigate('/login'), 500);
                notifyWarning('Please login to use this feature!');
            }
            notifyWarning(error.message);
            return error;
        }
    };

    const handleRemoveFromWishlist = async (event, productId) => {
        event.preventDefault();
        try {
            const data = await removeFromWishlistHandler({
                variables: {
                    productId,
                },
            });
            if (data.errors) {
                throw Error(data.errors.message);
            }
            setCurrentUser(data.data.removeProductFromWishlist);
            notifyInfo('Remove product from wishlist success!');
            setAddWishlistSuccess(false);
        } catch (error) {
            // not in wishlist to remove
            if (error.extensions.http.status === 409) {
                setAddWishlistSuccess(false);
            } else if (error.extensions.http.status === 401) {
                setAddWishlistSuccess(false);
                setTimeout(() => navigate('/login'), 500);
                notifyWarning('Please login to use this feature!');
            } else {
                setAddWishlistSuccess(true);
            }
            notifyWarning(error.message);
            return error;
        }
    };

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
            setAddCartSuccess(true);
        } catch (error) {
            if (error.extensions.http.status === 401) {
                setTimeout(() => navigate('/login'), 500);
            }
            setAddCartSuccess(false);
            notifyWarning(error.message);
            return error;
        }
    };

    return (
        <div className={styles['product-container']}>
            <Link
                to={`${PRODUCTS_PAGE}/${id}`}
                className={`${styles['product-card']}`}
            >
                <div className={styles['product-img']}>
                    <img src={productImg[0]} loading='lazy' alt='watch front' />
                    <img src={productImg[1]} loading='lazy' alt='watch 2' />
                </div>
                <div className={styles['product-details']}>
                    <p className={styles['product-details-tag']}>{category}</p>
                    <h4 className={styles['product-details-title']}>{name}</h4>
                    <div className={styles['product-details-price']}>
                        {discount && (
                            <span
                                className={styles['product-details-price-sale']}
                            >
                                ${productDiscount}
                            </span>
                        )}
                        <span
                            className={`${
                                styles['product-details-price-original']
                            } ${!discount ? styles['not-sale'] : null}`}
                        >
                            ${price}
                        </span>
                    </div>
                </div>
                <div className={styles['product-card-actions']}>
                    {addCartSuccess ? (
                        <button
                            className={styles['action-btn']}
                            onClick={(event) => handleAddToCart(event, id)}
                        >
                            <BsHandbagFill
                                className={`${styles['action-icon']} ${styles['active']}`}
                            />
                        </button>
                    ) : (
                        <button
                            className={styles['action-btn']}
                            data-product-id={id}
                            onClick={(event) => handleAddToCart(event, id)}
                        >
                            <BsHandbag className={`${styles['action-icon']}`} />
                        </button>
                    )}
                    {/* <button
                        className={styles['action-btn']}
                        // onClick={handleQuickViewProduct}
                    >
                        <BsEye className={styles['action-icon']} />
                    </button> */}
                </div>
                <button
                    data-product-id={id}
                    className={`${styles['product-card-favourite']}`}
                >
                    {addWishlistSuccess ? (
                        <BsSuitHeartFill
                            className={`${styles['favourite-icon']} ${styles['active']}`}
                            onClick={(event) =>
                                handleRemoveFromWishlist(event, id)
                            }
                        />
                    ) : (
                        <BsSuitHeart
                            className={styles['favourite-icon']}
                            onClick={(event) => handleAddToWishlist(event, id)}
                        />
                    )}
                </button>
            </Link>
            {discount && (
                <div className={styles['product-card-badget']}>
                    -{discount}%
                </div>
            )}
        </div>
    );
};

export default ProductCard;
