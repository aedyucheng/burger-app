import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    price: 0,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                price: state.price + INGREDIENT_PRICES[action.ingredientName],
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                price: state.price - INGREDIENT_PRICES[action.ingredientName],
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                price: 0
            }
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return {
                ...state,
                error: true
            }
        default: return state;
    }
}

export default reducer;