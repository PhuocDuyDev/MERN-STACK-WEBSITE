import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { PRODUCTS_PAGE } from '../../../../const/';
import styles from './HeaderBottom.module.css';

const HeaderBottom = memo(() => {
    return (
        <header>
            <div className={`container grid ${styles['header-bottom']}`}>
                <ul>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={`${PRODUCTS_PAGE}`}>Our Store</Link>
                    </li>
                    <li>
                        <Link to={'/contact'}>Contact</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
});

export default HeaderBottom;
