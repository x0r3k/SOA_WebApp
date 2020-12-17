import axios from 'axios';
import {SET_GARAGE_CARS, SET_CURRENT_CAR, CLEAR_REDUCER} from "./carConstants";

export function setGarageCars(){
    let requestBody = {};
    requestBody.uri = '/api/car/getGarageCars';
    requestBody.method = 'GET';
    requestBody.headers = {
        Authorization: `Bearer ${localStorage.accessToken}`,
    }

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: SET_GARAGE_CARS,
                payload: response.data.garageCars
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export function setCurrentCar(category) {
    return (dispatch) => {
        dispatch({
            type: SET_CURRENT_CAR,
            payload: category
        });
    }
}

export function clearReducer() {
    return (dispatch) => {
        dispatch({
            type: CLEAR_REDUCER,
        });
    }
}