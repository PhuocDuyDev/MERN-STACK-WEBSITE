import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

import { useAuthContext } from '../../context/AuthContext';

import { LOGIN_PAGE } from '../../const/';
import { useRegisterMutation } from '../../operations/mutations/';
import { notifyWarning } from '../../utils/toast';
import styles from './Register.module.css';
import { Input } from '../../components';

const Register = () => {
    const { isAuthenticated } = useAuthContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        mutate: registerMutation,
        error,
        loading,
        data,
    } = useRegisterMutation();
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [nameIsValid, setNameIsValid] = useState(null);
    const [emailIsValid, setEmailIsValid] = useState(null);
    const [passwordIsValid, setPasswordIsValid] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            notifyWarning('You must logout before register!');
            navigate('/products');
        }
        if (data && !error) {
            setSuccessMsg(data?.register.message);
            setErrorMsg(null);
        }
        if (error) {
            setErrorMsg(error.message);
        }
    }, [error, data, isAuthenticated]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await registerMutation({
            variables: {
                name,
                email,
                password,
            },
        });
    };

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const validateNameHandler = () => {
        setNameIsValid(
            validator.isLength(name.trim(), {
                min: 3,
            })
        );
    };

    const validateEmailHandler = () => {
        setEmailIsValid(validator.isEmail(email));
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(
            validator.isLength(password.trim(), {
                min: 6,
            })
        );
    };

    return (
        <div className={styles['register-page']}>
            <form
                method='post'
                className={styles['form']}
                onSubmit={handleSubmit}
            >
                <div className={styles['form-input']}>
                    <label htmlFor='inputName'>Fullname: </label>
                    <Input
                        sizeInput='small'
                        id='inputName'
                        type='text'
                        value={name}
                        name='name'
                        onChange={nameChangeHandler}
                        onBlur={validateNameHandler}
                        placeholder='Enter your fullname...'
                    />
                    {nameIsValid === false ? (
                        <span className='err-msg'>
                            Fullname is invalid. Please try again!
                        </span>
                    ) : null}
                </div>
                <div className={styles['form-input']}>
                    <label htmlFor='inputEmail'>Email: </label>
                    <Input
                        sizeInput='small'
                        id='inputEmail'
                        type='email'
                        value={email}
                        name='email'
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                        placeholder='Enter your email...'
                    />
                    {emailIsValid === false ? (
                        <span className='err-msg'>
                            Email is invalid. Please try again!
                        </span>
                    ) : null}
                </div>
                <div className={styles['form-input']}>
                    <label htmlFor='inputPassword'>Password: </label>
                    <Input
                        sizeInput='small'
                        id='inputPassword'
                        type='password'
                        value={password}
                        name='password'
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                        placeholder='Enter your password...'
                    />
                    {passwordIsValid === false ? (
                        <span className='err-msg'>
                            Password is invalid. Please try again!
                        </span>
                    ) : null}
                </div>

                {errorMsg ? (
                    <span className={styles['error-server']}>{errorMsg}</span>
                ) : successMsg ? (
                    <span className={styles['success-server']}>
                        {successMsg}! Login now!
                    </span>
                ) : null}

                <div className={styles['option']}>
                    <p>Already have an account?</p>
                    <Link to={LOGIN_PAGE}>Login now!</Link>
                </div>

                <button type='submit'>
                    {loading ? 'Try register' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Register;
