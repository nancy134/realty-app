import React from 'react';
import {
    Row,
    Col,
    Form
} from 'react-bootstrap';

class ListingEdit extends React.Component {
    render(){
        return (
            <div>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Overview</h2>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <Form>
                        <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Label>Address</Form.Label>
                                <Form.Control />
                            </Col>
                            <Col md={4}>
                                <Form.Label>City</Form.Label>
                                <Form.Control />
                            </Col>
                            <Col md={2}>
                                <Form.Label>State</Form.Label>
                                <Form.Control />
                            </Col>
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control />
                            <Form.Label>Long Description</Form.Label>
                            <Form.Control as="textarea" />
                        </Row>
                        </Form>
                    </Form>
                </Col>
                <Col>
                <p>Images</p>
                </Col>
            </Row>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Available Space</h2>
                </Col>
            </Row>

            </div>
        );
    }
}

export default ListingEdit;
