import React from 'react';
import './App.css';
import { 
    Container,
    Nav,
    Navbar
} from 'react-bootstrap';
import Routes from './Routes';
import AccountButton from './components/AccountButton';
import authenticationService from './helpers/authentication';

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          loggedIn: false,
      };
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
      this.handleConfirm = this.handleConfirm.bind(this);
  }
  componentDidMount(){
      if (authenticationService.isAuthenticated()){
          this.setState({
              loggedIn: true
          });
      }
  }
  handleLogin(){
      console.log("handleLogin()");
      this.setState({loggedIn: true});
  }
  handleLogout(){
      this.setState({
          loggedIn: false
      },() => {
          window.location.reload();
      });
  }
  handleRegister(){
  }
  handleConfirm(){
  }
  render(){
  return (
      <Container fluid className="app d-flex flex-column vh-100 vw-100">
          <Navbar className="p-0">
              <Navbar.Brand href="./home">
                  <img
                  alt="logo" 
                  src="https://sabre-images.s3.amazonaws.com/FindingCRE+Logo.jpg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  />{' '}FindingCRE.com</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                  <Nav.Item>
                      <Nav.Link eventKey="link-1">
                          <AccountButton 
                              onLogin={this.handleLogin} 
                              onLogout={this.handleLogout} 
                              onRegister={this.handleRegister}
                              onConfirm={this.handleConfirm}
                          />
                      </Nav.Link>
                  </Nav.Item>
              </Navbar.Collapse>
          </Navbar>
          <Routes
              // Logged in
              loggedIn={this.state.loggedIn}
          ></Routes>
    </Container>
  );
}
}
export default App;
