import {host, port } from '../config/host';

let ws;

//TODO add react virtual dom logic to activate/deactivate button to connect

function connect(){
    ws = new (`ws://${host}:${port}`);
    ws.onmessage = function( message ){
        console.log( message.data );
    }
}

function disconnect(){
    if(ws !== null){
        ws.close();
    }

}