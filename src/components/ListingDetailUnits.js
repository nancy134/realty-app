import React from 'react';

import {
    Row,
    Col
} from 'react-bootstrap';

class ListingDetailUnits extends React.Component {

    render(){
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Unit Detail</h2>
                </Col>
            </Row>
            <Row className="bg-light shadow">
                <Col md={4} className="font-weight-bold">Description</Col>
                <Col md={2} className="font-weight-bold">No. of Units</Col>
                <Col md={2} className="font-weight-bold">Square feet</Col>
                <Col md={2} className="font-weight-bold">Income</Col>
            </Row>
        </React.Fragment>
        );
    }
}
export default ListingDetailUnits;
