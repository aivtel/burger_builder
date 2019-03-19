import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
        salad: 0.5,
        cheese: 0.4,
        meat: 1.3,
        bacon: 0.7 
    };



class BurgerBuilder extends Component {

    // constructor (props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('https://react-burger-app-8d601.firebaseio.com/ingredients.json')
        .then(res => {
            this.setState({ingredients: res.data})
        })
        .catch(err => {
            this.setState({error: true})
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState ({
            loading: true
        });
        // alert('You cintinue!')
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Anton I',
                address: {
                    street: 'Rakhmaninov',
                    zipCode: '1234',
                    country: 'Russia'
                },
                email: 'qwerty@qwerty.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
        .then(res => {this.setState({ loading: false, purchasing: false})})
        .catch(err => {this.setState({ loading: false, purchasing: false})});
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} 
                    />
                </React.Fragment> 
                    );
        
            orderSummary = (
                <OrderSummary 
                    purchaseContinued={this.purchaseContinueHandler}
                    purchaseCancelled={this.purchaseCancelHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}/>
                    );
                };
        
            if (this.state.loading) {
                    orderSummary = <Spinner />
                };

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}          
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}


export default withErrorHandler(BurgerBuilder, axios);
