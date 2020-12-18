import * as Actions from './productConstants';

const initialState = {
    products: [],
    shoppingCart: [],
};

const productReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_PRODUCTS:{
            return {
                ...state,
                products: action.payload
            }
        }
        case Actions.SET_SHOPPING_CART:{
            return {
                ...state,
                shoppingCart: action.payload
            }
        }
        case Actions.ADD_TO_SHOPPING_CART:{
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, action.payload]
            }
        }
        case Actions.REMOVE_FROM_SHOPPING_CART:{
            return {
                ...state,
                shoppingCart: state.shoppingCart.filter(item => item.product.id !== action.payload)
            }
        }
        default: {
            return state;
        }
    }

}

export default productReducer;