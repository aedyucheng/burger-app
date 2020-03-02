import * as actionTypes from '../action';

const initialState = {
    price: 0
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4
}

const priceReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                price: state.price + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                price: state.price - INGREDIENT_PRICES[action.ingredientName]
            }
        default: return state;
    }
}

export default priceReducer;