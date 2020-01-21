import React from 'react';
import {
    Row,
    Col,
    Image,
    Button
} from 'react-bootstrap';

class ListingDetailBrokers extends React.Component {
    render() {
        return (
            <div>
                <Row className="mt-3">
                    <Col>
                        <h2 className="border-bottom border-warning">Brokers</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Row>
                            <Col md={4}><Image src="./broker.jpg" className="broker-image"  roundedCircle /></Col>
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
                            <Col md={4}><Image src="./broker.jpg" className="broker-image"  roundedCircle /></Col>
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
                            <Col md={4}><Image src="./broker.jpg" className="broker-image"  roundedCircle /></Col>
                            <Col md={8}>
                                <Row>Paul Piedra</Row>
                                <Row>Sabre Realty Group</Row>
                                <Row>(203) 388-8030</Row>
                                <Row><Button className="p-0" variant="link">Contact</Button></Row>
                            </Col>
                        </Row>

                    </Col>
                </Row>
             </div>
        );
    }
}

export default ListingDetailBrokers;
