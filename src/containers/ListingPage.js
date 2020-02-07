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
        this.handleAddListing = this.handleAddListing.bind(this);
        this.state = {
            showDetail: false,
            editMode: "view",
            listingMode: "all",
        };
    }
    handleShowDetailChange(showDetail, index){
        this.setState({
            showDetail: showDetail,
            editMode: "view",
            index: index,
            listingMode: "all"
        });

    }
    handleAddListing(){
        this.setState({
            index: null,
            editMode: "edit",
            listingMode: "all",
            showDetail: true
        });
    }
    componentDidMount(){

    }
    componentWillUnmount(){
    }
    shouldComponentUpdate(){
        return true;
    }
    render() {
        var showDetail = this.state.showDetail;
        var index = this.state.index;
        var editMode = this.state.editMode;
        var listingMode = this.state.listingMode;
        return (
            <React.Fragment>
                <Row className="bg-success">
                    <ListingToolbar onAddListing={this.handleAddListing}/>
                </Row>
                <Row>
                    <Col className={showDetail? "rightcol" : "leftcol"}>
                        {showDetail ? (
                            <ListingDetail editMode={editMode} index={index} showDetail={showDetail} onShowDetailChange={this.handleShowDetailChange}/>
                        ) : (
                            <ListingMap showDetail={showDetail} />
                        )}
                    </Col>
                    <Col className="rightcol" >
                        <ListingPagination />
                        <Listings listingMode={listingMode} onShowDetailChange={this.handleShowDetailChange} />
                    </Col>
                </Row>
                <Row className="bg-secondary">footer</Row>
            </React.Fragment> 
        );
    }
}

export default ListingPage;
