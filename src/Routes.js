import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import ListingPage from './containers/ListingPage';
import AccountPage from './containers/AccountPage';
import InstructionPage from './containers/InstructionPage';
import ReportPage from './containers/ReportPage';
import ReportListPage from './containers/ReportListPage';
import AdminPage from './containers/AdminPage';
import TermsPage from './containers/TermsPage';
import PrivacyPolicyPage from './containers/PrivacyPolicyPage';
import Test from './containers/Test';
import ConstantContact from './containers/ConstantContact';
import Spark from './containers/Spark';

class Routes extends React.Component {

constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
}

handleLogin(){
    this.props.onLogin();
}

render(){
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
                    onLogin={this.handleLogin}
                    loggedIn={this.props.loggedIn}
                    showAddListingWizard={this.props.showAddListingWizard}
                    onAddListingCancel={this.props.onAddListingCancel}
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
                    onLogin={this.handleLogin}
                    loggedIn={this.props.loggedIn}
                    onShowPolicyModal={this.props.onShowPolicyModal}
                />
            )
        }
    />
    <Route
        path="/listing"
        render={
            props => (
                <ListingPage {...props}
                    onLogin={this.handleLogin} 
                    loggedIn={this.props.loggedIn}
                    showAddListingWizard={this.props.showAddListingWizard}
                    onAddListingCancel={this.props.onAddListingCancel}
                    onShowPolicyModal={this.props.onShowPolicyModal}
                    embed={this.props.embed}
                />
            )
        }
    />
    <Route
        path="/report/:id"
        exact component={ReportPage}
    />
    <Route
        path="/report/list/:id"
        exact component={ReportListPage}
    />
    <Route
        path="/account"
        render={
            props => (
                <AccountPage {...props}
                    email={this.props.email}
                    loggedIn={this.props.loggedIn}
                    showAddListingWizard={this.props.showAddListingWizard}
                    onAddListingCancel={this.props.onAddListingCancel}
                    onLogin={this.handleLogin}
                    loading={this.props.loading}
                    
                />
            )
        }
    />
    <Route path="/admin" exact component={AdminPage} />
    <Route path="/instructions" exact component={InstructionPage} />
    <Route path="/terms" exact component={TermsPage} />
    <Route path="/privacypolicy" exact component={PrivacyPolicyPage} />
    <Route path="/test" exact component={Test} />
    <Route path="/constantcontact" exact component={ConstantContact} />
    <Route path="/sparkauth" exact component={Spark} />
  </Switch>
  );
}
}
export default Routes;
