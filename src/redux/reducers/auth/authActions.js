import axios from 'axios';
import {LOGIN, REGISTER, UPDATE_TOKENS} from "./authConstants";

export function login(params){
    const request = axios.post(`http://localhost:${process.env.FACADE_PORT}/facade/handleWebRequest`, params);
    return (dispatch) =>
        request.then((response) => {

            dispatch(
                {
                    type: LOGIN,
                    payload: request,
                }
            )
        })
        .catch(error => {
            console.log(error);
        });
}

export function register(params){
    const request = axios.post(`http://localhost:${process.env.FACADE_PORT}/facade/handleWebRequest`, params);
    return (dispatch) =>
        request.then((response) => {

            dispatch(
                {
                    type: REGISTER,
                    payload: request,
                }
            )
        })
        .catch(error => {
            console.log(error);
        });
}
