import React from 'react';
import {withRouter} from 'react-router-dom';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // Object.keys() transforms objects into array
    let transformIngredient = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            console.log();
            return <BurgerIngredient key={igKey + i} type={igKey} />;
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (transformIngredient.length === 0) {
        transformIngredient = <p>Please, add some ingredient!</p>
    };

        console.log(transformIngredient);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);