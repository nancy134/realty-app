import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import ListingPage from './containers/ListingPage';
import AccountPage from './containers/AccountPage';
import InstructionPage from './containers/InstructionPage';
import ReportPage from './containers/ReportPage';

class Routes extends React.Component {

render(){
  var reporting = true;
  return(
  <Switch loggedIn={this.props.loggedIn}>
    <Route exact path="/" render={() => (
      <Redirect to="/home"/>
    )}/>
    <Route
        path="/home"
        render={
            props => (
                <Home
                    {...props}
                />
            )
        }
    />
    <Route
        path="/listing/:id"
        render={
            props => (
                <ListingPage
                    {...props}
                    loggedIn={this.props.loggedIn}
                />
            )
        }
    />
    <Route
        path="/listing"
        render={
            props => (
                <ListingPage {...props}
                    loggedIn={this.props.loggedIn}
                />
            )
        }
    />
    <Route path="/report/:id" exact component={ReportPage} />
    <Route path="/account" exact component={AccountPage} />
    <Route path="/instructions" exact component={InstructionPage} />
    <Route
        path="/reporting"
        render={
            props => (
                <ListingPage
                    {...props}
                    loggedIn={this.props.loggedIn}
                    reporting={reporting}
                />
            )
        } 
    />
  </Switch>
  );
}
}
export default Routes;
