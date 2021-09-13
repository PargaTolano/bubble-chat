import { useState, useEffect } from 'react';

import SockJS       from 'sockjs-client';
import * as Stomp   from 'stompjs';


var stompClient = null;
var socket      = null;
var sessionId   = "";

export const useConnectSocket = (url)=>{

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState();

    useEffect(()=>{

        socket = new SockJS(url);

        stompClient = Stomp.over(socket);
        stompClient.connect({}, function(frame){

            var url = stompClient.ws._transport.url;
            url = url.replace(
                "ws://localhost:8080/spring-security-mvc-socket/secured/room/",  "");
            url = url.replace("/websocket", "");
            url = url.replace(/^[0-9]+\//, "");
            console.log("Your current session is: " + url);
            sessionId = url;

            stompClient.subscribe('/topic/greetings',function(greeting){
                const { body } = greeting;
                setMessages([...messages, JSON.parse(body)]);
            });
            
            stompClient.subscribe('secured/user/queue/specific-user' 
            + '-user' + sessionId, function (msgOut) {
                //handle messages
            });
        });

        //cleanup function
        return ()=>{
            if (stompClient !== null){
                stompClient.disconnect();
            }
        };

    },[url]);

    function sendMessage(text) {
        stompClient.send("/app/hello", {}, JSON.stringify({'message': text}));
    }

    return {
        messages, 
        sendMessage, 
        message,
        setMessage
    };
};
