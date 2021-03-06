import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
    { label: "Bacon", type: "bacon" },
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
];

const buildControls = props => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    disabled={props.disabled[ctrl.type]}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                />
            ))
        }

        <button
            onClick={props.purchasing}
            className={classes.OrderButton}
            disabled={!props.purchasable}>{ props.isAuth ? 'Order Now' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;