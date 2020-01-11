import React from 'react';
import './App.css';
import { 
    Nav,
    Navbar
} from 'react-bootstrap';
import Routes from './Routes';

function App() {
  return (
    <div>
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
          <Nav.Item>
            <Nav.Link eventKey="link-2">Add a Listing</Nav.Link>
          </Nav.Item>

        </Navbar.Collapse>
      </Navbar>
      <Routes></Routes>
    </div>
  );
}

export default App;
