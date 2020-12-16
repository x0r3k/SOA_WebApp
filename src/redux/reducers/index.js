import { combineReducers } from 'redux';
import authReducer from "./auth/authReducer";
import categoryReducer from "./category/categoryReducer";
import productReducer from "./product/productReducer";
import carReducer from "./car/carReducer";

const rootReducer = combineReducers({
    authReducer,
    categoryReducer,
    productReducer,
    carReducer
});

export default rootReducer;
