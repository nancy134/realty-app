import React, { Component } from 'react';
import {
    Row, Col
} from 'react-bootstrap';
import './ListingPage.css';
import ListingMap from '../components/ListingMap';
import Listings from '../components/Listings';
import ListingToolbar from '../components/ListingToolbar';
import ListingPagination from '../components/ListingPagination';
import ListingDetail from '../components/ListingDetail';

export class ListingPage extends Component {
    constructor(props){
        super(props);
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
        this.state = {
            showDetail: false 
        };
    }
    handleShowDetailChange(showDetail){
        console.log("handleShowDetailChange");
        this.setState({
            showDetail: showDetail
        });
    } 
    render() {
        const showDetail = this.state.showDetail;
        return (
            <div >       
                <Row className="bg-secondary">
                    <ListingToolbar />
                </Row>
                <Row>
                    <Col>
                        <ListingDetail showDetail={showDetail} onShowDetailChange={this.handleShowDetailChange}/>
                        <ListingMap showDetail={showDetail} />
                    </Col>
	            <Col className="rightcol" >
                        <ListingPagination />
                        <Listings onShowDetailChange={this.handleShowDetailChange}/>
                    </Col>
                </Row>
                <Row className="bg-secondary">footer</Row>
            </div>
        );
    }
}

export default ListingPage;
