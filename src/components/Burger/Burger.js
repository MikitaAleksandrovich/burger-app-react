import React from 'react';

import styles from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const DEFAULT_INGREDIENT_ORDER = [
    'salad',
    'redHotChilliPepper',
    'bacon',
    'cheese',
    'meat',
];

const burger = (props) => {
    const availableIngredients = props.ingredients || {};
    const ingredientOrder = props.ingredientOrder || DEFAULT_INGREDIENT_ORDER;

    const fallbackIngredients = Object.keys(availableIngredients).filter(
        (ingredient) => ingredientOrder.indexOf(ingredient) === -1
    );

    const orderedKeys = [...ingredientOrder, ...fallbackIngredients];

    const createIngredientComponent = (type, index) => {
        if (type === 'redHotChilliPepper') {
            return (
                <div
                    key={type + index}
                    className={styles.redHotChilliPepper}
                />
            );
        }

        return <BurgerIngredient key={type + index} type={type} />;
    };

    let transformedIngredients = orderedKeys
        .map((ingKey) => {
            const amount = availableIngredients[ingKey] || 0;
            return [...Array(amount)].map((_, i) =>
                createIngredientComponent(ingKey, i)
            );
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please, start adding ingredients!</p>
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