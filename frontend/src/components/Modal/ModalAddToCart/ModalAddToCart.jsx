import React, { useCallback, useState } from 'react';
import ReactDom from 'react-dom';
import { SliderImages } from '../../';
import styles from './ModalAddToCart.module.css';
import minusIcon from '../../../assets/icons/minus.svg';
import plusIcon from '../../../assets/icons/plus.svg';

const ModalAddToCart = ({ open, onClose, addCart, ...productInfo }) => {
    if (!open) return null;
    const {
        id,
        productImg,
        price,
        category,
        name,
        description,
        discount,
        isInCart,
        isInWishlist,
        size: { items: sizesProduct },
    } = productInfo;
    const [quantityInput, setQuantityInput] = useState(1);
    const [sizeSelect, setSizeSelect] = useState('S');
    const [quantityOfSize, setQuantityOfSize] = useState(
        sizesProduct.filter(({ size }) => {
            return size === sizeSelect;
        })[0].quantity
    );

    const addToCart = async (event) => {
        await addCart(event, {
            productId: id,
            quantity: quantityInput,
            size: sizeSelect,
        });
    };

    const productDiscount = Math.round(price - (price * discount) / 100);

    const sizeChangeHandler = useCallback((sizeSelect) => {
        setSizeSelect(sizeSelect);
        const [sizeInfo] = sizesProduct.filter(({ size }) => {
            return size === sizeSelect;
        });
        if (sizeInfo.quantity === 0) {
            setQuantityInput(0);
        } else {
            setQuantityInput(1);
        }
        setQuantityOfSize(sizeInfo.quantity);
    }, []);

    const quantityChangeHandler = (event) => {
        if (event.target.value > quantityOfSize) {
            setQuantityInput(quantityOfSize);
        } else {
            setQuantityInput(event.target.value);
        }
    };

    const quantityDecreaseHandler = () => {
        if (quantityInput <= 1) {
            setQuantityInput(1);
        } else {
            setQuantityInput((quantity) => quantity - 1);
        }
    };
    const quantityIncreaseHandler = () => {
        if (quantityInput >= quantityOfSize) {
            setQuantityInput(quantityOfSize);
        } else {
            setQuantityInput((quantity) => quantity + 1);
        }
    };

    return ReactDom.createPortal(
        <>
            <div className={styles['overlay']} onClick={onClose} />
            <div
                className={`container ${styles['modal-add-to-cart']}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className={`${styles['modal-container']}`}>
                    <button onClick={onClose} className={styles['btn-close']}>
                        X
                    </button>
                    <SliderImages productImg={productImg} productName={name} />
                    <div className={styles['product-details']}>
                        <h3 className={styles['product-details-title']}>
                            {name}
                        </h3>
                        <div className={styles['product-details-price']}>
                            {discount > 0 ? (
                                <span
                                    className={
                                        styles['product-details-price-sale']
                                    }
                                >
                                    Price: ${productDiscount}
                                </span>
                            ) : null}
                            <span
                                className={`${
                                    styles['product-details-price-original']
                                } ${!discount ? styles['not-sale'] : null}`}
                            >
                                {!discount ? <>Price: </> : null}${price}
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
                                {sizesProduct.map(({ size }) => {
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
                            onClick={addToCart}
                            className={styles['btn-add-to-cart']}
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
};

export default ModalAddToCart;
