import { useState, useEffect } from 'react';

export default useHttpErrorHandler => {
    const [error, setError] = useState(null);

    // Handle request errors with axios
    const reqInterceptor = useHttpErrorHandler.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    // Handle response errors with axios
    const resInterceptor = useHttpErrorHandler.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        useHttpErrorHandler.interceptors.request.eject(reqInterceptor);
        useHttpErrorHandler.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    //Hide Modal on click and set error to null
    const errorConfirmedHandler = () => {
      setError(null);
    };

    return [error, errorConfirmedHandler];
};