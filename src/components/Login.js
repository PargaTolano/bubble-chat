import React, { useEffect }             from 'react';
import { useHistory }                   from 'react-router';

import LoginForm                        from './forms/LoginForm';

import styles                           from '../styles/Login.module.css';

export const Login = () => {
    
    const history = useHistory();

    useEffect(()=>{
        history.replace({ firstPage: true });
    }, []);

    return (
        <main className={styles.loginPage}>
            <LoginForm history={history}/>
        </main>
    )
}

export default Login
