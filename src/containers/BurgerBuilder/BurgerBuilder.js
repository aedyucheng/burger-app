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
import * as actionTypes from '../../store/action';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false
    }

    // componentWillMount() {
    //     axios.get('https://burger-app-a6388.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ ingredients: response.data });
    //             return response;
    //         })
    // }

    purchasingHandler = () => {
        this.setState({ purchasing: true });
    }

    purchasingCloseHandler = () => {
        this.setState({ purchasing: false });
    }

    purchasingContinueHandler = () => {
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
        let burger = <Spinner />;
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

        if (this.state.loading) {
            orderSummary = <Spinner />;
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
        ingredients: state.ingredients.ingredients,
        price: state.price.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        removeIngredientHandler: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));