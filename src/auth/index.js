import { API } from '../config';
import axios from 'axios'

export const signin = async email => {
    try {
        return await axios.post(`${API}login`,
        {email}, {withCredentials: true})
    } catch (e) {
        console.log({ e }); 
        return e};
    };

export const authenticate = (data) => {
    console.log({data});
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
    }
};

export const signout = (next) => {
    console.log(next);
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        return fetch(`${API}logout`, {
            method: 'DELETE'
        })
            .then(response => {
                console.log('signout', response);
                next()
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};