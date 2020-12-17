import axios from 'axios';
import store from '../redux';
import { logout, updateTokens } from '../redux/reducers/auth/authActions';

const setAxios = () => {
    const setDeafults = (() => {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common.accept = 'application/json';
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        axios.defaults.timeout = 10000;
    })();

    let promise = null;

    const refreshTokens = async () => {
        try {
            store.dispatch(updateTokens());
        } catch (error) {
            store.dispatch(logout());
        }
    }

    axios.interceptors.request.use(
        request => { return request }
    );

    axios.interceptors.response.use(
        (response) => {
            return response
        }, 
        (error) => {
            if(error.response.status === 401) {
                
            }
            console.log(error);
            return error;
        }
    );

};

export default setAxios;