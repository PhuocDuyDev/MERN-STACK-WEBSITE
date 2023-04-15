import React from 'react';
import styles from './Input.module.css';

const Input = ({
    id = '',
    type = 'text',
    placeholder = '',
    value = '',
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    sizeInput = 'medium',
}) => {
    sizeInput = sizeInput.toLowerCase();
    const sizeInputArr = ['small', 'medium', 'large'];
    const isExistSizeInput = sizeInputArr.some((size) => size === sizeInput);

    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            className={`${styles['input']} ${
                styles[`input-${isExistSizeInput ? sizeInput : 'medium'}`]
            }`}
        />
    );
};

export default Input;
