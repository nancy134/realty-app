import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Modal,
    Button
} from 'react-bootstrap';
import './ListingPage.css';
import ListingMap from '../components/ListingMap';
import Listings from '../components/Listings';
import ListingToolbar from '../components/ListingToolbar';
import ListingPagination from '../components/ListingPagination';
import ListingDetail from '../components/ListingDetail';
import ListingAddType from '../components/ListingAddType';
import ListingAddAddress from '../components/ListingAddAddress';
import ListingAddOverview from '../components/ListingAddOverview';
import listingService from '../services/listings';
import spaceService from '../services/spaces';
import {getUserEmail} from '../helpers/authentication';
import { isOwner } from '../helpers/authentication';
import { CSSTransition } from 'react-transition-group';
import DeleteModal from '../components/DeleteModal';
import DeleteListingModal from '../components/DeleteListingModal';
import { GoogleApiWrapper } from 'google-maps-react';

export class ListingPage extends Component {
    constructor(props){
        super(props);
        var fullscreen = false;
        var index = null;
        if (props.match.params.id){
           fullscreen = true;
           index = props.match.params.id;
        }

        const params = new URLSearchParams(props.location.search);
        var listingModeParam = params.get('listingMode');
        var listingMode = "allListings";
        if (listingModeParam){
           listingMode = listingModeParam;
        }

        var formatted_address = params.get('formatted_address');
        var lat0 = params.get('lat0');
        var lng0 = params.get('lng0');
        var lat1 = params.get('lat1');
        var lng1 = params.get('lng1');
        // Add Listing
        this.handleAddListing = this.handleAddListing.bind(this);
        this.handleListingTypeNext = this.handleListingTypeNext.bind(this);
        this.handleListingAddressNext = this.handleListingAddressNext.bind(this);
        this.handleGoToListing = this.handleGoToListing.bind(this);
        this.handleListingOverviewNext = this.handleListingOverviewNext.bind(this);
        this.handleCancelAddType = this.handleCancelAddType.bind(this);
        this.handleCancelAddAddress = this.handleCancelAddAddress.bind(this);
        this.handleCancelAddOverview = this.handleCancelAddOverview.bind(this);

        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
        this.handleListingToggle = this.handleListingToggle.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleListUpdate = this.handleListUpdate.bind(this);
        this.handleNewPage = this.handleNewPage.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleMoreFilterChange = this.handleMoreFilterChange.bind(this);

        // Listing
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.fetchListing = this.fetchListing.bind(this);
        this.handleFetchListing = this.handleFetchListing.bind(this);

        // Transition
        this.handleTransitionStart = this.handleTransitionStart.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleUnpublish = this.handleUnpublish.bind(this);
        this.handleTransitionHide = this.handleTransitionHide.bind(this);
        this.handleClose = this.handleClose.bind(this);

        // Space
        this.handleAccordionChange = this.handleAccordionChange.bind(this);
        this.handleDeleteSpace = this.handleDeleteSpace.bind(this);

        // Delete
        this.handleDeleteHide = this.handleDeleteHide.bind(this);
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);

        // DeleteListing
        this.handleDeleteListing = this.handleDeleteListing.bind(this);
        this.handleDeleteListingConfirm = this.handleDeleteListingConfirm.bind(this);
        this.handleDeleteListingHide = this.handleDeleteListingHide.bind(this);

