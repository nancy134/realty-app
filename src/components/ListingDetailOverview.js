import React from 'react';
import {
    Row,
    Col,
    Image
} from 'react-bootstrap';

class ListingDetailOverview extends React.Component {
    render() {
        return (
            <div>
                <Row className="mt-2 border-bottom border-warning">
                    <Col>
                    <h2>Overview</h2>
                    </Col>
                    <Col>
                    <div className="text-right">
                    <h4>For Lease</h4>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    <p>
                    Street Retail and Office Space for Lease on High Ridge Road in Stamford, CT</p>
<p>
Street Retail in Ridge Plaza on heavily traveled High Ridge Road. The Plaza contains multiple retailers and has ample parking on site. Pylon signage is available.</p>
                    </Col>
                    <Col md={6}>
                        <Image src="/image1.jpg" className="border-0" thumbnail />
                    </Col>

                </Row>
            </div>
        );
    }
}

export default ListingDetailOverview;
