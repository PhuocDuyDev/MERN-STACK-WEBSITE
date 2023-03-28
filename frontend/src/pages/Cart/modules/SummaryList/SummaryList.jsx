import React from 'react';
import styles from './SummaryList.module.css';
import {SummaryItem} from '../'

const SummaryList = ({ cartList }) => {
    return (
        <div className={styles['summary-list']}>
            <div className={styles['summary-fields']}>
                <h4>Name</h4>
                <h4>Size</h4>
                <h4>Quantity</h4>
                <h4>Total</h4>
            </div>
            {cartList.map((cartItem) => {
                return (
                    <SummaryItem
                        key={cartItem.id}
                        item={cartItem}
                    />
                );
            })}
        </div>
    );
};

export default SummaryList;
