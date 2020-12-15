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