import React, { useState, useEffect } from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    // Handle request errors with axios
    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    // Handle response errors with axios
    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    //Hide Modal on click and set error to null
    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {/* Display error message only if there is an error */}
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
