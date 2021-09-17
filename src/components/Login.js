import React from 'react';

import LoginForm from './forms/LoginForm';

import styles from '../styles/Login.module.css';

export const Login = () => {
    return (
        <main className={styles.loginPage}>
            <LoginForm/>
        </main>
    )
}

export default Login
