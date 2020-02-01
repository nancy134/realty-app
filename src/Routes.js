import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import ListingPage from './containers/ListingPage';
import AccountPage from './containers/AccountPage';

export default () =>
  <Switch>
    <Route exact path="/" render={() => (
      <Redirect to="/home"/>
    )}/>
    <Route path="/home" exact component={Home} />
    <Route path="/listing" exact component={ListingPage} />
    <Route path="/account" exact component={AccountPage} />
  </Switch>;
