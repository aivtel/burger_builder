import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    componentWillMount () {
        // this.props.onInitPurchase();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        checkoutCancelled={this.checkoutCancelledHandler} 
                        checkoutContinued={this.checkoutContinuedHandler} 
                        ingredients={this.props.ings} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} />
                </div>
            );
        }
        return summary
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.rootBurgerBuilder.ingredients,
        purchased: state.rootOrder.purchased
    }
}

export default connect(mapStateToProps)(Checkout);