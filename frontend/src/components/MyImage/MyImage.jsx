import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import logo from '../../assets/images/logo.jpg';

const MyImage = ({ src, alt, classnames }) => (
    <LazyLoadImage
        src={src}
        alt={alt}
        effect='blur'
        placeholderSrc={logo}
        wrapperClassName={classnames}
    />
);

export default MyImage;
