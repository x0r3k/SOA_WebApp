import axios from 'axios';
import {SET_PRODUCTS, SET_SHOPPING_CART, ADD_TO_SHOPPING_CART, REMOVE_FROM_SHOPPING_CART} from "./productConstants";

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

export function addToShoppingCart (product, amount) {
    let requestBody = {};
    requestBody.uri = `/api/order/addToCart`;
    requestBody.method = 'POST';
    requestBody.headers = {
        Authorization: `Bearer ${localStorage.accessToken}`,
    }
    requestBody.body = {
        productId: product.id,
        amount: amount || 1
    }

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: ADD_TO_SHOPPING_CART,
                payload: {
                    product: product,
                    userAmount: amount || 1
                }
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export function removeFromShoppingCart (productId) {
    let requestBody = {};
    requestBody.uri = `/api/order/removeFromCart?productId=${productId}`;
    requestBody.method = 'DELETE';
    requestBody.headers = {
        Authorization: `Bearer ${localStorage.accessToken}`,
    }

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: REMOVE_FROM_SHOPPING_CART,
                payload: productId
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export function getCartProductsList () {
    let requestBody = {};
    requestBody.uri = `/api/order/getCartProductsList`;
    requestBody.method = 'GET';
    requestBody.headers = {
        Authorization: `Bearer ${localStorage.accessToken}`,
    }

    const request = axios.post(`http://localhost:${process.env.REACT_APP_FACADE_PORT}/facade/handleWebRequest`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: SET_SHOPPING_CART,
                payload: response.data.result
            })
        })
        .catch(error => {
            console.log(error);
        });
}