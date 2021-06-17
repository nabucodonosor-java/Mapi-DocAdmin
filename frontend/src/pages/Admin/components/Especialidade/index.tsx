import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Especialidade = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/especialidade" exact>
                    <List />
               </Route>
               <Route path="/admin/especialidade/:especialidadeId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default Especialidade;