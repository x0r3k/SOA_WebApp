import { combineReducers } from 'redux';
import authReducer from "./auth/authReducer";
import categoryReducer from "./category/categoryReducer";
import productReducer from "./product/productReducer";

const rootReducer = combineReducers({
    authReducer,
    categoryReducer,
    productReducer
});

export default rootReducer;
