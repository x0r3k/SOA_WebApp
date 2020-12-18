import axios from 'axios';
import {SET_GARAGE_CARS, SET_CURRENT_CAR, CLEAR_REDUCER, SET_AVALIABLE_CARS} from "./carConstants";

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

export function setAvaliableCars(filterParams, selectValues) {
    let requestBody = {};
    requestBody.uri = '/api/car/getCarByParams';
    requestBody.method = 'GET';
    requestBody.headers = {
        Authorization: `Bearer ${localStorage.accessToken}`,
    }
    let queryString = [];
    let result = '';
    Object.keys(filterParams).forEach(item => {
        if(filterParams[item]) queryString.push(`${item}=${filterParams[item]}`);
        result = queryString.join('&');
    });
    if(result) requestBody.uri += `?${result}`;

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, { ...requestBody });
    return (dispatch) => {
        request.then((response) => {
            dispatch({
                type: SET_AVALIABLE_CARS,
                payload: {
                    selectParams: {
                        year: filterParams.year ? selectValues.year : response.data.searchParams.year,
                        brand: filterParams.brand ? selectValues.brand : response.data.searchParams.brand,
                        model: filterParams.model ? selectValues.model : response.data.searchParams.model,
                        engineType: filterParams.engineType ? selectValues.engineType : response.data.searchParams.engineType,
                        engineCapacity: filterParams.engineCapacity ? selectValues.engineCapacity : response.data.searchParams.engineCapacity,
                    },
                    avaliableCars: response.data.foundedCars
                }
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export function setCurrentCar(car) {
    return (dispatch) => {
        dispatch({
            type: SET_CURRENT_CAR,
            payload: car
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