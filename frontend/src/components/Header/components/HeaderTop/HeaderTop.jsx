import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderTop.module.css';

const HeaderTop = () => {
    return (
        <header>
            <div className={`container grid ${styles['header-top']}`}>
                <p>Free Shipping Over $100 & Free Returns</p>
                <p className='text-align-right'>
                    Hotline: <Link href='tel:+84 334820317'>+84 334820317</Link>
                </p>
            </div>
        </header>
    );
};

export default HeaderTop;
