import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { PRODUCTS_PAGE } from '../../const/NavigateConst';

import {
    BsEye,
    BsSuitHeart,
    BsSuitHeartFill,
    BsHandbag,
    BsHandbagFill,
} from 'react-icons/bs';
// import { selectProductsInWishlist } from '../../features/selector';

const ProductCard = ({ price, discount, productImg, id, title, category }) => {
    const productDiscount = Math.round(price - (price * discount) / 100);
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
                    <h4 className={styles['product-details-title']}>{title}</h4>
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
                    {/* {product.cartList.includes(
                                            productId.toString()
                                        ) ? (
                                            <button
                                                className={styles['action-btn']}
                                                data-product-id={productId}
                                                onClick={handleAddToCart}
                                            >
                                                <BsHandbagFill
                                                    className={`${styles['action-icon']} ${styles['active']}`}
                                                />
                                            </button>
                                        ) : (
                                            <button
                                                className={styles['action-btn']}
                                                data-product-id={productId}
                                                onClick={handleAddToCart}
                                            >
                                                <BsHandbag
                                                    className={`${styles['action-icon']}`}
                                                />
                                            </button>
                                        )} */}
                    <button
                        className={styles['action-btn']}
                        data-product-id={id}
                        // onClick={handleAddToCart}
                    >
                        <BsHandbag className={`${styles['action-icon']}`} />
                    </button>
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
                    {/* {product.favouriteList.includes(
                                            productId.toString()
                                        ) ? (
                                            <BsSuitHeartFill
                                                className={`${styles['favourite-icon']} ${styles['active']}`}
                                                onClick={handleToggleFavourite}
                                                data-product-id={productId}
                                            />
                                        ) : (
                                            <BsSuitHeart
                                                className={styles['favourite-icon']}
                                                onClick={handleToggleFavourite}
                                                data-product-id={productId}
                                            />
                                        )} */}
                    <BsSuitHeart
                        className={styles['favourite-icon']}
                        // onClick={handleToggleFavourite}
                        data-product-id={id}
                    />
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
