import React, { Component } from 'react';
import {
    Row, Col
} from 'react-bootstrap';
import './ListingPage.css';
import ListingMap from '../components/ListingMap';
import Listings from '../components/Listings';
import ListingToolbar from '../components/ListingToolbar';
import ListingPagination from '../components/ListingPagination';

export class ListingPage extends Component {

  render() {
    return (
        <div >       
        <Row className="bg-secondary">
            <ListingToolbar />
        </Row>
        <Row>
        <Col>
            <ListingMap />
        </Col>
	<Col className="rightcol" >
           <ListingPagination />
           <Listings />
        </Col>
        </Row>
        <Row className="bg-secondary">footer</Row>
        </div>
    );
    }
}

export default ListingPage;
