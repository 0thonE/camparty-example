import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthService } from '../../services/session-service';


const GuardedRoute = ({ component: Component, auth, ...rest }) => {

    auth = (auth===undefined)?AuthService.isLoggedIn():auth;
    
    return (
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}

export default GuardedRoute;