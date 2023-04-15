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
        listOrderConfirmMethod,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        selectedPaymentMethod,
        selectedOrderConfirmMethod,
        selectProvinceHandler,
        selectDistrictHandler,
        selectWardHandler,
        selectPaymentMethodHandler,
        selectOrderConfirmMethodHandler,
        phoneNumber,
        phoneNumberChangeHandler,
        validatePhoneNumber,
    } = useFormCheckOut();

    return (
        <form method='post' className={styles['form']}>
            <div className={styles['form-group']}>
                <div className={styles['form-group-label']}>
                    <h3>Profile</h3>
                    <p>This information will.</p>
                </div>
                <div className={styles['form-group-fields']}>
                    <div className={styles['form-group-contacts']}>
                        <div className={styles['form-group-field']}>
                            <label htmlFor='fullname'>Fullname</label>
                            <Input
                                id='fullname'
                                type='text'
                                placeholder='Enter your fullname...'
                                // onBlur={() => validatePhoneNumber(phoneNumber)}
                                // onChange={phoneNumberChangeHandler}
                                // value={phoneNumber}
                                sizeInput='small'
                            />
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