        // Map
        this.handleBoundsChange = this.handleBoundsChange.bind(this);
        this.state = {

            // Add listing
            addListingType: false,
            addListingAddress: false,
            addListingOverview: false,
            newListing: {},

            // Transition
            transitionStart: false,
            transitionSaving: false,
            showModal: false,
            transitionModalTitle: "",
            transitionModalMessage: "",

            // Listing
            index: index,
            owner: false,
            listingDetail: null,
            allAmenities: [],

            // Spaces
            spaceAccordionText: [],

            // Controls
            fullscreen: fullscreen,
            showDetail: false,
            editMode: "view",
            listingMode: listingMode,
            page: 1,
            spaceUseFilter: null,
            enableTransitionTest: false,

            showSpinner: false,

            // Delete
            deleteTable: null,
            deleteId: null,
            showDeleteModal: false,
            deleteTitle: null,
            deleteMessage: null,

            // Delete Listing
            deleteListingId: null,
            showDeleteListingModal: false,
            deleteListingSaving: false,

            // Search
            formatted_address: formatted_address,
            lat0: lat0,
            lng0: lng0,
            lat1: lat1,
            lng1: lng1
        };
    }
    handleGoToListing(result){
        var listing = null;
        var editMode = "view";
        var listingMode = "allListings";

        if (result.length > 1){
            for (var i=0; i<result.length; i++){
                if (result[i].publishStatus === "Draft"){
                    listing = result[i];
                }
            }
        } else {
            listing = result[0];
        }

        if (listing.publishStatus === "Draft"){
            editMode = "edit";
            listingMode = "myListings";
        } else {
            editMode = "view";
            listingMode = "allListings";
        }
        var localState = {
            addListingAddress: false,
            listingMode: listingMode,
            index: listing.id,
            showDetail: true,
            editMode: editMode,
        };
        this.fetchListing(localState);

    }
    handleShowDetailChange(showDetail, index, arrayIndex){
        var editMode = "view";
        if (index !== this.state.index){
            editMode = "view";
        } else {
            editMode = this.state.editMode;
        }
        if (showDetail && this.state.listings[arrayIndex].publishStatus === "Draft"){
            editMode = "edit";
        }        

        var localState = {
            addListingAddress: false,
            index: index,
            showDetail: showDetail,
            editMode: editMode,
        };
        if (showDetail){
            this.fetchListing(localState);
        } else {
            this.setState(localState);
        }
    }
    handleEditToggle(value){
        this.setState({
            editMode: value
        });
    }

    // Add Listing

    handleAddListing(){
        this.setState({
            addListingType: true
        });
    }
    handleListingTypeNext(listing){
        this.setState({
            addListingType: false,
            addListingAddress: true,
            newListing: listing
        });
    }

    handleListingAddressNext(listing){
        this.setState({
            addListingAddress: false,
            addListingOverview: true,
            newListing: listing
        });
    }
    handleListingOverviewNext(listing){
        listing.owner = getUserEmail();
        var createPromise = listingService.create(listing);
        var that = this;
        createPromise.then(function(data) {
            var localState = {
                addListingOverview: false,
                listingMode: "myListings",
                index: data.listing.id,
                showDetail: true,
                editMode: "edit",
            };
            that.fetchListing(localState);
            that.fetchListings("myListings",1);
        }).catch(function(err){
            console.log(err);
        });
    }
    handleCancelAddType(){
        this.setState({
            addListingType: false
        });
    }
    handleCancelAddAddress(){
        this.setState({
            addListingAddress: false
        });
    }
    handleCancelAddOverview(){
        this.setState({
            addListingOverview: false
        });
    }
    handleListingToggle(value){
        this.setState({
            showDetail: false,
            listingMode: value
        }, () => { 
            this.fetchListings(value, 1);
        });
    }
    handleOwnerChange(value){
        this.setState({
            owner: value
        });
    }
    handleFilterChange(filters){
        var spaceUseFilter = "";
        filters.forEach(filter => {
            spaceUseFilter += "&spaceUse[]="+filter;
        });

        this.setState({
            spaceUseFilter: spaceUseFilter 
        }, () => {
            this.handleListUpdate();
        });
    }
    handleMoreFilterChange(moreFilters){
        var moreQuery = "";
        if (moreFilters.minSize) moreQuery += "&minSize="+moreFilters.minSize; 
        if (moreFilters.maxSize) moreQuery += "&maxSize="+moreFilters.maxSize;
        if (moreFilters.minRate) moreQuery += "&minRate="+moreFilters.minRate;
        if (moreFilters.maxRate) moreQuery += "&maxRate="+moreFilters.maxRate;
        if (moreFilters.listingType)  moreQuery += "&ListingType="+moreFilters.listingType;
        this.setState({moreQuery: moreQuery}, () => {
            this.handleListUpdate();
        })
            
    }

    handleNewPage(goToPage){
        this.fetchListings(this.state.listingMode, goToPage);
    }
    handleListUpdate(){
        this.fetchListings(this.state.listingMode, this.state.page);
    }
    handleUpdate(listing){
        var updatePromise = listingService.update(listing);
        var that = this;
        updatePromise.then(function(data){
            that.setState({
                listingDetail: data,
                index: data.listing.id
            });
            that.handleFetchListing(data.listing.id);
            that.handleListUpdate();
        }).catch(function(err){
            var errMessage = "An error occurred while trying to save your listing";
            that.setState({
               showModal: true,
               transitionModalTitle: "Oops!",
               transitionModalMessage: errMessage 
            });
            console.log(err);
        });
    }
    handleCreate(listing){
        listing.owner = getUserEmail();
        var createPromise = listingService.create(listing);
        createPromise(function(data){
            this.setState({
                listingDetail: data,
                index: data.listing.id
            });
            this.handleListUpdate();
        });

    }

    // Transition
    handleTransitionStart(){
        this.setState({
            transitionStart: true
        });
    }
    handleTransitionHide(data, title, message){
        this.setState({
            transitionStart: false,
            transitionSaving: false,
            listingDetail: data,
            showDetail: false,
            showModal: true,
            transitionModalTitle: title,
            transitionModalMessage: message
        }, () => {
            this.handleListUpdate();
        });
    }
    handlePublish(id){
        var publishPromise = listingService.publish(id);
        this.setState({transitionSaving: true});
        var that = this;
        publishPromise.then(function(data){
            var title = "Congratulations!";
            var message = "You Listing has been published!";
            that.handleTransitionHide(data, title, message);
        }).catch(function(err){
            var title = "Oops!"
            var message = "We're sorry! Something went wrong";
            that.handleTransitionHide(null, title, message);
        });

    }
    handleUnpublish(id){
        var unpublishPromise = listingService.unpublish(id);
        this.setState({transitionSaving: true});
        var that = this;
        unpublishPromise.then(function(data){
            var title = "Off Market";
            var message = "Your listing is now off the market";
            that.handleTransitionHide(data, title, message);
        }).catch(function(err){
            var title = "Oops!"
            var message = "We're sorry! Something went wrong";
            that.handleTransitionHide(null, title, message);
        });
    }


    handleFetchListing(index){
        var fetchIndex = this.state.index;
        if (index) fetchIndex = index;
        var localState = {
            addListingAddress: false,
            index: fetchIndex,
        };
        this.fetchListing(localState);
    }
    fetchListing(localState){
        if (localState.index){
            var that = this;
            var getPromise = listingService.get(localState.index);
            getPromise.then(function(data){
                var owner = false;
                if (isOwner(data.listing.owner)){
                    owner = true;
                }
                // Create accordion text
                var accordionText = [];
                if (data.listing.spaces.length > 0){
                    for (var i=0; i<data.listing.spaces.length; i++){
                        var more = "More";
                        accordionText.push(more);
                    }
                }
                localState.listingDetail = data;
                localState.owner = owner;
                localState.spaceAccordionText = accordionText;
                that.setState(localState, () => {
                    that.handleListUpdate();
                });
            }).catch(function(err){
                console.log(err);
            });
        } else {
            listingService.getEnums((data) => {
                var listingDetail = {
                    listing: null,
                    states: data.states,
                    listingTypes: data.listingTypes,
                    propertyTypes: data.propertyTypes,
                    spaceUses: data.spaceUses,
                    spaceTypes: data.spaceTypes,
                    spaceDivisibles: data.spaceDivisibles,
                    portfolioTypes: data.portfolioTypes
                }
                this.setState({
                    listingDetail: listingDetail,
                    showDetail: localState.showDetail,
                    editMode: localState.editMode,
                    index: localState.index,
                    owner: true,
                });
            });
        }
    }
    fetchListings(listingMode, page){
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
        if (this.state.spaceUseFilter){
            query += this.state.spaceUseFilter;
        }
        if (this.state.moreQuery){
            query += this.state.moreQuery;
        }

        // Location query 
        var locationQuery = "";
        if (this.state.lat0){
            locationQuery += "&lat0="+this.state.lat0;
            locationQuery += "&lng0="+this.state.lng0;
            locationQuery += "&lat1="+this.state.lat1;
            locationQuery += "&lng1="+this.state.lng1;
            query += locationQuery;
        }
        var that = this;
        var getAllPromise = listingService.getAll(query);
        getAllPromise.then(function(listings){
           console.log("listings:");
           console.log(listings);
           var enumPromise = listingService.getEnumsPromise();
           enumPromise.then(function(enums){
          
               that.setState({
                   allAmenities: enums.amenities,
                   listingMode: listingMode,
                   listings: listings.listings.rows,
                   page: listings.page,
                   perPage: listings.perPage,
                   count: listings.listings.count
               });
           }).catch(function(err){
               console.log(err);
           });
        }).catch(function(err){
            console.log(err);
        }); 

    }

    componentDidMount(){
        if (this.state.fullscreen){
            this.handleFetchListing();
        }
        this.fetchListings(this.state.listingMode, this.state.page);
    }
    componentWillUnmount(){
    }
    shouldComponentUpdate(){
        return true;
    }
    handleClose() {
        this.setState({
            showModal: false
        });
    }
    // Space
    handleAccordionChange(e){
        var index = parseInt(e.target.value);
        var spaceAccordionText = this.state.spaceAccordionText;
        if (this.state.spaceAccordionText[index] === "More"){
            spaceAccordionText[index] = "Less";
        } else {
            spaceAccordionText[index] = "More";
        }
        this.setState({
            spaceAccordionText: spaceAccordionText
        });
    }
    handleDeleteSpace(id){
        this.setState({
            deleteTable: "Space",
            deleteId: id,
            showDeleteModal: true,
            deleteTitle: "Delete Space",
            deleteMessage: "Are you sure you want to delete this space?"
        });
    }
    handleDeleteConfirm(){
        var that=this;
        var deleteSpace = spaceService.deletePromise(this.state.deleteId);
        deleteSpace.then(function(result){
            that.handleFetchListing(result.latestDraftId);
            that.fetchListings("myListings",that.state.page);
            that.handleDeleteHide();
        }).catch(function(err){
            console.log(err);
        });
    }
    handleDeleteHide(){
        this.setState({
            showDeleteModal: false
        });
    }
    handleDeleteListing(listingId){
        var message = "Are you sure you want to delete listing: "+listingId+"?";
        this.setState({
            deleteListingId: listingId,
            showDeleteListingModal: true,
            deleteListingSaving: false,
            deleteListingMessage: message 
        });
    }
    handleDeleteListingConfirm(){
        console.log("handleDeleteListingConfirm");
        console.log(this.state.listings);
        var that = this;
        var deleteListingPromise = listingService.deleteListing(this.state.deleteListingId);
        deleteListingPromise.then(function(result){

            // If deleting the last item on the last page
            var page = that.state.page;
            if (that.state.listings.length === 1 && that.state.page > 1){
                page = that.state.page-1;
            }
            that.fetchListings(that.state.listingMode, page);
            that.handleFetchListing();
            that.handleDeleteListingHide();
        }).catch(function(err){
            console.log(err);
        });
    }
    handleDeleteListingHide(){
        this.setState({
            showDeleteListingModal: false
        });
    }

    handleBoundsChange(bounds){
        console.log("handleBoundsChange");
        if (bounds.lat0){
            this.setState({
                lat0: bounds.lat0,
                lng0: bounds.lng0,
                lat1: bounds.lat1,
                lng1: bounds.lng1
            }, () => {
                this.fetchListings(this.state.listingMode,this.state.page);
            });
        }

    }
    render() {
        var showDetail = this.state.showDetail;
        var index = this.state.index;
        var editMode = this.state.editMode;
        var listingMode = this.state.listingMode;
        var loggedIn = this.props.loggedIn;
        var owner = this.state.owner;
        var listingDetail = this.state.listingDetail;
        var fullscreen = this.state.fullscreen;
        return (
            <React.Fragment>
                <DeleteModal
                    id={this.state.deleteId}
                    show={this.state.showDeleteModal}
                    title={this.state.deleteTitle}
                    message={this.state.deleteMessage}
                    onHide={this.handleDeleteHide}
                    saving={this.state.deleteSaving}
                    onDelete={this.handleDeleteConfirm}
                />
                <DeleteListingModal
                    id={this.state.deleteListingId}
                    show={this.state.showDeleteListingModal}
                    message={this.state.deleteListingMessage}
                    onHide={this.handleDeleteListingHide}
                    saving={this.state.deleteListingSaving}
                    onDelete={this.handleDeleteListingConfirm}
                />
                <Modal show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>{this.state.transitionModalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.transitionModalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button
                            id="alert_modal_close"
                            variant="secondary" 
                            onClick={this.handleClose}>
                        Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                {fullscreen ?
                (<Container>
                     <ListingDetail
                         fullscreen={fullscreen}
                         editMode={editMode}
                         index={index}
                         listingDetail={listingDetail}
                         showDetail={true}
                         owner={owner}
                         listingMode={listingMode}
                         onShowDetailChange={this.handleShowDetailChange}
                         onEditToggle={this.handleEditToggle}
                         onOwnerChange={this.handleOwnerChange}
                         onListUpdate={this.handleListUpdate}
                         onUpdate={this.handleUpdate}
                         onCreate={this.handleCreate}
                         onFetchListing={this.handleFetchListing}
                         showSpinner={this.state.showSpinner}
                         // Transition
                         onTransitionStart={this.handleTransitionStart}
                         onPublish={this.handlePublish}
                         onUnpublish={this.handleUnpublish}
                         onTransitionHide={this.handleTransitionHide}
                         transitionStart={this.state.transitionStart}
                         transitionSaving={this.state.transitionSaving}
                         // Space
                         spaceAccordionText={this.state.spaceAccordionText}
                         onAccordionChange={this.handleAccordionChange}
                         onDeleteSpace={this.handleDeleteSpace}
                         // Amenities
                         allAmenities={this.state.allAmenities}
                     />
                </Container>)

                :
                ( 
                <div>
                <Row className="bg-success">
                    <ListingToolbar 
                        loggedIn={loggedIn} 
                        listingMode={listingMode}
                        onAddListing={this.handleAddListing} 
                        onListingToggle={this.handleListingToggle}
                        onFilterChange={this.handleFilterChange}
                        onMoreFilterChange={this.handleMoreFilterChange}
                        formatted_address={this.state.formatted_address}
                    />
                    <ListingAddType
                        show={this.state.addListingType}
                        onNext={this.handleListingTypeNext}
                        onCancel={this.handleCancelAddType}
                    />
                    { this.state.addListingAddress ?
                    <ListingAddAddress
                        show={this.state.addListingAddress}
                        onNext={this.handleListingAddressNext}
                        listing={this.state.newListing}
                        onCancel={this.handleCancelAddAddress}
                        onGoToListing={this.handleGoToListing}
                    />
                    : null }
                    <ListingAddOverview
                        show={this.state.addListingOverview}
                        onNext={this.handleListingOverviewNext}
                        listing={this.state.newListing}
                        onCancel={this.handleCancelAddOverview}
                    />
                </Row>
                <Row>
                    <Col xs={8} className={showDetail? "rightcol" : "leftcol"}>
                        <CSSTransition
                            in={showDetail}
                            appear={false}
                            timeout={900}
                            classNames="slide"
                        >
                            <ListingDetail 
                                fullscreen={fullscreen}
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
                                showSpinner={this.state.showSpinner}

                                // Transition
                                onTransitionStart={this.handleTransitionStart}
                                onPublish={this.handlePublish}
                                onUnpublish={this.handleUnpublish}
                                onTransitionHide={this.handleTransitionHide}
                                transitionStart={this.state.transitionStart}
                                transitionSaving={this.state.transitionSaving}
                                // Space
                                spaceAccordionText={this.state.spaceAccordionText}
                                onAccordionChange={this.handleAccordionChange}
                                onDeleteSpace={this.handleDeleteSpace}
                                // Enums
                                allAmenities={this.state.allAmenities}
                            />
                        </CSSTransition>
                    {!showDetail ?
                            <ListingMap 
                                listings={this.state.listings}
                                showDetail={showDetail} 
                                lat0={this.state.lat0}
                                lng0={this.state.lng0}
                                lat1={this.state.lat1}
                                lng1={this.state.lng1}
                                onBoundsChange={this.handleBoundsChange}
                            />
                    : null}
                    </Col>
                    <Col xs={4} className="rightcol" >
                        <ListingPagination 
                            page={this.state.page} 
                            count={this.state.count} 
                            perPage={this.state.perPage} 
                            onNewPage={this.handleNewPage}
                        />
                        <Listings 
                            listingMode={listingMode} 
                            onShowDetailChange={this.handleShowDetailChange} 
                            onDelete={this.handleDeleteListing}
                            listings={this.state.listings}
                        />
                    </Col>
                </Row>
                <Row className="bg-secondary">footer</Row>
                </div>
                ) }
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(ListingPage);
