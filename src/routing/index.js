import React, { Fragment, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routerConfig from './routerConfig';
import PrivatePage from './privatePage';

function Router(props) {
    // const authToken = useSelector(({ authReducer }) => authReducer.tokenPayload);
    const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

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
                                    token={userToken}
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