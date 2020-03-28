import React, { Fragment, Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null,
        }

        componentDidMount() {

            // Handle request errors with axios 
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            // Handle response errors with axios
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        //Hide Modal on click and set error to null
        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Fragment>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {/* Display error only if there is an error */}
                        {this.state.error ? this.state.error.message : null}

                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            )
        }
    }
}

export default withErrorHandler;

