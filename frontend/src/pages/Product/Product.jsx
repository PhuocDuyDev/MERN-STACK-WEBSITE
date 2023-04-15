import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
// Import Swiper React components

import styles from './Product.module.css';

// import required modules
import { Spinner } from './../../components/';
import { PRODUCTS_PAGE } from './../../const/index';
import { SliderImages } from './../../components/';
import useGetSingleProduct from '../../hooks/useGetSingleProduct';
import minusIcon from '../../assets/icons/minus.svg';
import plusIcon from '../../assets/icons/plus.svg';
import { notifyWarning } from '../../utils/toast';

const Product = () => {
    const {
        product,
        loading,
        error,
        categoryBreadcum,
        quantityInput,
        sizeSelect,
        quantityOfSize,
        quantityChangeHandler,
        quantityDecreaseHandler,
        quantityIncreaseHandler,
        sizeChangeHandler,
        handleAddToCart,
    } = useGetSingleProduct();

    const navigate = useNavigate();

    if (loading) {
        return <Spinner />;
    }
    if (error) {
        notifyWarning(error.message);
        setTimeout(() => {
            navigate('/products ');
        }, 2 * 1000);
        return <div>eror</div>;
    }
    return (
        <>
            <div className={`${styles['breadcrumb']}`}>
                <Link to={'/'}>Home</Link>
                <span> / </span>
                <Link to={PRODUCTS_PAGE}>Products</Link>
                <span> / </span>
                <Link to={`/products?category=${product.category}`}>
                    {categoryBreadcum.title}
                </Link>
            </div>
            <section className={`${styles['product-section']} section`}>
                <div className={`container ${styles['product-container']}`}>
                    <SliderImages
                        productImg={product.images}
                        productName={product.name}
                    />
                    <div className={styles['product-details']}>
                        <h3 className={styles['product-details-title']}>
                            {product.name}
                        </h3>
                        <div className={styles['product-details-price']}>
                            {product.discount > 0 ? (
                                <span
                                    className={
                                        styles['product-details-price-sale']
                                    }
                                >
                                    $
                                    {Math.floor(
                                        product.price -
                                            Math.round(
                                                (product.price *
                                                    product.discount) /
                                                    100
                                            )
                                    )}
                                </span>
                            ) : null}
                            <span
                                className={`${
                                    styles['product-details-price-original']
                                } ${
                                    !product.discount
                                        ? styles['not-sale']
                                        : null
                                }`}
                            >
                                ${product.price}
                            </span>
                        </div>
                        <div className={styles['product-details-size']}>
                            <p className={styles['size-quantity']}>
                                {quantityOfSize > 0 ? (
                                    <>
                                        <span>{quantityOfSize}</span> in stock
                                    </>
                                ) : (
                                    <span>Out of stocks</span>
                                )}
                            </p>
                            <div className={styles['size-list']}>
                                {product.size.items.map(({ size }) => {
                                    return (
                                        <button
                                            key={size}
                                            onClick={() =>
                                                sizeChangeHandler(size)
                                            }
                                            className={`${styles['btn-size']} ${
                                                size === sizeSelect
                                                    ? styles['active']
                                                    : null
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles['product-details-quantity']}>
                            <button
                                className={styles['btn-quantity']}
                                onClick={quantityDecreaseHandler}
                                disabled={
                                    quantityOfSize <= 1 || quantityInput <= 1
                                }
                            >
                                <img src={minusIcon} alt='minus icon' />
                            </button>
                            <input
                                type='tel'
                                className={
                                    styles['product-details-quantity-input']
                                }
                                value={
                                    quantityInput >= quantityOfSize
                                        ? quantityOfSize
                                        : quantityInput
                                }
                                onChange={quantityChangeHandler}
                            />
                            <button
                                className={styles['btn-quantity']}
                                onClick={quantityIncreaseHandler}
                                disabled={quantityInput >= quantityOfSize}
                            >
                                <img src={plusIcon} alt='plus icon' />
                            </button>
                        </div>
                        <button
                            onClick={(event) =>
                                handleAddToCart(event, {
                                    productId: product.id,
                                    quantity: +quantityInput,
                                    size: sizeSelect,
                                    isEditQuantity: false,
                                })
                            }
                            className={styles['btn-add-to-cart']}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Product;
