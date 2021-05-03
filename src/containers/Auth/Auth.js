import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject } from '../../shared/utils';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

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

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/');
        };
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
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: this.checkValidity(event.target.value, controls[controlName].validation),
                touched: true,
            })
        });
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

        let form = formElementsArray.map(({ id, config }) => (
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

        if (this.props.loading) {
            form = <Spinner />
        };

        if (this.props.isAuthenticated) {
           return <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={styles.container}>
                {this.props.error && (
                    <p className={styles.error}>{this.props.error.message}</p>
                )}
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

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

