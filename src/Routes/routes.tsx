import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route'
import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import Orphanage from '../pages/Orphanage';
import CreateOrphanage from '../pages/CreateOrphanage';
import OnSuccess from '../pages/OnSuccess'
import Login from '../pages/Login'
import OnDelete from '../pages/OnDelete'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
                <Route path="/success" component={OnSuccess} />
                <Route path="/login" component={Login} />

                <Route isPrivate path="/deleted" component={OnDelete} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;