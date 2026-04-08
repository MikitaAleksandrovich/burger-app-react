import React from 'react';

import styles from './Burger.module.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const INGREDIENT_ORDER = ['salad', 'mexicalChilli', 'bacon', 'cheese', 'meat'];

const burger = (props) => {

    const ingredients = props.ingredients || {};
    const orderedIngredientKeys = [
        ...INGREDIENT_ORDER,
        ...Object.keys(ingredients).filter(ingKey => INGREDIENT_ORDER.indexOf(ingKey) === -1),
    ];

    let transformedIngredients = orderedIngredientKeys
        .map((ingKey) => {
            const amount = ingredients[ingKey] || 0;
            return [...Array(amount)].map((_, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />;
            });
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