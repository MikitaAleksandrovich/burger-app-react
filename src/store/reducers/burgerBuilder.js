import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utils';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    mexicalChilli: 0.9,
};

const normalizeIngredients = (ingredients = {}) => ({
    salad: ingredients.salad || 0,
    bacon: ingredients.bacon || 0,
    cheese: ingredients.cheese || 0,
    meat: ingredients.meat || 0,
    mexicalChilli: ingredients.mexicalChilli || 0,
});

const addIngredient = (state, action) => {
    const currentAmount = state.ingredients[action.ingredientName] || 0;
    const updatedIngredientOnAdd = { [action.ingredientName]: currentAmount + 1 };
    const updatedIngredientsOnAdd = updateObject(state.ingredients, updatedIngredientOnAdd);
    const updatedStateOnAdd = {
        ingredients: updatedIngredientsOnAdd,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
    };
    return updateObject(state, updatedStateOnAdd);
};

const removeIngredient = (state, action) => {
    const currentAmount = state.ingredients[action.ingredientName] || 0;
    const updatedIngredientOnRemove = { [action.ingredientName]: currentAmount - 1 };
    const updatedIngredientsOnRemove = updateObject(state.ingredients, updatedIngredientOnRemove);
    const updatedStateOnRemove = {
        ingredients: updatedIngredientsOnRemove,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
    };
    return updateObject(state, updatedStateOnRemove);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: normalizeIngredients(action.ingredients),
        totalPrice: 4,
        error: false,
        building: false,
    });
};

const fetchIngredientsFailed = (state) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
        default: return state;
    };
};

export default reducer;