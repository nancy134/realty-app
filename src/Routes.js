import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import ListingPage from './containers/ListingPage';
import AccountPage from './containers/AccountPage';

class Routes extends React.Component {

render(){
   console.log("Routes loggedIn: "+this.props.loggedIn);
  return(
  <Switch loggedIn={this.props.loggedIn}>
    <Route exact path="/" render={() => (
      <Redirect to="/home"/>
    )}/>
    <Route path="/home" exact component={Home} />
    <Route path="/listing" render={props => (<ListingPage {...props} loggedIn={this.props.loggedIn}/>)}/>

    <Route path="/account" exact component={AccountPage} />
  </Switch>
  );
}
}
export default Routes;
