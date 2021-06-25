import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const DashServicos = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/servico" exact>
                    <List />
               </Route>
               <Route path="/admin/servico/:servicoId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default DashServicos;