import React from 'react';
import styles from './Services.module.css';
import { FaShippingFast } from 'react-icons/fa';
import { IoSwapVertical } from 'react-icons/io5';
import { RiCustomerService2Line } from 'react-icons/ri';
const Services = () => {
    return (
        <section className={`${styles['services-section']} section`}>
            <div className='container'>
                <h1 className={styles['services-heading']}>Our Services</h1>
            </div>
            <div className={`${styles['services-container']} container grid`}>
                <div className={`${styles['services-box']}`}>
                    <FaShippingFast className={`${styles['services-icon']}`} />
                    <div className={`${styles['services-content']}`}>
                        <h3>Delivered free</h3>
                        <p>Free Shipping Over $100 & Free Returns</p>
                    </div>
                </div>
                <div className={`${styles['services-box']}`}>
                    <IoSwapVertical className={`${styles['services-icon']}`} />
                    <div className={`${styles['services-content']}`}>
                        <h3>Return Products</h3>
                        <p>
                            Return Policy shows that you can return products
                            within 14 days of receiving them.
                        </p>
                    </div>
                </div>
                <div className={`${styles['services-box']}`}>
                    <RiCustomerService2Line
                        className={`${styles['services-icon']}`}
                    />
                    <div className={`${styles['services-content']}`}>
                        <h3>Support 24/7</h3>
                        <p>Don't forget, we always want to hear from you</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
