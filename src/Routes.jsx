import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Login } from './containers';

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </Switch>
);

export default Routes;
