import React from 'react';

import './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients).
        map((ingKey) => {
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return  <BurgerIngredient key={ingKey + i} type={ingKey} />
            })
        });

        console.log(transformedIngredients);

    return (
        <div className="burger">
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;