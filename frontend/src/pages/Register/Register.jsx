import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

import { useAuthContext } from '../../context/AuthContext';

import styles from './Register.module.css';
import { LOGIN_PAGE } from '../../const/';
import { useRegisterMutation } from '../../operations/mutations/';

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
    const [formIsValid, setFormIsValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const notify = () =>
                toast.warning('You must logout before register!', {
                    autoClose: 1.5 * 1000,
                    closeOnClick: true,
                });
            notify();
            navigate('/products');
        }
        if (data && !error) {
            setSuccessMsg(data?.register.message);
        }
        if (error) {
            setErrorMsg(error.message);
        }
    }, [error, data, isAuthenticated]);

    useEffect(() => {
        const validate = setTimeout(() => {
            setFormIsValid(
                validator.isLength(name.trim(), {
                    min: 3,
                }) &&
                    validator.isEmail(email) &&
                    validator.isLength(password.trim(), {
                        min: 6,
                    })
            );
        }, 300);
        return () => {
            clearTimeout(validate);
        };
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        registerMutation({
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
                    <input
                        id='inputName'
                        type='text'
                        value={name}
                        name='name'
                        onChange={nameChangeHandler}
                        onBlur={validateNameHandler}
                        placeholder='Enter your fullname...'
                    />
                    {nameIsValid === false ? (
                        <span>Fullname is invalid. Please try again!</span>
                    ) : null}
                </div>
                <div className={styles['form-input']}>
                    <label htmlFor='inputEmail'>Email: </label>
                    <input
                        id='inputEmail'
                        type='email'
                        value={email}
                        name='email'
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                        placeholder='Enter your email...'
                    />
                    {emailIsValid === false ? (
                        <span>Email is invalid. Please try again!</span>
                    ) : null}
                </div>
                <div className={styles['form-input']}>
                    <label htmlFor='inputPassword'>Password: </label>
                    <input
                        id='inputPassword'
                        type='password'
                        value={password}
                        name='password'
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                        placeholder='Enter your password...'
                    />
                    {passwordIsValid === false ? (
                        <span>Password is invalid. Please try again!</span>
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

                <button disabled={!formIsValid || loading} type='submit'>
                    {loading ? 'Try register' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Register;
