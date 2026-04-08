import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            onInitIngredients: jest.fn(),
            onIngredientAdded: jest.fn(),
            onIngredientRemoved: jest.fn(),
            onInitPurchase: jest.fn(),
            onSetAuthRedirectPath: jest.fn(),
            ingredients: null,
            totalPrice: 4,
            error: false,
            isAuthenticated: false,
            history: { push: jest.fn() },
        };
        wrapper = shallow(<BurgerBuilder {...defaultProps} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ ingredients: {salad: 0} });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should redirect to auth when trying to purchase unauthenticated', () => {
        const onSetAuthRedirectPath = jest.fn();
        const history = { push: jest.fn() };

        wrapper.setProps({
            ingredients: { salad: 1 },
            totalPrice: 5,
            onSetAuthRedirectPath,
            history,
            isAuthenticated: false,
        });

        wrapper.find(BuildControls).prop('ordered')();

        expect(onSetAuthRedirectPath).toHaveBeenCalledWith('/checkout');
        expect(history.push).toHaveBeenCalledWith('/auth');
        expect(wrapper.find(Modal).prop('show')).toBe(false);
    });

    it('should open modal when purchasing authenticated', () => {
        wrapper.setProps({
            ingredients: { salad: 1 },
            totalPrice: 5,
            isAuthenticated: true,
        });

        wrapper.find(BuildControls).prop('ordered')();
        wrapper.update();

        expect(wrapper.find(Modal).prop('show')).toBe(true);
    });
});