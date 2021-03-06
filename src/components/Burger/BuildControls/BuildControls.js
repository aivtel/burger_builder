import React from 'react';
import classes from'./BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {

    return (
        <div className={classes.BuildControls}>
            <p className={classes.Price}>Current price: <strong>{props.price.toFixed(2)} $</strong></p>
            {controls.map((ctrl) => {
                return (
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    type={ctrl.type}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemove(ctrl.type)}
                    disabled={props.disabled[ctrl.type]} />
                    )
            })}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? 'Order now' : 'Sign up to order!'}</button>
        </div>
    );
}

export default buildControls;