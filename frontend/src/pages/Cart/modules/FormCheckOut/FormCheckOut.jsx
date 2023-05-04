import React from 'react';
import { useFormCheckOut } from '../../../../hooks/';
import styles from './FormCheckOut.module.css';
import {
    Input,
    SelectAddressCustome,
    SelectPaymentMethod,
} from '../../../../components';

const FormCheckOut = () => {
    const {
        listProvince,
        listDistrict,
        listWard,
        listPaymentMethod,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        selectedPaymentMethod,
        selectProvinceHandler,
        selectDistrictHandler,
        selectWardHandler,
        selectPaymentMethodHandler,
        name,
        phoneNumber,
        nameIsValid,
        phoneNumberIsvalid,
        nameChangeHandler,
        phoneNumberChangeHandler,
        validateName,
        validatePhoneNumber,
    } = useFormCheckOut();

    return (
        <form method='post' className={styles['form']}>
            <div className={styles['form-group']}>
                <div className={styles['form-group-label']}>
                    <h3>Profile</h3>
                    <p>
                        This information will be forwarded to the shipping unit,
                        please review carefully before placing an order.
                    </p>
                </div>
                <div className={styles['form-group-fields']}>
                    <div className={styles['form-group-contacts']}>
                        <div className={styles['form-group-field']}>
                            <label htmlFor='fullname'>Fullname</label>
                            <Input
                                id='fullname'
                                type='text'
                                placeholder='Enter your fullname...'
                                onBlur={() => validateName(name)}
                                onChange={nameChangeHandler}
                                value={name}
                                sizeInput='small'
                            />
                            {nameIsValid === false ? (
                                <span className='err-msg'>
                                    Fullname should be at least 6 characters.
                                </span>
                            ) : null}
                        </div>
                        <div className={styles['form-group-field']}>
                            <label htmlFor='phone'>Phone number</label>
                            <Input
                                id='phone'
                                type='number'
                                placeholder='0123456789'
                                onBlur={() => validatePhoneNumber(phoneNumber)}
                                onChange={phoneNumberChangeHandler}
                                value={phoneNumber}
                                sizeInput='small'
                            />
                            {phoneNumberIsvalid === false ? (
                                <span className='err-msg'>
                                    Phone is invalid. Please try again!
                                </span>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles['form-group-address']}>
                        <SelectAddressCustome
                            label='city'
                            key={'city'}
                            selected={selectedProvince}
                            selectHandler={selectProvinceHandler}
                            listOption={listProvince}
                        />
                        <SelectAddressCustome
                            label='district'
                            key={'district'}
                            selected={selectedDistrict}
                            selectHandler={selectDistrictHandler}
                            listOption={listDistrict}
                        />
                        <SelectAddressCustome
                            label='ward'
                            key={'ward'}
                            selected={selectedWard}
                            selectHandler={selectWardHandler}
                            listOption={listWard}
                        />
                        <div className={styles['form-group-field']}>
                            <label htmlFor='fullname'>Street</label>
                            <Input
                                id='street'
                                type='text'
                                placeholder='Enter your street...'
                                // onBlur={() => validatePhoneNumber(phoneNumber)}
                                // onChange={phoneNumberChangeHandler}
                                // value={phoneNumber}
                                sizeInput='small'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['form-group']}>
                <div className={styles['form-group-label']}>
                    <h3>Payment</h3>
                    <p>Select your payment method you want.</p>
                </div>
                <div className={styles['form-group-fields']}>
                    <div className={styles['form-group-payment']}>
                        <SelectPaymentMethod
                            label='payment method'
                            key={'paymentMethod'}
                            selected={selectedPaymentMethod}
                            selectHandler={selectPaymentMethodHandler}
                            listOption={listPaymentMethod}
                        />
                        {/* <SelectPaymentMethod
                            label='order confirm'
                            key={'orderConfirm'}
                            selected={selectedOrderConfirmMethod}
                            selectHandler={selectOrderConfirmMethodHandler}
                            listOption={listOrderConfirmMethod}
                        /> */}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormCheckOut;
