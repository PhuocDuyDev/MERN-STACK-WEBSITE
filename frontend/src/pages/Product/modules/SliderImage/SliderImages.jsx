import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import styles from './SliderImages.module.css';
import { MyImage } from '../../../../components';

const SliderImages = ({ productImg, productName }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className={styles['product-img']}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#febd69',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles['product-slider-main']}
            >
                {productImg.map((img, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <MyImage
                                src={img}
                                alt={productName + ' img ' + index}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={4}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={styles['product-slider-sub']}
            >
                {productImg.map((img, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <MyImage
                                src={img}
                                alt={productName + ' img ' + index}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default SliderImages;
