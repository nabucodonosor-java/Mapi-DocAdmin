import React from 'react';
import { Switch } from 'react-router';
import Servicos from './Servicos';
import PrivateRoute from 'core/components/Routes/PrivateRoute';
import './styles.scss';

const DashBoard = () => (
    <div className="admin-container">

        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/dashboard/servicos">
                    <Servicos />
                </PrivateRoute> 
            </Switch>
        </div>
    </div>
);

export default DashBoard;