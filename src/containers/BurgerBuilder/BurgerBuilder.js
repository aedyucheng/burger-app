import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false
    }

    componentWillMount() {
       this.props.initIngredients();
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }

    purchasingCloseHandler = () => {
        this.setState({ purchasing: false });
    }

    purchasingContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    updatePurchaseState = () => {
        const ingredients = this.props.ingredients;
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients Can't be loaded</p> : <Spinner />;
        if (this.props.ingredients) {
            orderSummary = <OrderSummary
                price={this.props.price}
                ingredients={this.props.ingredients}
                purchaseCanceled={this.purchasingCloseHandler}
                purchaseContinue={this.purchasingContinueHandler}
            />

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        purchasing={this.purchasingHandler}
                        ingredientAdded={this.props.addIngredientHandler}
                        ingredientRemoved={this.props.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState()}
                        price={this.props.price}
                    />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchasingCloseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initIngredients: () => dispatch(actions.initIngredients()),
        addIngredientHandler: (ingName) => dispatch(actions.addIngredient(ingName)),
        removeIngredientHandler: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));