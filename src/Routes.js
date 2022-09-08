import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
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
import Unsubscribe from './containers/Unsubscribe';

class AppRoutes extends React.Component {

constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
}

handleLogin(){
    this.props.onLogin();
}

render(){
  return(
  <Routes loggedIn={this.props.loggedIn}>
    <Route exact path="/" element={
      <Navigate replace to="/home"/>
    }/>
    <Route
        path="/home"
        element={ 
            <Home
                onLogin={this.handleLogin}
                loggedIn={this.props.loggedIn}
                showAddListingWizard={this.props.showAddListingWizard}
                onAddListingCancel={this.props.onAddListingCancel}

                // BehalfUser
                isAdmin={this.props.isAdmin}
                behalfUser={this.props.behalfUser}
                behalfUserCognitoId={this.props.behalfUserCognitoId}

            />
        }
    />
    <Route
        path="/listing/:id"
        element={
                <ListingPage
                    onLogin={this.handleLogin}
                    loggedIn={this.props.loggedIn}
                    onShowPolicyModal={this.props.onShowPolicyModal}
                />
        }
    />
    <Route
        path="/listing"
        element={
                <ListingPage
                    onLogin={this.handleLogin} 
                    loggedIn={this.props.loggedIn}
                    showAddListingWizard={this.props.showAddListingWizard}
                    onAddListingCancel={this.props.onAddListingCancel}
                    onShowPolicyModal={this.props.onShowPolicyModal}
                    embed={this.props.embed}

                    // BehalfUser
                    isAdmin={this.props.isAdmin}
                    behalfUser={this.props.behalfUser}
                    behalfUserCognitoId={this.props.behalfUserCognitoId}
                />
        }
    />
    <Route
        path="/report/:id"
        element={<ReportPage/>}
    />
    <Route
        path="/report/list/:id"
        element={<ReportListPage/>}
    />
    <Route
        path="/account"
        element={
                <AccountPage
                    email={this.props.email}
                    loggedIn={this.props.loggedIn}
                    showAddListingWizard={this.props.showAddListingWizard}
                    onAddListingCancel={this.props.onAddListingCancel}
                    onLogin={this.handleLogin}
                    loading={this.props.loading}
                    
                />
        }
    />
    <Route path="/admin" element={<AdminPage/>} />
    <Route path="/instructions" element={<InstructionPage/>} />
    <Route path="/terms" element={<TermsPage/>} />
    <Route path="/privacypolicy" element={<PrivacyPolicyPage/>} />
    <Route path="/test" element={<Test/>} />
    <Route path="/constantcontact" element={<ConstantContact/>} />
    <Route path="/sparkauth" element={<Spark/>} />
    <Route path="/unsubscribe" element={<Unsubscribe/>} />
  </Routes>
  );
}
}
export default AppRoutes;
