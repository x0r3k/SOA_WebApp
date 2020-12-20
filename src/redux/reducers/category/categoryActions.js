import axios from 'axios';
import {SET_CATEGORIES, SET_CURRENT_CATEGORY} from "./categoryConstants";

export function setCategories(){
    let requestBody = {};
    requestBody.uri = '/api/category/getCategories';
    requestBody.method = 'GET';

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: SET_CATEGORIES,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export function setCurrentCategory(category) {
    return (dispatch) => {
        dispatch({
            type: SET_CURRENT_CATEGORY,
            payload: category
        });
    }
}

export function getCurrentCategory(categoryId) {
    let requestBody = {};
    requestBody.uri = `/api/category/getCategoryById/${categoryId}`;
    requestBody.method = 'GET';

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) => {
        request.then((response) => {
            dispatch({
                type: SET_CURRENT_CATEGORY,
                payload: response.data.foundedCategory
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
}