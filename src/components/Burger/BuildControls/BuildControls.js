import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import styles from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' }
];


const buildControls = (props) => (
    <div className={styles.buildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)} $</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                price={props.price} />
        ))}
        <button className={styles.orderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>
            {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            
        </button>
    </div>
);

export default buildControls;