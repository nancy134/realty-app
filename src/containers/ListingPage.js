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
import { isOwner } from '../helpers/authentication';

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
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.fetchListing = this.fetchListing.bind(this);
        this.handleFetchListing = this.handleFetchListing.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleUnpublish = this.handleUnpublish.bind(this);
        this.state = {
            showDetail: false,
            editMode: "view",
            listingMode: "allListings",
            owner: false,
            page: 1,
            listingDetail: null
        };
    }
    handleShowDetailChange(showDetail, index){
        var editMode = "view";
        if (index !== this.state.index){
            editMode = "view";
        } else {
            editMode = this.state.editMode;
        }
        if (showDetail){
            this.fetchListing(index,showDetail,editMode);
        } else {
            this.setState({
                showDetail: showDetail,
                editMode: editMode,
                index: index
            });
        }
    }
    handleEditToggle(value){
        this.setState({
            editMode: value
        });
    }
    handleAddListing(){
        var index = 0;
        var showDetail = true;
        var editMode = "edit";
        this.fetchListing(index, showDetail, editMode);
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
        console.log("handleListUpdate");
        this.fetchListings(this.state.listingMode, this.state.page);
    }
    handleUpdate(listing){
        console.log("handleUpdate: listing: "+JSON.stringify(listing));
        listings.update(listing, (data) => {
            this.setState({
                listingDetail: data,
                index: data.listing.id
            });
            this.handleListUpdate();
        });
    }
    handleCreate(listing){
        console.log("handleCreate: listing: "+JSON.stringify(listing));
        listing.owner = getUserEmail();
        listings.create(listing, (data) => {
            this.setState({
                listingDetail: data,
                index: data.listing.id
            });
            this.handleListUpdate();
        });
    }
    handlePublish(data){
        this.setState({
            listingDetail: data,
        });
        this.handleListUpdate();
    }
    handleUnpublish(data){
        this.setState({
            listingDetail: data
        });
        this.handleListUpdate();
    }
    handleFetchListing(index){
        var fetchIndex = this.state.index;
        if (index) fetchIndex = index;
        console.log("handleFetchListing: fetchIndex: "+fetchIndex);
        this.fetchListing(
            fetchIndex, 
            this.state.showDetail, 
            this.state.editMode
        );
    }
    fetchListing(index, showDetail, editMode){
        if (index){
            listings.get(index, (data) => {
                var owner = false;
                if (isOwner(data.listing.owner)){
                    owner = true;
                }
                this.setState({
                    listingDetail: data,
                    showDetail: showDetail,
                    editMode: editMode,
                    index: index,
                    owner: owner
                });
            });
        } else {
            listings.getEnums((data) => {
                var listingDetail = {
                    listing: null,
                    states: data.states,
                    listingTypes: data.listingTypes,
                    propertyTypes: data.propertyTypes
                }
                this.setState({
                    listingDetail: listingDetail,
                    showDetail: showDetail,
                    editMode: editMode,
                    index: index,
                    owner: true
                });
            });
        }
    }
    fetchListings(listingMode, page){
        console.log("fetchListing: listingMode: "+listingMode);
        console.log("page: "+page);
        var lMode = "allListings";
        if (listingMode){
            lMode = listingMode;
        } else {
            lMode = this.state.listingMode;
        }
        var query = "";
        if (lMode === "myListings" ){
           query = "perPage=20&page="+page+"&owner="+getUserEmail();
        } else {
           query = 'perPage=20&page='+page;
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
        var listingDetail = this.state.listingDetail;
        return (
            <React.Fragment>
                <Row className="bg-success">
                    <ListingToolbar 
                        loggedIn={loggedIn} 
                        onAddListing={this.handleAddListing} 
                        onListingToggle={this.handleListingToggle}
                    />
                </Row>
                <Row>
                    <Col xs={7} className={showDetail? "rightcol" : "leftcol"}>
                        {showDetail ? (
                            <ListingDetail 
                                editMode={editMode} 
                                index={index} 
                                listingDetail={listingDetail} 
                                showDetail={showDetail} 
                                owner={owner} 
                                listingMode={listingMode}
                                onShowDetailChange={this.handleShowDetailChange} 
                                onEditToggle={this.handleEditToggle} 
                                onOwnerChange={this.handleOwnerChange} 
                                onListUpdate={this.handleListUpdate} 
                                onUpdate={this.handleUpdate}
                                onCreate={this.handleCreate}
                                onFetchListing={this.handleFetchListing}
                                onPublish={this.handlePublish}
                                onUnpublish={this.handleUnpublish}
                            />
                        ) : (
                            <ListingMap showDetail={showDetail} />
                        )}
                    </Col>
                    <Col xs={5} className="rightcol" >
                        <ListingPagination 
                            page={this.state.page} 
                            count={this.state.count} 
                            perPage={this.state.perPage} 
                            onNewPage={this.handleNewPage}
                        />
                        <Listings 
                            listingMode={listingMode} 
                            onShowDetailChange={this.handleShowDetailChange} 
                            listings={this.state.listings}
                        />
                    </Col>
                </Row>
                <Row className="bg-secondary">footer</Row>
            </React.Fragment> 
        );
    }
}

export default ListingPage;
