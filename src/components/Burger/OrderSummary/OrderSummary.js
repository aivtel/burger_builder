import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
             return ( 
             <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
        );});

    return (
        <React.Fragment>
            <h3>Your order:</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
`               {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)} $</strong></p>
            <p>Continue to check out?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </React.Fragment>
    )
}

export default orderSummary;