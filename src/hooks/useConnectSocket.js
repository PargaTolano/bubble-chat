import { useState, useEffect, useRef }  from 'react';
import { messageService }               from '../service/messageService';

export const useConnectSocket = (endpoint)=>{

    const bottomMessageRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [message, setMessage]   = useState();

    useEffect(()=> {
        messageService.connect(endpoint, ()=>{
            messageService.subscribeAll((outMessage)=>{
                let data = JSON.parse(outMessage.body);
                setMessages( msgs => [...msgs, data] );
                bottomMessageRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
            });
        });
        
    },[endpoint]);

    const sendMessage = ()=>{
        messageService.sendMessageGeneral('banana', 'notbanana', message);
        messageService.sendMessageAll('banana', 'notbanana', message);
    };

    return {
        messages, 
        sendMessage, 
        message,
        setMessage,
        bottomMessageRef
    };
};
