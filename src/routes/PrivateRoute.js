import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { isLogin } from '../utils/storage'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin() ? (
                    <Component {...props} path={rest.path} />
                ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    );
};

export default PrivateRoute;