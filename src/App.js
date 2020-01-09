import React from 'react';
import './App.css';
import { 
    Nav
} from 'react-bootstrap';
import Routes from './Routes';

function App() {
  return (
      <div>
          <Nav className="justify-content-end" activeKey="/home">
              <Nav.Item>
                  <Nav.Link eventKey="link-1">Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link eventKey="link-2">Add Listing</Nav.Link>
              </Nav.Item>
          </Nav>
          <Routes></Routes>
      </div>
  );
}

export default App;
