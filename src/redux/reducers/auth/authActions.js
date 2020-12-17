import axios from 'axios';
import {LOGIN, REGISTER, UPDATE_TOKENS, SET_ERROR, SET_TOKEN, LOGOUT} from "./authConstants";

export function login(params){
    let requestBody = {};
    requestBody.uri = '/api/auth/authorization';
    requestBody.method = 'POST';
    requestBody.body = params;
    requestBody.body.fingerprint = navigator.userAgent;

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            console.log("Login");
            localStorage.accessToken = response.data.accessToken;
            localStorage.refreshToken = response.data.refreshToken;
            dispatch(setToken(response.data.accessToken))
            dispatch(setError(false));
        })
        .catch(error => {
            dispatch(setError(true));
            console.log(error);
        });
}

export function register(params){
    let requestBody = {};
    requestBody.uri = '/api/auth/register';
    requestBody.method = 'POST';
    requestBody.body = params;
    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>{        
        request.then((response) => {
            console.log("Register");
            const loginParams = {
                email: params.email,
                password: params.password
            }
            dispatch(login(loginParams));
            dispatch(setError(false));
        })
        .catch(error => {
            dispatch(setError(true));
            console.log(error);
        });
    }
}

export function updateTokens(){
    let requestBody = {};
    requestBody.uri = '/api/auth/updateTokens';
    requestBody.method = 'PUT';
    requestBody.body.refreshToken = localStorage.refreshToken;
    requestBody.body.fingerprint = navigator.userAgent;

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            console.log("Update Tokens");
            localStorage.accessToken = response.data.accessToken;
            localStorage.refreshToken = response.data.refreshToken;
            dispatch(setToken(response.data.newAccessToken))
            dispatch(setError(false));
        })
        .catch(error => {
            dispatch(setError(true));
            console.log(error);
        });
}

export function logout() {
    return (dispatch) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch({
            type: LOGOUT
        });
    }
}

function setError (param) {
    return (dispatch) => {
        dispatch({
            type: SET_ERROR,
            payload: param
        })
    }
}


export const setToken = (token) => (dispatch) => {
    console.log("Set Token");
    dispatch({
        type: SET_TOKEN,
        payload: token
    })
}

