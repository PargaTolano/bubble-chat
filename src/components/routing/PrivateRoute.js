import React                        from 'react';
import { Route, Redirect }          from 'react-router-dom';
import { authenticationService }    from '../../service/authenticationService';
import { routes }                   from '../../config/routes';

export const PrivateRoute = ({ component: Component, user, ...rest }) => {
    return <Route {...rest} render={props => (
        (user || authenticationService.currentUserValue)
            ? <Component {...props} />
            : <Redirect to={{ pathname: routes.login, state: { from: props.location } }} />
    )} />
};

export default PrivateRoute;