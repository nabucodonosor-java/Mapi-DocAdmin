import React from 'react';
import { Switch } from 'react-router';
import NavbarAdmin from './components/NavbarAdmin';
import Medicos from './components/Medicos';
import PrivateRoute from 'core/components/Routes/PrivateRoute';
import './styles.scss';

const Report = () => (
    <div className="admin-container">
        <NavbarAdmin />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/report/medicos">
                    <Medicos />
                </PrivateRoute>
                <PrivateRoute path="/report/especializacao">
                    <Medicos />
                </PrivateRoute>
                <PrivateRoute path="/report/atendimento">
                    <Medicos />
                </PrivateRoute>
                <PrivateRoute path="/report/local">
                    <Medicos />
                </PrivateRoute>
                <PrivateRoute path="/report/users" allowedRoutes={['ROLE_ADMIN']}>
                    <h1>Users</h1>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Report;