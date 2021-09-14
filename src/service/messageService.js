import SockJS       from 'sockjs-client';
import * as Stomp   from 'stompjs';

const entrypoints = {
    sendMessage :   '/app/hello',
    sendMessageAll: '/app/secured/chat',
    general:        '/topic/greetings',
    all:            '/secured/history',
    specificUser:   '/topic/greetings',
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
var sub         = null;
var sessionId   = "";

export const messageService = {
    get client(){
        return stompClient;
    },
    connect,
    subscribeGeneral,
    subscribeAll,
    subscribeToUser,
    sendMessageGeneral,
    sendMessageAll,
    unsubscribe,
    disconnect
};

function connect(endpoint, onConnect){

    socket = new SockJS(endpoint);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame){
        let url = stompClient.ws._transport.url;
        url = url.replace('ws://localhost:8080/app/secured/room/', '');
        url = url.replace('/websocket', '');
        url = url.replace(/^[0-9]+\//, "");
        sessionId = url;

        onConnect();
    });
}

function subscribeGeneral(callback){
    if(sub)
        unsubscribe();
    sub = stompClient.subscribe(entrypoints.general, callback);
}

function subscribeAll(callback){
    if(sub)
        unsubscribe();
    sub = stompClient.subscribe(entrypoints.all, callback);
}

/**
 * @param {String} url 
 * @param {VoidFunction} cb 
 */
function subscribeToUser(url, callback){
    sub = stompClient.subscribe(url + "-user" + sessionId, function (msgOut) {
        callback(JSON.parse(msgOut.body));
    });
}

function sendMessageGeneral(from, to, content){
    stompClient.send(
        entrypoints.sendMessage, 
        {}, 
        JSON.stringify({from, to, content, name: content})
    );
}

function sendMessageAll(from, to, content){
    stompClient.send(
        entrypoints.sendMessageAll, 
        {}, 
        JSON.stringify({from, to, content})
    );
}

function unsubscribe(){
    if( sub !== null && sub !== undefined)
        sub.unsubscribe();
}

function disconnect(){
    if( stompClient !== null && stompClient !== undefined)
        stompClient.disconnect();
}