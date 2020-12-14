import * as Actions from './authConstants';
import jwt from 'jsonwebtoken';

const initialState = {
    loading: false,
    isLogged: null,
    user: null,
    isError: null,
};

const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.LOGIN:{
            return {
                ...state,
                isLogged: true,
                user: {...action.payload.user, refreshSessions: undefined, roles: undefined},
            }
        }
        case Actions.REGISTER:{
            return {
                ...initialState,
            }
        }
        case Actions.SET_ERROR:{
            return {
                ...state,
                isError: action.payload
            }
        }
        case Actions.SET_TOKEN:{
            let decode = jwt.decode(action.payload)
            return {
                ...state,
                user: decode
            }
        }
        default: {
            return state;
        }
    }

}

export default authReducer;