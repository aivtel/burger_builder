import React, {Component} from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
 
    componentDidMount () {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = this.props.orders.map(order => {
                        return (<Order 
                                    key={order.id}
                                    ingredients={order.ingredients}
                                    price={order.price} />)
                    })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.rootOrder.orders,
        loading: state.rootOrder.loading,
        token: state.rootAuth.token,
        userId: state.rootAuth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));