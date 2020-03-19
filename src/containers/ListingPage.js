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
import listings from '../services/listings';
import {getUserEmail} from '../helpers/authentication';

export class ListingPage extends Component {
    constructor(props){
        super(props);
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
        this.handleAddListing = this.handleAddListing.bind(this);
        this.handleListingToggle = this.handleListingToggle.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleListUpdate = this.handleListUpdate.bind(this);
        this.handleNewPage = this.handleNewPage.bind(this);
        this.state = {
            showDetail: false,
            editMode: "view",
            listingMode: "allListings",
            owner: false,
            page: 1
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
            showDetail: true,
            owner: true
        });
    }
    handleListingToggle(value){
        this.setState({
            listingMode: value
        });
        this.fetchListings(value, 1);
    }
    handleOwnerChange(value){
        this.setState({
            owner: value
        });
    }
    handleNewPage(goToPage){
        this.fetchListings(this.state.listingMode, goToPage);
    }
    handleListUpdate(){
        this.fetchListings(this.state.listingMode, this.state.page);
    }
    fetchListings(listingMode, page){
        var lMode = "allListings";
        if (listingMode){
            lMode = listingMode;
        } else {
            lMode = this.state.listingMode;
        }
        var query = "";
        if (lMode === "myListings" ){
           query = "perPage=4&page="+page+"&owner="+getUserEmail();
        } else {
           query = 'perPage=4&page='+page;
        }
        listings.getAll(query, (listings) => {
           this.setState({
               listings: listings.listings.rows,
               page: listings.page,
               perPage: listings.perPage,
               count: listings.listings.count
           });
        }); 

    }

    componentDidMount(){
        this.fetchListings(this.state.listingMode, this.state.page);
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
        var owner = this.state.owner;
        return (
            <React.Fragment>
                <Row className="bg-success">
                    <ListingToolbar loggedIn={loggedIn} onAddListing={this.handleAddListing} onListingToggle={this.handleListingToggle}/>
                </Row>
                <Row>
                    <Col xs={7} className={showDetail? "rightcol" : "leftcol"}>
                        {showDetail ? (
                            <ListingDetail editMode={editMode} index={index} showDetail={showDetail} owner={owner} onShowDetailChange={this.handleShowDetailChange} onEditToggle={this.handleEditToggle} onOwnerChange={this.handleOwnerChange} onListUpdate={this.handleListUpdate}/>
                        ) : (
                            <ListingMap showDetail={showDetail} />
                        )}
                    </Col>
                    <Col xs={5} className="rightcol" >
                        <ListingPagination page={this.state.page} count={this.state.count} perPage={this.state.perPage} onNewPage={this.handleNewPage}/>
                        <Listings listingMode={listingMode} onShowDetailChange={this.handleShowDetailChange} listings={this.state.listings}/>
                    </Col>
                </Row>
                <Row className="bg-secondary">footer</Row>
            </React.Fragment> 
        );
    }
}

export default ListingPage;
