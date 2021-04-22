import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions/index';

import styles from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: true,
    };

    // Input's validation func
    checkValidity(value, rules) {
        let isValid = true;
    
        // Check for empty input
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        // Check for valid email
        if (rules.isEmail) {
            const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            isValid = pattern.test(value) && isValid;
        }
    
        // Check for min length of the inputed value
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
    
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
    
        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
        // Search and update targeted input in cloned controls form
        const { controls } = this.state;
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, controls[controlName].validation),
                touched: true,
            },
        };
        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        const { email, password } = this.state.controls;
        const { isSignup } = this.state;
        const { onAuth } = this.props;
        event.preventDefault();
        onAuth(email.value, password.value, isSignup);
    };

    switchAuthModeHnalder = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup,
            }
        });
    };

    render() {
        const { controls } = this.state;
        const formElementsArray = [];

        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key],
            });
        };

        const form = formElementsArray.map(({ id, config }) => (
            <Input
                key={id}
                elementType={config.elementType}
                elementConfig={config.elementConfig}
                value={config.value}
                invalid={!config.valid}
                touched={config.touched}
                shouldValidate={config.validation}
                changed={(event) => this.inputChangedHandler(event, id)} />
        ));

        return (
            <div className={styles.container}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHnalder}
                    btnType="Danger">
                        SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    }
};

export default connect(null, mapDispatchToProps)(Auth);

