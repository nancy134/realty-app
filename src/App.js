import React from 'react';
import './App.css';
import { 
    Nav,
    Navbar,
    Button
} from 'react-bootstrap';
import Routes from './Routes';
import AccountButton from './components/AccountButton';
import authenticationService from './helpers/authentication';
import userService from './services/users';
import PolicyModal from './components/PolicyModal';
import { Helmet } from 'react-helmet';
import { getTitlePrefix } from './helpers/utilities';
import UserModal from './components/UserModal';

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
          embed)
          minimalTab = true;

      var showFooter = true;
      if (window.location.pathname === "/admin" ||
          window.location.pathname === "/account" ||
          window.location.pathname === "/constantcontact" ||
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

          // behalfUser 
          showUserModal: false,
          behalfUser: "",
          behalfUserCognitId: "",
          behalfUserError: null
      };
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
      this.handleAddListing = this.handleAddListing.bind(this);
      this.handleAddListingCancel = this.handleAddListingCancel.bind(this);

      // Policy
      this.handlePolicyModalShow = this.handlePolicyModalShow.bind(this);
      this.handlePolicyModalHide = this.handlePolicyModalHide.bind(this);

      // UserModal
      this.handleUserModalShow = this.handleUserModalShow.bind(this);
      this.handleUserModalHide = this.handleUserModalHide.bind(this);
      this.handleSetBehalfUser = this.handleSetBehalfUser.bind(this);
  }

  componentDidMount(){
      var that = this;
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

  handleUserModalShow(){
      this.setState({
          showUserModal: true
      });
  }

  handleUserModalHide(){
      this.setState({
          showUserModal: false
      });
  }

  handleSetBehalfUser(behalfUser){
      var that = this;
      var query = "email="+behalfUser;
      userService.getUsers(query).then(function(users){
          if (users.users.rows.length > 0){
                 that.setState({
                     behalfUser: behalfUser,
                     behalfUserCognitoId: users.users.rows[0].cognitoId,
                     showUserModal: false
                 });
          } else {
              that.setState({
                  behalfUserError: "Invalid user"
              });
          }
      }).catch(function(err){
          that.setState({
              bahalfUserError: "Unknown error"
          });
      });
  }

  render(){
  // title
  var title  = getTitlePrefix(window.location.hostname);

  var behalfUser = null;
  if (this.state.behalfUser && this.state.behalfUser !== ""){
      behalfUser = this.state.behalfUser;
  }

  return (
      <React.Fragment>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <div className="mycontainer">

          <UserModal
              show={this.state.showUserModal}
              onHide={this.handleUserModalHide}
              onSetBehalfUser={this.handleSetBehalfUser}
              behalfUser={this.state.behalfUser}
              behalfUserError={this.state.behalfUserError}
          />
          <PolicyModal
              show={this.state.showPolicyModal}
              type={this.state.policyType}
              onHide={this.handlePolicyModalHide}
          />
          { !this.state.minimalTab ?
          <Navbar>
              <Navbar.Brand href="./home">
                  <img
                  alt="logo" 
                  src="https://sabre-images.s3.amazonaws.com/FindingCRELogo.png"
                  className="p-0 d-inline-block align-top"
                  /></Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                  { this.state.isAdmin ?
                  <Nav.Item>
                      <Nav.Link eventKey="link-3">
                          <Button
                              variant="outline-primary"
                              onClick={this.handleUserModalShow}
                          >
                              { behalfUser ?
                              <span>On Behalf of {behalfUser}</span>
                              : 
                              <span>On Behalf of...</span>
                              }
                          </Button>
                      </Nav.Link>
                  </Nav.Item>
                  : null}
                  <Nav.Item>
                      <Nav.Link eventKey="link-2">
                          <Button
                              id="button-add-listing"
                              onClick={this.handleAddListing}
                              variant="outline-primary"
                          >
                              <span>Add a Listing</span>
                          </Button>
                      </Nav.Link> 
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link eventKey="link-1">
                          <AccountButton 
                              loggedIn={this.state.loggedIn}
                              isAdmin={this.state.isAdmin}
                              onLogin={this.handleLogin} 
                              onLogout={this.handleLogout} 
                              onConfirm={this.handleConfirm}
                              onRegister={this.handleRegister}
                          />
                      </Nav.Link>
                  </Nav.Item>
              </Navbar.Collapse>
          </Navbar>
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

              //Behalf User
              behalfUserCognitoId={this.state.behalfUserCognitId}
              behalfUser={this.state.behalfUser}
          >
          </Routes>
          }
    </div>
    { !this.state.minimalTab && this.state.showFooter ?
    <div className="bg-light ml-1 mr-1">
       <Button
           variant="link"
           size="sm"
           onClick={() => this.handlePolicyModalShow("terms")}
       >
           <span>Terms & Conditions</span>
       </Button>
       <Button
           variant="link"
           size="sm"
           onClick={() => this.handlePolicyModalShow("privacy")}
       >
           <span>Privacy Policy</span>
       </Button>
       <Button
           variant="link"
           size="sm"
           onClick={() => this.handlePolicyModalShow("about")}
       >
           <span>About</span>
       </Button>
       <Button
           variant="link"
           size="sm"
           onClick={() => this.handlePolicyModalShow("contact")}
       >
           <span>Contact Us</span>
       </Button>
    </div>
    : null }
    </React.Fragment>
  );
}
}
export default App;
