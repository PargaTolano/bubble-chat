import React, { useState }      from 'react';
import { motion }               from 'framer-motion';

import { userLogin }            from '../../api/user-api';

import styles                   from '../../styles/Login.module.css';
import { globals }              from '../../config/globals';

export const LoginForm = ({history}) => {

    const [ state, setState] = useState({
        username: '',
        password: '',
    });

    const onChange = (e)=> {
        setState( {...state, [e.target.name]:e.target.value} );
    };

    const onSubmit = (e)=>{
        e.preventDefault();
        globals.loading.set(true);
        userLogin( state.username, state.password) 
            .then((res)=>{
                globals.loading.set(false);
                history.replace('/');
            });
    };

    return (
        <motion.form 
            className = { styles.bubbleForm }
            initial   = { {scale: 0.4} }
            animate   = { {scale: 1}   }
            transition={{
                type:       'tween', 
                duration:   0.5,
                delay:      0.2,
                ease:       'backOut'
            }}
            onSubmit  ={ onSubmit }
        >
            <motion.section 
                className={styles.bubbleFormGroup}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    type:       'tween',
                    duration:   0.3,
                    delay:      1,
                    ease:       'easeOut'
                }}
            >
                <label htmlFor='username'>Username</label>
                <input 
                    className   = { styles.bubbleFormTextField }
                    type        = 'text'
                    name        = 'username'
                    autoComplete= 'off'
                    value       = { state.username }
                    onChange    = { onChange }
                />
                <div className={styles.bubbleFormTextFieldUnderline}>
                    <div className={styles.bubbleFormTextFieldUnderlineFocus}>
                    </div>
                </div>
            </motion.section>   
            <motion.section
                className={styles.bubbleFormGroup}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    type:       'tween',
                    duration:   0.3,
                    delay:      1,
                    ease:       'easeOut'
                }}
            >
                <label htmlFor='password'>Password</label>
                <input 
                    className={styles.bubbleFormTextField}
                    type        ='password'
                    name        ='password'
                    autoComplete= 'off'
                    vale        = { state.password }
                    onChange     = { onChange }
                />
                <div className = { styles.bubbleFormTextFieldUnderline }>
                    <div className = { styles.bubbleFormTextFieldUnderlineFocus }>
                    </div>
                </div>
            </motion.section>
            <motion.button
                className   = { styles.bubbleFormSubmitButton }
                type        = 'submit'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    type:       'tween',
                    duration:   0.3,
                    delay:      1,
                    ease:       'easeOut'
                }}
            >
                Log In
            </motion.button> 
        </motion.form>
    )
}

export default LoginForm;
