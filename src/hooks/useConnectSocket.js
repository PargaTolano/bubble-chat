import {useEffect} from 'react';
import { messageService } from '../service/messageService';

import SockJS   from 'sockjs-client';
import * as Stomp    from 'stompjs';


var stompClient = null;

export const useConnectSocket = (url)=>{

    useEffect(()=>{

        let stompClient = null;

        let socket = new SockJS(url);

        stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame){
            stompClient.subscribe('/topic/greetings',function(greeting){
                console.log(greeting);
            })
        });

        //cleanup function
        return ()=>{
            if (stompClient !== null){
                stompClient.disconnect();
            }
        };

    },[url]);
};
