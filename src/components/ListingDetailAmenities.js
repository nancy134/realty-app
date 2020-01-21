import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';

class ListingDetailAmenities extends React.Component {
    render() {
        return (
            <div>
                <h2 className="border-bottom border-warning">Amenities</h2>
                <Row><Col>Fitness Center</Col></Row>
                <Row><Col>Air Conditioning</Col></Row>
            </div>
        );
    }
}

export default ListingDetailAmenities;
