import React from 'react';
import './App.css';
import { 
    Container,
    Nav,
    Navbar
} from 'react-bootstrap';
import Routes from './Routes';

function App() {
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
            <Nav.Link eventKey="link-1">Login</Nav.Link>
          </Nav.Item>

        </Navbar.Collapse>
      </Navbar>
      <Routes></Routes>
    </Container>
  );
}

export default App;
