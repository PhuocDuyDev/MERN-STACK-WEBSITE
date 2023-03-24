import React from 'react';
import styles from './CTA.module.css';
import { MyImage } from '../../../../components';
import bannerCTA from '../../../../assets/images/banner-cta.jpg';
import { Link } from 'react-router-dom';
const CTA = () => {
    return (
        <section className={`${styles['cta-section']}`}>
            <div className={styles['cta-banner']}>
                <MyImage
                    src={bannerCTA}
                    alt='banner cta'
                    classnames={styles['img-lazy']}
                />
            </div>
            <div className={`container ${styles['cta-container']}`}>
                <div className={styles['cta-details']}>
                    <h3>ARE YOU READY FOR GREAT SHOPPING DAY?</h3>
                    <p>Join now by click to get more discount for you!!!</p>
                    <Link to={`/register`} className={`${styles['cta-btn']}`}>
                        BECOME MEMBER
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CTA;
