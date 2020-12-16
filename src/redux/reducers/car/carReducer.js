import * as Actions from './carConstants';

const initialState = {
    garageCars: [],
    currentCar: null
};

const carReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_GARAGE_CARS: {
            return {
                ...state,
                garageCars: action.payload
            }
        }
        case Actions.SET_CURRENT_CAR: {
            return {
                ...state,
                currentCar: action.payload
            }
        }
        default: {
            return state;
        }
    }

}

export default carReducer;