import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utility/Utility';


const initialState = {
    ingredients: null,
    price: 0,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAIL: return fetchIngredientsFail(state, action);
        default: return state;
    }
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

    const updatedStates = {
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        ingredients: updatedIngredients,
        building: true
    }
    return updateObject(state, updatedStates);
}

const removeIngredient = (state, action) => {
    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients, updatedIng);

    const updateStates = {
        price: state.price - INGREDIENT_PRICES[action.ingredientName],
        ingredients: updatedIngs,
        building: true
    }
    return updateObject(state, updateStates);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        price: 0,
        building: false
    });
}

const fetchIngredientsFail = (state, action) => {
    return updateObject(state, { error: true });
}

export default reducer;
