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
import Dashboard from '../pages/Dashboard'
import ApproveOrphanage from '../pages/ApproveOrphanage'
import UpdateOrphanage from '../pages/UpdateOrphanage'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages/create" exact component={CreateOrphanage} />
                <Route path="/orphanages/:id" exact component={Orphanage} />
                <Route path="/success" component={OnSuccess} />
                <Route path="/login" component={Login} />

                <Route isPrivate path="/deleted" component={OnDelete} />
                <Route isPrivate path="/dashboard" component={Dashboard} />
                <Route isPrivate path="/orphanages/approve/:id" component={ApproveOrphanage} />
                <Route isPrivate path="/orphanages/profile/:id" component={UpdateOrphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;