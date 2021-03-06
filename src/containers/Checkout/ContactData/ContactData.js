import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import  * as actions from '../../../store/actions';
import { updateObject, checkValidity } from '../../../utility/Utility';

import classes from './ContactData.module.css';

class ContactData extends Component {
    state = {
        orderForm: null,
        formIsValid: false
    }

    componentDidMount() {
        const initialForm = {
            name: this.configTextElement('text', 'Your name'),
            street: this.configTextElement('text', 'Street'),
            zipCode: this.configTextElement('text', 'ZIP Code'),
            country: this.configTextElement('text', 'Country'),
            email: this.configTextElement('email', 'Email'),
            deliveryMethod: this.configSelectElement([
                { value: 'fastest', displayValue: 'Fastest' },
                { value: 'cheapest', displayValue: 'Cheapest' },
            ])
        }
        this.setState({ orderForm: initialForm });
    }

    configTextElement = (type, placeholder) => {
        return {
            elementType: 'input',
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: '',
            validation: {
                required: true,
                minLength: 3,
                maxLength: 20
            },
            valid: false,
            touched: false
        };
    }

    configSelectElement = (options) => {
        return {
            elementType: 'select',
            elementConfig: {
                options: options
            },
            value: 'fastest',
            validation:{},
            valid: true,
            touched: false
        };
    }

    orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let elementName in this.state.orderForm) {
            formData[elementName] = this.state.orderForm[elementName].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler(event, inputIdentifier) {

        

        const updatedElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedElement
        });

        let formIsValid = true;
        for(let elementName in updatedOrderForm){
            formIsValid = updatedOrderForm[elementName].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid});

    }

    render() {
        let formElementsArray = [];
        for (let name in this.state.orderForm) {
            formElementsArray.push({
                elementName: name,
                config: this.state.orderForm[name]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.elementName}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        errorMessage="Invalid input."
                        changed={(event) => { this.inputChangedHandler(event, formElement.elementName) }}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));