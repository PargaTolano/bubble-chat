import React    from 'react';
import {motion} from 'framer-motion';
import styles   from '../../styles/Login.module.css';

export const LoginForm = () => {
    return (
        <motion.form 
            className={styles.bubbleForm}
            initial={{scale: 0.4}}
            animate={{scale: 1}}
            transition={{
                type:       'tween', 
                duration:   0.5,
                delay:      0.2,
                ease:       'backOut'
            }}
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
                <label for='username'>Username</label>
                <input 
                    className={styles.bubbleFormTextField}
                    type='text'
                    name='username'
                    autoComplete='off'
                    //TODO react state management
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
                <label for='password'>Password</label>
                <input 
                    className={styles.bubbleFormTextField}
                    type='password'
                    name='password'
                    autoComplete='off'
                    //TODO react state management
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

export default LoginForm
