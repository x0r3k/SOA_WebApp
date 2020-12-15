import * as Actions from './productConstants';

const initialState = {
    products: []
};

const productReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_PRODUCTS:{
            return {
                ...state,
                products: action.payload
            }
        }
        default: {
            return state;
        }
    }

}

export default productReducer;