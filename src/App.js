import React from 'react';
import './App.css';
import Routes from './Routes';
import authenticationService from './helpers/authentication';
import userService from './services/users';
import PolicyModal from './components/PolicyModal';
import AppNavBar from './AppNavBar';
import AppFooter from './AppFooter';
import localStorageService from './services/localStorage';
import sparkHelper from './helpers/spark';

class App extends React.Component {
  constructor(props){
      super(props);

        // Embed
        const params = new URLSearchParams(window.location.search);
        var embed = false;
        var embedParam = params.get('embed');
        if (embedParam === "true"){
            embed = true;
        }

      var minimalTab = false;
      if (window.location.pathname === "/terms" || 
          window.location.pathname === "/privacypolicy" ||
          window.location.pathname === "/constantcontact" ||
          window.location.pathname === "/sparkauth" ||
          embed)
          minimalTab = true;

      var showFooter = true;
      if (window.location.pathname === "/admin" ||
          window.location.pathname === "/account" ||
          window.location.pathname === "/constantcontact" ||
          window.location.pathname === "/spark" ||
          window.location.pathname === "/sparkauth" ||
          embed)
          showFooter = false;

      this.state = {
          loggedIn: false,
          showAddListingWizard: false,
          showFooter: showFooter,
          isAdmin: false,
          // Policy
          showPolicyModal: false,
          policyType: "",
          minimalTab: minimalTab,
          loading: true,
          email: null,
          embed: embed,

          // Spark
          sparkAccessToken: null,
          sparkRefreshToken: null,
          sparkCollections: null,
          sparkCollection: null,
          sparkCollectionListings: null,
          sparkSelectedCollection: null,
          showSparkAddCollection: false
      };
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
      this.handleAddListing = this.handleAddListing.bind(this);
      this.handleAddListingCancel = this.handleAddListingCancel.bind(this);

      // Spark
      this.handleSparkLogin = this.handleSparkLogin.bind(this);
      this.handleSparkCollectionSelect = this.handleSparkCollectionSelect.bind(this);
      this.handleSparkAddCollection = this.handleSparkAddCollection.bind(this);

      // Policy
      this.handlePolicyModalShow = this.handlePolicyModalShow.bind(this);
      this.handlePolicyModalHide = this.handlePolicyModalHide.bind(this);
  }
  componentDidMount(){
      var spark = process.env.REACT_APP_SPARK;
      var that = this;
      if (spark === "true"){
          var sparkAccessToken = localStorageService.sparkAccessToken();
          var sparkRefreshToken = localStorageService.sparkRefreshToken();
          if (sparkAccessToken){
              console.log("has authentication token, checking validity");
            
              sparkHelper.checkAuthentication(that, sparkAccessToken, sparkRefreshToken).then(function(result){
                  console.log("found valid authentication");
              }).catch(function(err){
                  console.log("authentication invalid");
                  console.log(err);
                  that.setState({
                      loading: false
                  });
              });
          } else {
              console.log("No authentication token");
              this.setState({
                  loading: false
              });
          }
      } else {
      authenticationService.reAuthenticate().then(function(result){
          userService.getUser().then(function(user){
              var isAdmin = user.isAdmin;
              that.setState({
                  email: user.email,
                  loggedIn: true,
                  loading: false,
                  isAdmin: isAdmin
              });
          }).catch(function(err){
              that.setState({
                  loading:false
              });
          });
      }).catch(function(err){
          that.setState({
              loading: false
          });
      });
      }
  }
  handlePolicyModalShow(type){
      this.setState({
          showPolicyModal: true,
          policyType: type
      });
  }
  handlePolicyModalHide(){
      this.setState({
          showPolicyModal: false,
          policyType: ""
      });
  }
  handleLogin(user){
      var isAdmin = false;
      if (user && user.isAdmin){
          isAdmin = true;
      }
      this.setState({
          loggedIn: true,
          isAdmin: isAdmin
      });
  }
  handleLogout(){
      this.setState({
          loggedIn: false
      });
  }
  handleRegister(body){
  }

  handleAddListing(){
      this.setState({
          showAddListingWizard: true
      });
  }
  handleAddListingCancel(){
      this.setState({
          showAddListingWizard: false
      });
  }

  // Spark

  handleSparkLogin(accessToken, refreshToken){
      console.log("handleLogin()");
      console.log("accessToken: "+accessToken);
      var that = this;
      sparkHelper.initialize(that, accessToken, refreshToken).then(function(result){
          console.log(result);
      }).catch(function(err){
          console.log(err);
      });
  }
  handleSparkCollectionSelect(id){
      console.log("handleSparkCollectionSelect: id: "+id);
      var that = this;
      sparkHelper.collectionSelect(that, that.state.sparkAccessToken, id);
  }
  handleSparkAddCollection(){
  }
  render(){
  return (
      <React.Fragment>
      <div className="mycontainer">
          <PolicyModal
              show={this.state.showPolicyModal}
              type={this.state.policyType}
              onHide={this.handlePolicyModalHide}
          />
          { !this.state.minimalTab ?
          <AppNavBar
              onAddListing={this.handleAddListing}
              loggedIn={this.state.loggedIn}
              isAdmin={this.state.isAdmin}
              onLogin={this.handleLogin}
              onLogout={this.handleLogout}
              onConfirm={this.handleConfirm}
              onRegister={this.handleRegister}
              onSparkLogin={this.handleSparkLogin}
              sparkAccessToken={this.state.sparkAccessToken}
              sparkRefreshToken={this.state.sparkRefreshToken}
              onSparkAddCollection={this.handleSparkAddCollection}
          />
          : null }
          { this.state.loading ?
          <p>Loading...</p>
          :
          <Routes
              // Logged in
              onLogin={this.handleLogin}
              loggedIn={this.state.loggedIn}
              isAdmin={this.state.isAdmin}
              email={this.state.email}
              showAddListingWizard={this.state.showAddListingWizard}
              onAddListingCancel={this.handleAddListingCancel}
              onShowPolicyModal={this.handlePolicyModalShow}
              loading={this.state.loading}
              embed={this.state.embed}

              sparkAccessToken={this.state.sparkAccessToken}
              sparkRefreshToken={this.state.sparkRefreshToken}
              sparkCollections={this.state.sparkCollections}
              sparkCollection={this.state.sparkCollection}
              sparkCollectionListings={this.state.sparkCollectionListings}
              onSparkCollectionSelect={this.handleSparkCollectionSelect}
              sparkSelectedCollection={this.state.sparkSelectedCollection}
              showSparkAddCollection={this.state.showSparkAddCollection}
          >
          </Routes>
          }
    </div>
    { !this.state.minimalTab && this.state.showFooter ?
    <AppFooter
        onPolicyModalShow={this.handlePolicyModalShow}
    />
    : null }
    </React.Fragment>
  );
}
}
export default App;
