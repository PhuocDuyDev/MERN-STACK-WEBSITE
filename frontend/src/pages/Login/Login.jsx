import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import validator from 'validator';

import { useAuthContext } from '../../context/AuthContext';
import JWTManager from './../../utils/jwt';
import {useLoginMutation} from '../../operations/mutations/';

import styles from './Login.module.css';
import { REGISTER_PAGE } from '../../const/';

const Login = () => {
    const { setIsAuthenticated, isAuthenticated } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: loginMutation, data, error, loading } = useLoginMutation();
    const [errorMsg, setErrorMsg] = useState(null);
    const [emailIsValid, setEmailIsValid] = useState(null);
    const [passwordIsValid, setPasswordIsValid] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const notify = () =>
                toast.info('You already logged in! Shopping now', {
                    autoClose: 1.5 * 1000,
                    closeOnClick: true,
                });
            notify();
            navigate('/products');
        }
        if (data && !error) {
            const { accessToken } = data?.login.authPayload;
            JWTManager.setToken(accessToken);
            setIsAuthenticated(true);
        }
        if (error) {
            setErrorMsg(error.message);
        }
    }, [data, error, isAuthenticated]);

    useEffect(() => {
        const validate = setTimeout(() => {
            setFormIsValid(
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
        loginMutation({
            variables: {
                email,
                password,
            },
        });
    };

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
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
        <div className={styles['login-page']}>
            <form
                method='post'
                className={styles['form']}
                onSubmit={handleSubmit}
            >
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
                ) : null}

                <div className={styles['option']}>
                    <p>Don't have an account?</p>
                    <Link to={REGISTER_PAGE}>Signup now!</Link>
                </div>

                <button disabled={!formIsValid || loading} type='submit'>
                    {loading ? 'Try log in' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Login;
