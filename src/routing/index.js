import React, { Fragment, useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routerConfig from './routerConfig';
import setAxios from '../axios/axios.config';
import PrivatePage from './privatePage';

function Router(props) {
    // const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);
    const isUser = useSelector(({authReducer}) => authReducer.user);

    useEffect(() => {
        setAxios();
    }, []);

    return (
        <Fragment>
            <Switch> 
                {
                    routerConfig.map(item => {
                            return (
                                <PrivatePage
                                    id={item.id}
                                    roles={item.roles}
                                    path={item.path}
                                    isPrivate={item.isPrivate}
                                    Component={item.Component}
                                    exact
                                    key={item.id}
                                    token={isUser}
                                    isToken={item.isToken}
                                />
                            )
                    })
                }
                <Route component = {() => <div>404</div>} />
            </Switch>
        </Fragment>
    );
}

export default Router;