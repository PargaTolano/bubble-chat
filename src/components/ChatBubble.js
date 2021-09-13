import React, { useEffect, useRef, useState }    from 'react';
import { useConnectSocket } from '../hooks/useConnectSocket';

import styles   from '../styles/ChatBubble.module.css';

export const ChatBubble = () => {

    const [reversed, setReversed] = useState(false);
    const ref = useRef(null);

    const { 
        messages, 
        sendMessage,
        message,
        setMessage,
    } = useConnectSocket('http://localhost:8080/websocket-message-app');

    const onClickToggle = () => {
        setReversed(false);
    };

    const onSubmit = e =>{
        e.preventDefault();
        sendMessage(message);
    };

    return (
        <>
            <div className={styles.trailContainer}>
                <div className={styles.bubbleTrail} ></div>
                <div className={styles.bubbleTrail}></div>
                <div className={styles.bubbleTrail}></div>
            </div>
            <div 
                ref         = { ref }
                onClick     = { onClickToggle }
                className   = { 
                    reversed ?
                    `${styles.chatBubble} ${styles.chatBubbleReversed}`
                    :
                    `${styles.chatBubble} ${styles.chatBubbleForwards}`
                } 
            >   
                <div className={styles.backgroundBubble} ></div>
                <div className={styles.messageContainer}>
                    {
                        messages.map((v,i)=>{

                            console.log(`#########MENSAJE#########`);
                            console.log(v);
                            console.log(`#########################`);

                            return (
                                <div key={i} className={styles.message}>
                                    {v.message}
                                </div>
                            );
                        })
                    }
                </div>
                
                <form 
                    onSubmit        = { onSubmit }
                    className       = { styles.messageForm }
                >
                    <textarea 
                        className   = { styles.messageText }
                        rows        = "7"
                        placeholder = "Message Here!"
                        value       = { message }
                        onChange    = { e=>setMessage(e.target.value) }
                    ></textarea>
                    <button 
                        type        = "submit"
                        className   = { styles.sendIconContainer }
                    >
                        <i className= {`${styles.sendIcon} send icon`}></i>
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChatBubble;