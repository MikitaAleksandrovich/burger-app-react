import * as actionTypes from './actionTypes';

const ensureRedHotChilliPepper = (ingredients) => {
    const normalizedIngredients = ingredients ? { ...ingredients } : {};
    if (typeof normalizedIngredients.redHotChilliPepper !== 'number') {
        normalizedIngredients.redHotChilliPepper = 0;
    }
    return normalizedIngredients;
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
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ensureRedHotChilliPepper(ingredients),
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