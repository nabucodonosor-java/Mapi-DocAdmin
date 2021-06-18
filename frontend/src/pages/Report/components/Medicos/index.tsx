import React from 'react';
import { Route, Switch } from 'react-router-dom';
import List from './List';

const Medicos = () => {
    return (
       <div>
           <Switch>
               <Route path="/report/medicos" exact>
                    <List />
               </Route>
           </Switch>
       </div>
    );
}

export default Medicos;