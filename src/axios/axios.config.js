import axios from 'axios';
import store from '../redux';
import { actionLogout } from '../redux/authorization/constants/actionConstants';

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
            const response = await axios.create().post(`${config.api_url}/api/auth/updateToken`, {refreshToken: localStorage.refreshToken});
            console.log('response', response);
            localStorage.accessToken = response.data.payload.accessToken;
            localStorage.refreshToken = response.data.payload.refreshToken;
            localStorage.accessExpiresTime = Date.now() + Number(response.data.payload.accessTokenExpiresTime);
        } catch (error) {
            logout();
        }
    }

    axios.interceptors.request.use(
        async (request) => {
            if(localStorage.accessExpiresTime < (Date.now() + 2000)) {
                console.log('update token');
                promise = refreshTokens();
            }
            await promise;
            request.headers.Authorization = `Bearer ${localStorage.accessToken}`;
            return request;
        }, 
        (error) => {
            console.log(error);
            return error;
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response
        }, 
        (error) => {
            console.log(error);
            return error;
        }
    );

};

export default setAxios;