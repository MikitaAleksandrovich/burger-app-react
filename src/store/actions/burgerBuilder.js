import * as actionTypes from './actionTypes';

const enhanceIngredientsWithChilliPepper = (ingredients) => {
    const safeIngredients = ingredients || {};
    return {
        chilliPepper: 0,
        ...safeIngredients,
    };
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
        ingredients: enhanceIngredientsWithChilliPepper(ingredients),
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