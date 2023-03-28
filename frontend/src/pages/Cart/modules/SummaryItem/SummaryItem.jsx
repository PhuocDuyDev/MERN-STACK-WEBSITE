import React from 'react';
import styles from './SummaryItem.module.css';

const SummaryItem = ({ item }) => {
    const productDiscount = Math.round(
        item.price - (item.price * item.discount) / 100
    );
    const totalQuantity = item.cartInfo.reduce(
        (acc, prev) => acc + prev.quantity,
        0
    );
    return (
        <div key={item.id} className={styles['summary-box']}>
            <h4 className={styles['summary-box-name']}>{item.name}</h4>
            <div className={styles['summary-box-size']}>
                {item.cartInfo.map(({ sizeProductUser }) => (
                    <p key={sizeProductUser}>{sizeProductUser}</p>
                ))}
            </div>
            <div className={styles['summary-box-quantity']}>
                {item.cartInfo.map(({ quantity }, indexCartInfo) => {
                    return (
                        <div
                            key={item.id + indexCartInfo}
                            className={styles['summary-box-quantity-flex']}
                        >
                            <p>{quantity}</p>
                        </div>
                    );
                })}
            </div>
            <p className={styles['summary-box-price']}>
                ${item.discount > 0
                    ? productDiscount * totalQuantity
                    : item.price * totalQuantity}
            </p>
        </div>
    );
};

export default SummaryItem;
