import React from 'react';

import {
    Row,
    Col
} from 'react-bootstrap';

class ListingDetailPortfolio extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Portfolio</h2>
                </Col>
            </Row>
            <Row className="bg-light shadow">
                <Col md={4} className="font-weight-bold">Tenant</Col>
                <Col md={2} className="font-weight-bold">Building Size</Col>
                <Col md={2} className="font-weight-bold">Lot Size</Col>
                <Col md={2} className="font-weight-bold">Type</Col>
            </Row>
        </React.Fragment>
        );
    }
}
export default ListingDetailPortfolio;
