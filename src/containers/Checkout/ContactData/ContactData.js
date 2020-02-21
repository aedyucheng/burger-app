import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.module.css'

class ContactData extends Component {
    state = {
        orderForm: null,
        loading: false
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
            value: ''
        };
    }

    configSelectElement = (options) => {
        return {
            elementType: 'select',
            elementConfig: {
                options: options
            },
            value: ''
        };
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price

        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
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

export default withRouter(ContactData);