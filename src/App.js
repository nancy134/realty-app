import React from 'react';
import './App.css';
import { 
    Nav,
    Jumbotron,
    InputGroup,
    FormControl,
    Button,
    Container
} from 'react-bootstrap';

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
          <div className="bimage">
              <p className="p-5"></p>
              <Jumbotron className="jtron">
                  <Container>
                      <h1>FIND YOUR SPACE</h1>
                      <InputGroup className="mb-3">
                          <FormControl
                            placeholder="City, State or Zip Code"
                            aria-label="City, State or Zip Code"
                            aria-describedby="basic-addon2"
                          />
                          <InputGroup.Append>
                              <Button variant="outline-secondary">Find Space</Button>
                          </InputGroup.Append>
                      </InputGroup>
                  </Container>
              </Jumbotron>
              <p className="p-5"></p>
          </div>
          <p>Marketing information</p>
      </div>
  );
}

export default App;
