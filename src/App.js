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
import PolicyModal from './components/PolicyModal';

class App extends React.Component {
  constructor(props){
      super(props);

      console.log(window.location.pathname);
      var minimalTab = false;
      if (window.location.pathname === "/terms")
          minimalTab = true;
      this.state = {
          loggedIn: false,
          showAddListingWizard: false,

          // Policy
          showPolicyModal: false,
          policyType: "",
          minimalTab: minimalTab 
      };
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleAddListing = this.handleAddListing.bind(this);
      this.handleAddListingCancel = this.handleAddListingCancel.bind(this);

      // Policy
      this.handlePolicyModalShow = this.handlePolicyModalShow.bind(this);
      this.handlePolicyModalHide = this.handlePolicyModalHide.bind(this);
  }
  componentDidMount(){
      if (authenticationService.isAuthenticated()){
          this.setState({
              loggedIn: true
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
  handleLogin(){
      this.setState({loggedIn: true});
  }
  handleLogout(){
      this.setState({
          loggedIn: false
      },() => {
          var url =
              window.location.protocol +
              "//" +
              window.location.hostname +
              window.location.pathname;
      
          window.location.href = url;
      });
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
                  src="https://sabre-images.s3.amazonaws.com/FindingCRE+Logo.jpg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  />{' '}FindingCRE</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                  <Nav.Item>
                      <Nav.Link eventKey="link-2">
                          <Button
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
                              onLogin={this.handleLogin} 
                              onLogout={this.handleLogout} 
                              onRegister={this.handleRegister}
                              onConfirm={this.handleConfirm}
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
              showAddListingWizard={this.state.showAddListingWizard}
              onAddListingCancel={this.handleAddListingCancel}
              onShowPolicyModal={this.handlePolicyModalShow}
          >
          </Routes>
    </div>
    { !this.state.minimalTab ?
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
