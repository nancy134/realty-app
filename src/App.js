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

class App extends React.Component {
  constructor(props){
      super(props);

      var minimalTab = false;
      if (window.location.pathname === "/terms" || window.location.pathname === "/privacypolicy")
          minimalTab = true;

      var showFooter = true;
      if (window.location.pathname === "/admin" ||
          window.location.pathname === "/account")
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
          loading: true
      };
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
      this.handleAddListing = this.handleAddListing.bind(this);
      this.handleAddListingCancel = this.handleAddListingCancel.bind(this);

      // Policy
      this.handlePolicyModalShow = this.handlePolicyModalShow.bind(this);
      this.handlePolicyModalHide = this.handlePolicyModalHide.bind(this);
  }
  componentDidMount(){
      var that = this;
      authenticationService.reAuthenticate().then(function(result){
          userService.getUser().then(function(user){
              var isAdmin = user.isAdmin;
              that.setState({
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
          <Navbar>
              <Navbar.Brand href="./home">
                  <img
                  alt="logo" 
                  src="https://sabre-images.s3.amazonaws.com/FindingCRELogo.png"
                  className="p-0 d-inline-block align-top"
                  /></Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
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
          <Routes
              // Logged in
              onLogin={this.handleLogin}
              loggedIn={this.state.loggedIn}
              isAdmin={this.state.isAdmin}
              showAddListingWizard={this.state.showAddListingWizard}
              onAddListingCancel={this.handleAddListingCancel}
              onShowPolicyModal={this.handlePolicyModalShow}
              loading={this.state.loading}
          >
          </Routes>
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
    </div>
    : null }
    </React.Fragment>
  );
}
}
export default App;
