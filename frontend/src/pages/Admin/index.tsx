import React from 'react';
import { Switch } from 'react-router';
import NavbarAdmin from './components/NavbarAdmin';
import Medicos from './components/Medicos';
import PrivateRoute from 'core/components/Routes/PrivateRoute';
import './styles.scss';

const Admin = () => (
    <div className="admin-container">
        <NavbarAdmin />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/medicos">
                    <Medicos />
                </PrivateRoute>
                <PrivateRoute path="/admin/especialidade">
                    <h1>Especialidades</h1>
                </PrivateRoute>
                <PrivateRoute path="/admin/especializacao">
                    <h1>Especializações</h1>
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <h1>Users</h1>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;