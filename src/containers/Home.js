import React, { Component } from 'react';
import './Home.css';
import {
    Jumbotron,
    InputGroup,
    FormControl,
    Button,
    Container
} from 'react-bootstrap';

export class Home extends Component { 
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    console.log("handleClick()");
    var url = window.location.protocol + "//" + window.location.hostname + "/listing";
    window.location.href = url; 
  }
  render(){
  return (
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
              <Button variant="outline-secondary" onClick={this.handleClick}>Find Space</Button>
            </InputGroup.Append>
          </InputGroup>
        </Container>
      </Jumbotron>
      <p className="p-5"></p>
    </div>
  );
  }
}

export default Home; 

