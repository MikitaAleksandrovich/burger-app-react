import * as actionTypes from './actionTypes';

const DEFAULT_INGREDIENTS = {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
    garlicSauce: 0,
};

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName,
    }
};

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName,
    }
};

export const setIngredients = (ingredients) => {
    const normalizedIngredients = {
        ...DEFAULT_INGREDIENTS,
        ...(ingredients || {}),
    };

    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: normalizedIngredients,
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
    }
};