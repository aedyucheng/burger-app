import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import  * as actions from '../../../store/actions';

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

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
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
            orderData: formData
        }

        this.props.onOrderBurger(order);
    }

    inputChangedHandler(event, inputIdentifier) {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedElement;

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
        loading: state.order.loading
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(ContactData, axios)));