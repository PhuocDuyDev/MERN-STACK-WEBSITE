import React from 'react';
import { Link } from 'react-router-dom';

import styles from './SaleProducts.module.css';
import { ProductCard } from '../../../../components';
import { PRODUCTS_PAGE } from './../../../../const/NavigateConst';
import { demoProducts } from './../../../../const/demoProducts';

const SaleProducts = () => {
    return (
        <section className={`${styles['sale-section']} section`}>
            <div className={`container ${styles['sale']}`}>
                <h1 className='section-heading'>On Sale</h1>
                <div className={`grid ${styles['sale-products']}`}>
                    {demoProducts
                        .filter((product) => product.discount > 0)
                        .slice(0, 8)
                        .map((product) => {
                            return (
                                <ProductCard
                                    productPrice={product.price}
                                    productImg={product.img}
                                    key={product.id}
                                    productId={product.id}
                                    discount={
                                        product.discount != 0
                                            ? product.discount
                                            : null
                                    }
                                />
                            );
                        })}
                </div>
                <Link
                    to={`${PRODUCTS_PAGE}?category=sale`}
                    className={`${styles['sale-btn']} see-more-btn`}
                >
                    See More
                </Link>
            </div>
        </section>
    );
};

export default SaleProducts;
