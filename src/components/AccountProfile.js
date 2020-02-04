import React from 'react';
import {
    Form,
    Row,
    Col,
    Jumbotron,
    Image,
    Container,
    Button
} from 'react-bootstrap';

class AccountProfile extends React.Component {

render(){
    return (
    <React.Fragment>
        <Container>
            <Row className="pt-5">
            </Row>
            <Jumbotron className="pt-3">
                <Row >
                    <Col>
                    <h1 className="text-center">Account Profile</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                       <Form>
                           <Form.Group as={Row} controlId="formPlaintextEmail">
                               <Form.Label column sm="2">Email</Form.Label>
                               <Col sm="7">
                                   <Form.Control plaintext readOnly defaultValue="email@example.com" />
                               </Col >
                               <Col sm="3"><Button variant="link">Change email</Button></Col>
                           </Form.Group>

                           <Form.Group as={Row} controlId="formPlaintextPassword">
                               <Form.Label column sm="2">Password</Form.Label>
                               <Col sm="10">
                                   <Button className="pl-0" variant="link">Change Password</Button> 
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} controlId="name">
                               <Form.Label column sm="2">Name</Form.Label>
                               <Col sm="10">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} controlId="company">
                               <Form.Label column sm="2">Company</Form.Label>
                               <Col sm="10">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} controlId="title">
                               <Form.Label column sm="2">Title</Form.Label>
                               <Col sm="10">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} controlId="address1">
                               <Form.Label column sm="4">Mailing Address</Form.Label>
                               <Col sm="8">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} controlId="address2">
                               <Form.Label column sm="4"></Form.Label>
                               <Col sm="8">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} controlId="city">
                               <Form.Label column sm="2">City</Form.Label>
                               <Col sm="10">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} >
                               <Form.Label column sm="2">State</Form.Label>
                               <Col sm="4">
                                   <Form.Control as="select" >
                                       <option>State</option>
                                       <option>Alabama</option>
                                       <option>Alaska</option>
                                   </Form.Control>
                               </Col>
                               <Form.Label column sm="1">Zip</Form.Label>
                               <Col sm="5">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} >
                               <Form.Label column sm="2">Phone</Form.Label>
                               <Col sm="3">
                                   <Form.Control as="select" defaultValue="office" >
                                       <option value="office">Office</option>
                                       <option value="mobile">Mobile</option>
                                       <option value="other">Other</option>
                                   </Form.Control>
                               </Col>
                               <Col sm="4">
                                   <Form.Control type="text" />
                               </Col>
                               <Col>
                                   <Form.Check label="Primary" type="radio" />
                               </Col>
                           </Form.Group>
                          <Form.Group as={Row} >
                               <Form.Label column sm="2">Phone</Form.Label>
                               <Col sm="3">
                                   <Form.Control as="select" defaultValue="mobile" >
                                       <option value="office">Office</option>
                                       <option value="mobile">Mobile</option>
                                       <option value="other">Other</option>
                                   </Form.Control>
                               </Col>
                               <Col sm="4">
                                   <Form.Control type="text" />
                               </Col>
                               <Col>
                                   <Form.Check label="Primary" type="radio" />
                               </Col>
                           </Form.Group>
                          <Form.Group as={Row} >
                               <Form.Label column sm="2">Phone</Form.Label>
                               <Col sm="3">
                                   <Form.Control as="select" defaultValue="other" >
                                       <option value="office">Office</option>
                                       <option value="mobile">Mobile</option>
                                       <option value="other">Other</option>
                                   </Form.Control>
                               </Col>
                               <Col sm="4">
                                   <Form.Control type="text" />
                               </Col>
                               <Col>
                                   <Form.Check label="Primary" type="radio" />
                               </Col>
                           </Form.Group>
                           <Form.Group as={Row} controlId="website">
                               <Form.Label column sm="2">Website</Form.Label>
                               <Col sm="10">
                                   <Form.Control type="text" />
                               </Col>
                           </Form.Group>

                       </Form>
                   </Col>
                   <Col>
                       <Image src="/broker.jpg" className="img-center" roundedCircle/>
                       <div>Bio</div>
                       <Form.Control as="textarea" rows="6" />
                   </Col>
               </Row>
               <div className="text-right">
               <Button variant="success">Update</Button>
               </div>
           </Jumbotron>
       </Container>
    </React.Fragment>
    );
}
}

export default AccountProfile;
