import SockJS       from 'sockjs-client';
import * as Stomp   from 'stompjs';

const entrypoints = {
    sendMessage :   '/app/hello',
    sendMessageAll: '/app/secured/chat',
    sendSpecific:   '/app/secured/room',
    general:        '/topic/greetings',
    all:            '/secured/history',
    specificUser:   '/secured/user/queue/specific-user',
};

/**
 * @type {Stomp.Client}
 */
var stompClient = null;
/**
 * @type {SockJS}
 */
var socket      = null;
/**
 * @type {Stomp.Subscription}
 */
var messageSub  = null;
var queueSub    = null;
var sessionId   = "";

export const messageService = {
    get client(){
        return stompClient;
    },
    connect,
    subscribeGeneral,
    subscribeAll,
    subscribeSpecific,
    sendMessageGeneral,
    sendMessageAll,
    sendMessageSpecific,
    unsubscribe,
    disconnect
};

function connect(endpoint, onConnect){

    socket = new SockJS(endpoint);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame){
        let url = stompClient.ws._transport.url;
        url = url.replace('ws://localhost:8080/test-ws/', '');
        url = url.replace('/websocket', '');
        url = url.replace(/^[0-9]+\//, '');
        sessionId = url;
        console.log("SESSION ID: " + sessionId);
        onConnect();
    });
}

function subscribeGeneral(callback){
    unsubscribe();
    messageSub = stompClient.subscribe(entrypoints.general, callback);
}

function subscribeAll(callback){
    unsubscribe();
    messageSub = stompClient.subscribe(entrypoints.all, callback);
}

function subscribeSpecific(callback){
    unsubscribe();
    messageSub = stompClient.subscribe(entrypoints.specificUser + "-user" + sessionId, callback);
}

function sendMessageGeneral(from, to, content){
    stompClient?.send(
        entrypoints.sendMessage, 
        {}, 
        JSON.stringify({from, to, content, name: content})
    );
}

function sendMessageSpecific( from, to, content){
    stompClient?.send(
        entrypoints.sendSpecific,
        {},
        JSON.stringify({from, to, content})
    );
}

function sendMessageAll(from, to, content){
    stompClient?.send(
        entrypoints.sendMessageAll, 
        {}, 
        JSON.stringify({from, to, content})
    );
}

function unsubscribe(){
    if( messageSub !== null && messageSub !== undefined)
        messageSub.unsubscribe();
}

function disconnect(){
    if( stompClient !== null && stompClient !== undefined)
        stompClient.disconnect();
}