import React from 'react';

import styles from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const INGREDIENT_RENDER_ORDER = ['salad', 'chilliPepper', 'bacon', 'cheese', 'meat'];

const burger = (props) => {
    const ingredients = props.ingredients || {};
    const ingredientKeys = Object.keys(ingredients);
    const orderedIngredientKeys = [
        ...INGREDIENT_RENDER_ORDER.filter((key) => ingredientKeys.includes(key)),
        ...ingredientKeys.filter((key) => !INGREDIENT_RENDER_ORDER.includes(key)),
    ];

    let transformedIngredients = orderedIngredientKeys
        .map((ingKey) => {
            return [...Array(ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please, start adding ingredients!</p>;
    }

    return (
        <div className={styles.burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>

    );
};

export default burger;