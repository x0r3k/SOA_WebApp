import axios from 'axios';
import {SET_PRODUCTS} from "./productConstants";

export function setProducts(id){
    let requestBody = {};
    requestBody.uri = `/api/product/getProductByCategory/${id}`;
    requestBody.method = 'GET';

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: SET_PRODUCTS,
                payload: response.data.productList
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export function setProductsCategoryCar(categoryId, carId){
    let requestBody = {};
    requestBody.uri = `/api/product/getProductByCategoryCar`;
    requestBody.method = 'GET';
    let queryParams = [];
    if(categoryId) queryParams.push(`categoryId=${categoryId}`);
    if(carId) queryParams.push(`carId=${carId}`);
    let query = queryParams.join('&');
    if(query) requestBody.uri += `?${query}`;

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: SET_PRODUCTS,
                payload: response.data.productList
            })
        })
        .catch(error => {
            console.log(error);
        });
}