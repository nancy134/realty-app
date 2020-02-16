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
        this.handleListingToggle = this.handleListingToggle.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.state = {
            showDetail: false,
            editMode: "view",
            listingMode: "allListings"
        };
    }
    handleShowDetailChange(showDetail, index){
        this.setState({
            showDetail: showDetail,
            editMode: "view",
            index: index
        });

    }
    handleEditToggle(value){
        this.setState({
            editMode: value
        });
    }
    handleAddListing(){
        this.setState({
            index: null,
            editMode: "edit",
            showDetail: true
        });
    }
    handleListingToggle(value){
        this.setState({
            listingMode: value
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
        var loggedIn = this.props.loggedIn;
        console.log("render loggedIn: "+loggedIn);
        return (
            <React.Fragment>
                <Row className="bg-success">
                    <ListingToolbar loggedIn={loggedIn} onAddListing={this.handleAddListing} onListingToggle={this.handleListingToggle}/>
                </Row>
                <Row>
                    <Col xs={7} className={showDetail? "rightcol" : "leftcol"}>
                        {showDetail ? (
                            <ListingDetail editMode={editMode} index={index} showDetail={showDetail} onShowDetailChange={this.handleShowDetailChange} onEditToggle={this.handleEditToggle}/>
                        ) : (
                            <ListingMap showDetail={showDetail} />
                        )}
                    </Col>
                    <Col xs={5} className="rightcol" >
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
