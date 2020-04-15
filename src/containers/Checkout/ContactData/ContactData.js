import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import styles from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({ loading: true });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Nikita Aleksandrovich',
                adsress: {
                    street: 'test street',
                    zipCode: '12458',
                    country: 'Belarus'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false });
                alert("Thanks! Your order was sent to our cafe!");
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    }

    render() {

        let form = (
            <form>
                <input className={styles.input} type="text" name="name" placeholder="Your Name"></input>
                <input className={styles.input} type="email" name="email" placeholder="Your Mail"></input>
                <input className={styles.input} type="text" name="street" placeholder="Street"></input>
                <input className={styles.input} type="text" name="postal" placeholder="Postal Code"></input>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.container}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
};

export default ContactData;