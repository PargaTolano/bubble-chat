import React, { useEffect, useRef, useState }    from 'react';
import { useConnectSocket } from '../hooks/useConnectSocket';
import { messageService } from '../service/messageService';
import styles   from '../styles/ChatBubble.module.css';

export const ChatBubble = () => {

    const [reversed, setReversed] = useState(false);
    const ref = useRef(null);

    const onClickToggle = () => {
        console.log("reversing");
        setReversed(false)
    };

    const onSubmit = e =>{
        e.preventDefault();
    };

    useConnectSocket('http://localhost:8080/gs-guide-websocket');

    useEffect(()=>{
        const subs = messageService.message$.subscribe(data=>{
            console.log("DATA : "+data);
        });

        return ()=>{
            subs.unsubscribe();
        }
    },[]);

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
                <form 
                    onSubmit={onSubmit}
                    className={styles.messageForm}
                >
                    <textarea 
                        className={styles.messageText}
                        rows="7"
                        placeholder="Message Here!"
                    ></textarea>
                    <button 
                        type="submit"
                        className={styles.sendIconContainer}
                    >
                        <i className={`${styles.sendIcon} send icon`}></i>
                    </button>
                </form>
            </div>
        </>
    )
}

export default ChatBubble;