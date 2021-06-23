import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashServico from './DashServico';

const Servico = () => {
    return (
        <div className="container">
            <Switch>
                <Route path="/dashboard/servicos" exact>
                    <DashServico />
                </Route>
            </Switch>
        </div>
    );
}

export default Servico;