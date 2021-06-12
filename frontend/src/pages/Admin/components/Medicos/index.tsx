import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';
import ListEspecializacao from './ListEspecializacao';

const Medicos = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/medicos" exact>
                    <List />
               </Route>
               <Route path="/admin/busca-especializacao" exact>
                    <ListEspecializacao />
               </Route>
               <Route path="/admin/medicos/:medicoId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default Medicos;