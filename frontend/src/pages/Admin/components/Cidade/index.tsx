import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Cidade = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/cidade" exact>
                    <List />
               </Route>
               <Route path="/admin/cidade/:cidadeId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default Cidade;