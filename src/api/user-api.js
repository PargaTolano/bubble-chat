import axios from 'axios';
import { makeRoute } from '../config/host';
import { handleResponse } from './handleReponse';

const mock = true;

export const signUp = (username,password)=>{

    const body = {username, password};

    return axios.post( makeRoute('/api/v1/user/login'), body).then(handleResponse);
};

export const userLogin = (username,password)=>{

    if(mock){
        return axios.get('https://pokeapi.co/api/v2/pokemon/150')
            .then(handleResponse)
            .then((data)=>new Promise( (res)=> {
                setTimeout(()=>void res(data), 2000);
            }));
    }

    const body = {username, password};

    return axios.post( makeRoute('/api/v1/user/create'), body).then(handleResponse);
};