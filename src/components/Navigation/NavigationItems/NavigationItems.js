import React from 'react';
import { Link } from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <Link to="/">
            <NavigationItem active>Burger Builder</NavigationItem>
        </Link>
        <Link to="checkout">
            <NavigationItem>Checkout</NavigationItem>
        </Link>
    </ul>
);

export default navigationItems;