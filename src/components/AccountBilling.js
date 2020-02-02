import React from 'react';
import {
    Container,
    Row,
    Jumbotron,
    Col,
    Form,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCcVisa,
    faCcMastercard
} from '@fortawesome/fontawesome-free-brands';

class AccountBilling extends React.Component {

render(){
    return(
    <React.Fragment>
        <Container>
            <Row className="pt-5">
            </Row>
            <Jumbotron>
                <Row>
                    <Col>
                        <Form>
                           <Row>
                               <Col sm="2"></Col>
                               <Col sm="4">
                                   <FontAwesomeIcon size="3x" icon={faCcVisa} />&nbsp;
                                   <FontAwesomeIcon size="3x" icon={faCcMastercard} />
                               </Col>
                           </Row>
                           <Form.Group as={Row} controlId="name">
                               <Form.Label column sm="2">Name on Card</Form.Label>
                               <Col sm="4">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>

                           <Form.Group as={Row} controlId="cardNumber">
                               <Form.Label column sm="2">Card Number</Form.Label>
                               <Col sm="4">
                                   <Form.Control type="text" />
                               </Col>
                               <Form.Label column sm="1">CCV</Form.Label>
                               <Col sm="2">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>

                           <Form.Group as={Row} controlId="expiration">
                               <Form.Label column sm="2">Expiration</Form.Label>
                               <Col sm="2">
                                   <Form.Control as="select">
                                       <option>01-January</option>
                                       <option>02-February</option>
                                       <option>03-March</option>
                                   </Form.Control>
                               </Col>
                               <Col sm="2">
                                   <Form.Control as="select">
                                       <option>2020</option>
                                       <option>2021</option>
                                       <option>2022</option>
                                   </Form.Control>
                               </Col>
                           </Form.Group>

                           <Form.Group as={Row} controlId="address1">
                               <Form.Label column sm="2">Billing Address</Form.Label>
                               <Col sm="4">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} controlId="address2">
                               <Form.Label column sm="2"></Form.Label>
                               <Col sm="4">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                          <Form.Group as={Row} controlId="city">
                               <Form.Label column sm="2">City</Form.Label>
                               <Col sm="4">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} >
                               <Form.Label column sm="2">State</Form.Label>
                               <Col sm="3">
                                   <Form.Control as="select" >
                                       <option>State</option>
                                       <option>Alabama</option>
                                       <option>Alaska</option>
                                   </Form.Control>
                               </Col>
                               <Form.Label column sm="1">Zip</Form.Label>
                               <Col sm="3">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                       </Form>
                   </Col>
               </Row>
               <div className="text-right">
                   <Button variant="success">Add Card</Button>
               </div>
            </Jumbotron>
        </Container>
    </React.Fragment>
    );
}
}

export default AccountBilling;
