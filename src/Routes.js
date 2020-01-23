import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import ListingPage from './containers/ListingPage';
import ListingEditPage from './containers/ListingEditPage';

export default () =>
  <Switch>
    <Route exact path="/" render={() => (
      <Redirect to="/home"/>
    )}/>
    <Route path="/home" exact component={Home} />
    <Route path="/listing" exact component={ListingPage} />
    <Route path="/listing/edit" exact component={ListingEditPage} />
  </Switch>;
