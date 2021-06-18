import React from 'react';
import { Router, Switch, Route, Redirect  } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import MedicoDetails from 'pages/Catalog/components/MedicoDetails';
import Auth from 'pages/Auth';
import Admin from './pages/Admin';
import Report from './pages/Report';
import history from './core/utils/history';

const Routes = () => (
    <Router history={history}>
    <Navbar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/medicos"  exact>
                <Catalog />
            </Route>
            <Route path="/medicos/:medicoId">
                <MedicoDetails />
            </Route>
            <Redirect from="/auth" to="/auth/login" exact/>
            <Route path="/auth">
                <Auth />
            </Route>
            <Redirect from="/report" to="/report/medicos" exact/>
            <Route path="/report">
                <Report />
            </Route>
            <Redirect from="/admin" to="/admin/medicos" exact/>
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </Router>
);

export default Routes;