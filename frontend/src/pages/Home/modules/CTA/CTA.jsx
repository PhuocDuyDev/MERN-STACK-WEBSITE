import React from 'react';
import styles from './CTA.module.css';

import bannerCTA from '../../../../assets/images/banner-cta.jpg';
const CTA = () => {
    return (
        <section className={`${styles['cta-section']}`}>
            <img
                src={bannerCTA}
                alt='banner cta'
                className={`${styles['cta-banner']}`}
            />
            <div className={`container ${styles['cta-container']}`}>
                <div className={styles['cta-details']}>
                    <h3>ARE YOU READY FOR GREAT SHOPPING DAY?</h3>
                    <p>Join now by click to get more discount for you!!!</p>
                    <button className={`${styles['cta-btn']}`}>
                        Register Member
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTA;
