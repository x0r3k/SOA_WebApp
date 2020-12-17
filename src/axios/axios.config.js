import axios from 'axios';
import store from '../redux';
import { logout, updateTokens } from '../redux/reducers/auth/authActions';

const setAxios = () => {
    (() => {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common.accept = 'application/json';
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.timeout = 10000;
    })();


    const refreshTokens = async () => {
        try {
            store.dispatch(updateTokens());
        } catch (error) {
            store.dispatch(logout());
        }
    }
    axios.interceptors.request.use(
        (request) => { 
            console.log("request", request);
            return request 
        },
        (error) => {
            console.log("Error1", error);
            return error;
        }
    );
    axios.interceptors.response.use(
        (response) => {
            console.log("response", response);
            
            return response
        }, 
        (error) => {
            console.log("Error", error);
            return error;
        }
    );

};

export default setAxios;