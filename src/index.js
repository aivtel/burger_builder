import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from'./store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
        rootBurgerBuilder: burgerBuilderReducer,
        rootOrder: orderReducer,
        rootAuth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
        applyMiddleware(thunk)
));

const app = <Provider store={store}>
                <BrowserRouter>
                        <App />
                </BrowserRouter>
            </Provider>

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
