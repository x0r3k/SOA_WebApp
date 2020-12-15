import * as Actions from './categoryConstants';

const initialState = {
    category: [],
    currentCategory: null
};

const categoryReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_CATEGORIES: {
            return {
                ...state,
                category: action.payload
            }
        }
        case Actions.SET_CURRENT_CATEGORY: {
            return {
                ...state,
                currentCategory: action.payload
            }
        }
        default: {
            return state;
        }
    }

}

export default categoryReducer;