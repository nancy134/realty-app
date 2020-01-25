import React from 'react';
import {
    Row,
    Col,
    Form
} from 'react-bootstrap';

class ListingEdit extends React.Component {
    render(){
        var address="240-246 Moody St";
        var city="Waltham";
        var state="MA";
        if (this.props.content === "new"){
            address="";
            city="";
            state="";
        }
        return (
            <Row className="mt-2">
                <Col>
                    <Form>
                        <Form.Row>
                            <Col md={6}>
                                <Form.Label>Address</Form.Label>
                                <Form.Control value={address}/>
                            </Col>
                            <Col md={4}>
                                <Form.Label>City</Form.Label>
                                <Form.Control value={city}/>
                            </Col>
                            <Col md={2}>
                                <Form.Label>State</Form.Label>
                                <Form.Control value={state}/>
                            </Col>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        );
    }

}

export default ListingEdit;
