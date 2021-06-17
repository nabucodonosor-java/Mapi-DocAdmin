import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';
import ListEspecializacao from './ListEspecializacao';
import ListAtendimento from './ListAtendimento';

const Atendimento = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/medicos" exact>
                    <List />
               </Route>
               <Route path="/admin/busca-especializacao" exact>
                    <ListEspecializacao />
               </Route>
               <Route path="/admin/busca-atendimento" exact>
                    <ListAtendimento />
               </Route>
               <Route path="/admin/medicos/:medicoId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default Atendimento;