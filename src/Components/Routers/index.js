import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation
} from 'react-router-dom'

import MainPage from './MainPage'

function DetectPageViews() {
    const location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
    }, [ location ])
}

function Routers(props) {
    const allRoutes = [
        ...MainPage
    ]

    DetectPageViews()
    return (
        <Switch>
            {
                allRoutes.map(({ path, exact, component: Component }) => (
                    <Route exact={exact} path={path}>
                        <Component />
                    </Route>
                ))
            }
        </Switch>
    )
}

export default Routers