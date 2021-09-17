import axios from 'axios';
import { makeRoute } from '../config/host';
import { handleResponse } from './handleReponse';

export const signUp = (username,password)=>{

    const body = {username, password};

    return axios.post( makeRoute('/api/v1/user/login'), body).then(handleResponse);
};

export const userLogin = (username,password)=>{

    const body = {username, password};

    return axios.post( makeRoute('/api/v1/user/create'), body).then(handleResponse);
};