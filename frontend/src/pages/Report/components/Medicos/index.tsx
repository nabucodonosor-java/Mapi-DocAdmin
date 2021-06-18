import React from 'react';
import { Route, Switch } from 'react-router-dom';
import List from './List';
import ListEspecializacao from './ListEspecializacao';

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
           </Switch>
       </div>
    );
}

export default Medicos;