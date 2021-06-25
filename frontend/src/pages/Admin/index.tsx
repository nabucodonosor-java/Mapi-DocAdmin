import React from 'react';
import { Switch } from 'react-router';
import NavbarAdmin from './components/NavbarAdmin';
import Medicos from './components/Medicos';
import PrivateRoute from 'core/components/Routes/PrivateRoute';
import Especialidade from './components/Especialidade';
import Atendimento from './components/Atendimento';
import Especializacao from './components/Especializacao';
import Cidade from './components/Cidade';
import Local from './components/Local';

import './styles.scss';
import DashServicos from './components/DashServicos';


const Admin = () => (
    <div className="admin-container">
        <NavbarAdmin />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/medicos">
                    <Medicos />
                </PrivateRoute>
                <PrivateRoute path="/admin/especialidade">
                    <Especialidade />
                </PrivateRoute>
                <PrivateRoute path="/admin/especializacao">
                    <Especializacao />
                </PrivateRoute>
                <PrivateRoute path="/admin/cidade">
                    <Cidade />
                </PrivateRoute>
                <PrivateRoute path="/admin/atendimento">
                   <Atendimento />
                </PrivateRoute>
                <PrivateRoute path="/admin/local">
                   <Local />
                </PrivateRoute>
                <PrivateRoute path="/admin/servico">
                   <DashServicos />
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <h1>Users</h1>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;