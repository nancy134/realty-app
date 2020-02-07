import React from 'react';
import {
    Row,
    Col,
    Form
} from 'react-bootstrap';

class ListingEdit extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        var address="";
        var city="";
        var state="";

        if (this.props.listing){
            address=this.props.listing.address;
            city=this.props.listing.city;
            state=this.props.listing.state;
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
