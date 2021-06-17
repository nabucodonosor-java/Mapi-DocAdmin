import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Atendimento = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/atendimento" exact>
                    <List />
               </Route>
               <Route path="/admin/atendimento/:atendimentoId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default Atendimento;