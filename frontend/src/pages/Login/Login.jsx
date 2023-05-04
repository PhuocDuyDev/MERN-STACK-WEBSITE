import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

import { useAuthContext } from '../../context/AuthContext';
import { useLoginMutation } from '../../operations/mutations/';
import JWTManager from './../../utils/jwt';

import { REGISTER_PAGE } from '../../const/';
import { notifyInfo } from '../../utils/toast';
import styles from './Login.module.css';
import { client } from '../../client/client';
import { Input } from '../../components';

const Login = () => {
    const { setIsAuthenticated, isAuthenticated, setCurrentUser } =
        useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate: loginMutation, data, error, loading } = useLoginMutation();
    const [errorMsg, setErrorMsg] = useState(null);
    const [emailIsValid, setEmailIsValid] = useState(null);
    const [passwordIsValid, setPasswordIsValid] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            notifyInfo('You already logged in! Shopping now');
            navigate('/products');
        }
        if (data && !error) {
            const { accessToken } = data?.login.authPayload;
            setCurrentUser(data?.login.authPayload.user);
            JWTManager.setToken(accessToken);
            setIsAuthenticated(true);

            client.resetStore();
        }
        if (error) {
            setErrorMsg(error.message);
        }
    }, [data, error, isAuthenticated]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await loginMutation({
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
                    <Input
                        id='inputEmail'
                        type='email'
                        value={email}
                        name='email'
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                        placeholder='Enter your email...'
                        sizeInput='small'
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
                        id='inputPassword'
                        type='password'
                        value={password}
                        name='password'
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                        placeholder='Enter your password...'
                        sizeInput='small'
                    />
                    {passwordIsValid === false ? (
                        <span className='err-msg'>
                            Password is invalid. Please try again!
                        </span>
                    ) : null}
                </div>

                {errorMsg ? (
                    <span className={styles['error-server']}>{errorMsg}</span>
                ) : null}

                <div className={styles['option']}>
                    <p>Don't have an account?</p>
                    <Link to={REGISTER_PAGE}>Signup now!</Link>
                </div>

                <button type='submit'>
                    {loading ? 'Try log in' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default Login;
