import React from 'react';
import './App.css';
import { 
    Container,
    Nav,
    Navbar
} from 'react-bootstrap';
import Routes from './Routes';
import AccountButton from './components/AccountButton';
import { isAuthenticated } from './helpers/authentication';

class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          loggedIn: false
      };
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
      this.handleResgister = this.handleRegister.bind(this);
  }
  componentDidMount(){
      if (isAuthenticated()){
          this.setState({
              loggedIn: true
          });
      }
  }
  handleLogin(){
      console.log("App:handleLogin()");
      this.setState({loggedIn: true});
  }
  handleLogout(){
      this.setState({loggedIn: false});
  }
  handleRegister(){
      console.log("handleRegister");
  }
  render(){
  return (
      <Container fluid className="d-flex flex-column vh-100 vw-100">
          <Navbar>
              <Navbar.Brand href="#home">
                  <img
                  alt="logo" 
                  src="/metropolitan.png"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  />{' '}Sabre Realty</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                 <Nav.Item>
                      <Nav.Link eventKey="link-1"><AccountButton onLogin={this.handleLogin} onLogout={this.handleLogout} onRegister={this.handleRegister}/></Nav.Link>
                  </Nav.Item>

              </Navbar.Collapse>
          </Navbar>
          <Routes loggedIn={this.state.loggedIn}></Routes>
    </Container>
  );
}
}
export default App;
