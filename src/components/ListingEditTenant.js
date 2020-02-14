import React from 'react';
import {
    Col,
    Form
} from 'react-bootstrap';

class ListingEditTenant extends React.Component {

    render(){
        var tenant = "";
        var area = "";
        var baseRent = "";
        var leaseEnds = "";
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Tenant</Form.Label>
                        <Form.Control value={tenant}/> 
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Square Feet</Form.Label>
                        <Form.Control value={area}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Base Rent</Form.Label>
                        <Form.Control value={baseRent}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Lease Ends</Form.Label>
                        <Form.Control value={leaseEnds}/>
                    </Form.Group>
                </Form.Row>

            </Form>
        );
    }
}

export default ListingEditTenant;
