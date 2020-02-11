import React from 'react';

import {
    Row,
    Col
} from 'react-bootstrap';

class ListingDetailTenants extends React.Component {

    render(){
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Tenants</h2>
                </Col>
            </Row>
            <Row className="bg-light shadow">
                <Col md={4} className="font-weight-bold">Tenant</Col>
                <Col md={2} className="font-weight-bold">Square Feet</Col>
                <Col md={2} className="font-weight-bold">Base Rent</Col>
                <Col md={2} className="font-weight-bold">Lease Ends</Col>
            </Row>
        </React.Fragment>
        );
    }
}
export default ListingDetailTenants;
