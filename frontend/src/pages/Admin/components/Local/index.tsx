import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Local = () => {
    return (
       <div>
           <Switch>
               <Route path="/admin/local" exact>
                    <List />
               </Route>
               <Route path="/admin/local/:localId">
                    <Form />
               </Route>
           </Switch>
       </div>
    );
}

export default Local;