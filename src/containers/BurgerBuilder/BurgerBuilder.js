import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    // Check if there are any or just one ingredient to then continue and make an order
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).
            map((ingKey) => {
                return ingredients[ingKey];
            }).
            reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }


    render() {

        const { purchasing,
            loading,
            error } = this.state;

        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false etc...}

        let orderSummary = null;

        let burger = error ? <p style={{ textAlign: 'center', fontSize: '2.5rem' }}>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        disabled={disabledInfo}
                        price={this.props.totalPrice} />
                </Fragment>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.totalPrice} />
        };

        if (loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Fragment>
                <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    };
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName }),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));