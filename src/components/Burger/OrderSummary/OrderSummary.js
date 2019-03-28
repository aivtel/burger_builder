import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return ( 
            <li key={igKey}>
                   <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
               </li>
       );});

        return (
            <React.Fragment>
                <h3>Your order:</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
    `               {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)} $</strong></p>
                <p>Continue to check out?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </React.Fragment>
        );
    }
}

export default OrderSummary;