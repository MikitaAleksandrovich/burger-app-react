import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';

import axios from '../../axios-orders';
import styles from './Orders.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key,
                    })
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders,
                })
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    };

    render() {

        const { orders, loading } = this.state;

        return (
            <div>
                {orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        )
    }
};

export default withErrorHandler(Orders, axios);