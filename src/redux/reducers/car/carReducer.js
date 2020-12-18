import * as Actions from './carConstants';

const initialState = {
    garageCars: [],
    selectParams: {
        year: [],
        brand: [],
        model: [],
        engineCapacity: [],
        engineType: []
    },
    avaliableCars: [],
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
        case Actions.SET_AVALIABLE_CARS: {
            return {
                ...state,
                selectParams: action.payload.selectParams,
                avaliableCars: action.payload.avaliableCars
            }
        }
        case Actions.CLEAR_REDUCER: {
            return {
                ...initialState
            }
        }
        default: {
            return state;
        }
    }

}

export default carReducer;