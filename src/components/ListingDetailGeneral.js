import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';

class ListingDetailGeneral extends React.Component {
    render() {
        return (
            <div>
                <h2 className="border-bottom border-warning">General</h2>
                <Row>
                    <Col>Total Building Size</Col>
                    <Col className="font-weight-bold">45,000 sf</Col>
                </Row>
                <Row>
                    <Col>Lot Size</Col>
                    <Col className="font-weight-bold">1.27 Acre</Col>
                </Row>
                <Row>
                    <Col>Total Available Space</Col>
                    <Col className="font-weight-bold">5,200 sf</Col>
                </Row>
                <Row>
                    <Col>Zone</Col>
                    <Col className="font-weight-bold">CB</Col>
                </Row>
                <Row>
                    <Col>Parking</Col>
                    <Col className="font-weight-bold">3 / 1000</Col>
                </Row>
                <Row>
                    <Col>Nets</Col>
                    <Col className="font-weight-bold">$8.25 / sq ft</Col>
                </Row>
                <Row>
                    <Col>Taxes</Col>
                    <Col></Col>
                </Row>
             </div>
        );
    }
}

export default ListingDetailGeneral;
