import React from 'react';

import styles from '../styles/MainBubble.module.css';

export const MainBubble = () => {
    return (
        <section className={styles.bubbleContainer}>
            <div className={styles.mainBubble}>
                <button
                    className={styles.chatBtn}
                    type="button"
                >
                    Chat!
                </button>
            </div>
        </section>
    )
}

export default MainBubble
