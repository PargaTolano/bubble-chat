import { useState, useEffect } from 'react';
import { messageService }   
    from '../service/messageService';
export const useConnectSocket = (endpoint)=>{

    const [messages, setMessages] = useState([]);
    const [message, setMessage]   = useState();

    useEffect(()=> {
        messageService.connect(endpoint, ()=>{
            messageService.subscribeAll((message)=>{

                const data = JSON.parse(message.body);
                console.log(data);
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
        setMessage
    };
};
