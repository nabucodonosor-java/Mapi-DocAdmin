import React from 'react';
import { Route, Switch } from 'react-router-dom';
import List from './List';
import ListEspecializacao from './ListEspecializacao';
import ListAtendimento from './ListAtendimento';

const Medicos = () => {
    return (
       <div>
           <Switch>
               <Route path="/report/medicos" exact>
                    <List />
               </Route>
               <Route path="/report/especializacao" exact>
                    <ListEspecializacao />
               </Route>
               <Route path="/report/atendimento" exact>
                    <ListAtendimento />
               </Route>
           </Switch>
       </div>
    );
}

export default Medicos;