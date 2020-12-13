import * as Actions from './authConstants';

const initialState = {
    loading: false,
    user: null,
    accessToken: '',
    refreshToken: '',
    expiresIn: '',
    roles: [],
};

const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.LOGIN:{
            return {
                ...initialState,
            }
        }
        default: {
            return state;
        }
    }

}

export default authReducer;