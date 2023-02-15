import React from 'react';
import styles from './SaleProducts.module.css';
import { ProductCard } from '../../../../components';
import product1a from '../../../../assets/images/product-1-1.jpg';
import product1b from '../../../../assets/images/product-1-2.jpg';
import product2a from '../../../../assets/images/product-2-1.jpg';
import product2b from '../../../../assets/images/product-2-2.jpg';
import product3a from '../../../../assets/images/product-3-1.jpg';
import product3b from '../../../../assets/images/product-3-2.jpg';

const SaleProducts = () => {
    return (
        <section className={`${styles['sale-section']} section`}>
            <div className={`container ${styles['sale']}`}>
                <h1 className='section-heading'>On Sale</h1>
                <div className={`grid ${styles['sale-products']}`}>
                    {new Array(8).fill(0).map((_, index) => {
                        let product = [product1a, product1b];
                        if (index % 3 == 0) {
                            product = [product2a, product2b];
                        } else if (index % 3 == 1) {
                            product = [product3a, product3b];
                        }
                        return (
                            <ProductCard
                                product={product}
                                key={index}
                                productId={index}
                                sale={true}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SaleProducts;
