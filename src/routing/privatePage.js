import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import setConfig from '../routing/config/setConfig';

export default function PrivatePage({ Component, roles, isPrivate, token, isToken, ...rest }) 
{
    return ( 
        <Route
                {...rest}
                render={(props) => {
                  if (isPrivate) {
                    if (token) {
                      if ('checkRoles') {
                        return (
                            <Component {...props}/>
                        );
                      }
                      return <Redirect to='/'/>;
                    }
                    return <Redirect to='/login'/>;
                  }
                  return !token ? <Component {...props}/> : isToken ? <Component {...props}/> : <Redirect to='/'/>;
                }}
            />
    );
}