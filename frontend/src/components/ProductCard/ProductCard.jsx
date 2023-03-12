import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { PRODUCTS_PAGE } from '../../const/';

import {
    BsEye,
    BsSuitHeart,
    BsSuitHeartFill,
    BsHandbag,
    BsHandbagFill,
} from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
} from '../../features/featureWishlish/featureWishlish';
import { addToCart } from '../../features/featureCart/featureCartSlice';

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
    const dispatch = useDispatch();

    const handleAddToWishlist = (event, id) => {
        event.preventDefault();
        dispatch(addToWishlist(id));
    };

    const handleRemoveFromWishlist = (event, id) => {
        event.preventDefault();
        dispatch(removeFromWishlist(id));
    };

    const handleAddToCart = (event, id) => {
        event.preventDefault();
        dispatch(addToCart({ id: id, quantity: 1 }));
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
                    {isInCart ? (
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
                    <button
                        className={styles['action-btn']}
                        // onClick={handleQuickViewProduct}
                    >
                        <BsEye className={styles['action-icon']} />
                    </button>
                </div>
                <button
                    data-product-id={id}
                    className={`${styles['product-card-favourite']}`}
                >
                    {isInWishlist ? (
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
