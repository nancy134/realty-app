import React from 'react';
import {
    Row,
    Col,
    Button,
    Image,
    Container,
    Jumbotron,
    Form
} from 'react-bootstrap';

class AccountAssociates extends React.Component {

render(){
    return(
    <React.Fragment>
        <Container>
            <Row className="pt-5">
            </Row>
                <Jumbotron className="pt-3">
                <Row>
                    <Col>
                    <h1 className="text-center">Account Asssociates</h1>
                    </Col>
                </Row> 
                <Row>
                    <Col md={4}>
                        <Row>
                            <Col md={4}><Image src="/broker.jpg" className="broker-image"  roundedCircle /></Col>
                            <Col md={8}>
                                <Row>Paul Piedra</Row>
                                <Row>Sabre Realty Group</Row>
                                <Row>(203) 388-8030</Row>
                                <Row><Button className="p-0" variant="link">Contact</Button></Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col md={4}><Image src="/broker.jpg" className="broker-image"  roundedCircle /></Col>
                            <Col md={8}>
                                <Row>Fred Ryon</Row>
                                <Row>Sabre Realty Group</Row>
                                <Row>(203) 388-8030</Row>
                                <Row><Button className="p-0" variant="link">Contact</Button></Row>
                            </Col>
                        </Row>

                    </Col>
                    <Col>
                        <Row>
                            <Col md={4}><Image src="/broker.jpg" className="broker-image"  roundedCircle /></Col>
                            <Col md={8}>
                                <Row>Joe Shmoe</Row>
                                <Row>Sabre Realty Group</Row>
                                <Row>(203) 388-8030</Row>
                                <Row><Button className="p-0" variant="link">Contact</Button></Row>
                            </Col>
                        </Row>

                    </Col>
                </Row>
                <Row className="mt-5"></Row>

                <Row>
                <Col>
                <Row>
                   <h4>Enter email to invite new associates</h4>
                </Row>
                   <Form.Group as={Row} controlId="invite">
                       <Form.Label className="pl-0" column sm="1">Email</Form.Label>
                       <Col sm="8">
                           <Form.Control type="text" />
                       </Col>
                       <Col sm="1">
                           <Button variant="success">Send</Button>
                       </Col>
                   </Form.Group>
                </Col>

                <Col>
                <Row>
                    <h4>Awaiting confirmation</h4>
                </Row>
                <Row >    
                    <Col className="pl-0">
                    nancy.piedra@gmail.com
                    </Col>
                    <Col>
                        <Button variant="link">Resend Invite</Button>
                    </Col>
                </Row>
                </Col>
                </Row>
            </Jumbotron> 
        </Container>
    </React.Fragment>
    );
}
}

export default AccountAssociates;
