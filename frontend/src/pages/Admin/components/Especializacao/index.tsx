import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Especializacao = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/especializacao" exact>
                    <List />
               </Route>
               <Route path="/admin/especializacao/:especializacaoId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default Especializacao;