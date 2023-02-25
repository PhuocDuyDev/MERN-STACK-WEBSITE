import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCardSearch.module.css';

const ProductCardSearch = ({ id, title, img, price, discount }) => {
    const productDiscount =
        discount > 0 ? Math.round(price - (price * discount) / 100) : null;
    return (
        <Link
            key={id}
            to={`/products/${id}`}
            className={`${styles['product-card']}`}
        >
            <img src={img[0]} alt={title} />
            <div className={`${styles['product-content']}`}>
                <h2 className={`${styles['product-name']}`}>{title}</h2>
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
                    <button className='add-to-cart-btn btn'>Add to cart</button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCardSearch;
