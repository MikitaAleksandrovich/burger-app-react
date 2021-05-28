import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from '../../hooks/useHttpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);
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
