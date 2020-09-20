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
import geolocationService from '../helpers/geolocation';

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
        this.handleFetchListing = this.handleFetchListing.bind(this);
        this.handleGoToListingByIndex = this.handleGoToListingByIndex.bind(this);
        this.handleGoToMyListing = this.handleGoToMyListing.bind(this);

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

            // Map
            bounds: {lat0:lat0, lng0:lng0, lat1:lat1, lng1:lng1},
            updateBounds: true,
            center: null,
            zoomLevel: null,
            readyForMap: false
        };
    }
    handleGoToListingByIndex(index, publishStatus){
        var editMode = "view";
        var listingMode = "allListings";

        if (publishStatus === "Draft"){
            editMode = "edit";
            listingMode = "myListings";
        } else {
            editMode = "view";
            listingMode = "allListings";
        }
        var localState = {
            addListingAddress: false,
            listingMode: listingMode,
            index: index,
            showDetail: true,
            editMode: editMode,
            page: 1
        };
        var that = this;
        this.fetchListingPromise(localState).then(function(localState){
            that.fetchListingsPromise(localState).then(function(localState){
                that.setState(localState);
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });

    }

    handleGoToMyListing(id){
        var editMode = "edit";
        var listingMode = "myListings";
        var index = id;

        var localState = {
            editMode: editMode,
            listingMode: listingMode,
            index: index,
            page: 1
        };
        var that = this;
        this.fetchListingPromise(localState).then(function(localState){
            that.fetchListingsPromise(localState).then(function(localState){
                that.setState(localState);
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });

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
        var that = this;
        this.fetchListingPromise(localState).then(function(localState){
            that.setState(localState);
        }).catch(function(err){
            console.log(err);
        });

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
            updateBounds:true 
        };
        if (showDetail){
            var that = this;
            that.fetchListingPromise(localState).then(function(localState){
                that.setState(localState);
            }).catch(function(err){
                console.log(err);
            });
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
            var bounds = {lat0:null,lng0:null,lat1:null,lng1:null}; 
            var localState = {
                addListingOverview: false,
                listingMode: "myListings",
                index: data.listing.id,
                showDetail: true,
                editMode: "edit",
                bounds: bounds,
                center: null,
                zoomLevel: null,
                page: 1
            };

            that.fetchListingPromise(localState).then(function(localState){
                that.fetchListingsPromise(localState).then(function(localState){
                    if (localState.bounds.lat0 === null){
                        localState.bounds = geolocationService.calculateBounds(localState.markers);
                    }
                    that.setState(localState);
                }).catch(function(err){
                    console.log(err);
                });
            }).catch(function(err){
                console.log(err);
            });

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
        var localState = {
            listingMode: value,
            page: 1,
            showDetail: false,
            bounds: {lat0:null,lng0:null,lat1:null,lng1:null},
            center: null,
            zoomLevel: null,
            updateBounds: true
        };
        var that = this;
        this.fetchListingsPromise(localState).then(function(localState){
            localState.bounds = geolocationService.calculateBounds(localState.markers);
            that.setState(localState);
        }).catch(function(err){
            console.log(err);
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

        var localState = {
           spaceUseFilter: spaceUseFilter,
           page: 1
        };
        var that = this;
        this.fetchListingsPromise(localState).then(function(localState){
            that.setState(localState);
        }).catch(function(err){
            console.log(err);
        });
    }
    handleMoreFilterChange(moreFilters){
        var moreQuery = "";

        if (moreFilters.minSize) moreQuery += "&minSize="+moreFilters.minSize; 
        if (moreFilters.maxSize) moreQuery += "&maxSize="+moreFilters.maxSize;
        if (moreFilters.minRate) moreQuery += "&minRate="+moreFilters.minRate;
        if (moreFilters.maxRate) moreQuery += "&maxRate="+moreFilters.maxRate;
        if (moreFilters.listingType)  moreQuery += "&ListingType="+moreFilters.listingType;

        var localState = {
            moreQuery: moreQuery,
            page: 1
        };
        var that = this;
        this.fetchListingsPromise(localState).then(function(localState){
            that.setState(localState);
        }).catch(function(err){
            console.log(err);
        });
    }

    handleNewPage(goToPage){
        var localState = {
            listingMode: this.state.listingMode,
            page: goToPage
         };
         var that = this;
         that.fetchListingsPromise(localState).then(function(localState){
             that.setState(localState);
         }).catch(function(err){
             console.log(err);
         });

    }
    handleListUpdate(){
        var localState = {
            listingMode: this.state.listingMode,
            page: this.state.page
        };
         var that = this;
         that.fetchListingsPromise(localState).then(function(localState){
             that.setState(localState);
         }).catch(function(err){
             console.log(err);
         });
    }
    handleUpdate(listing){
        var updatePromise = listingService.update(listing);
        var that = this;
        updatePromise.then(function(data){
            var localState = {
                listingDetail: data,
                index: data.listing.id
            };
            that.fetchListingPromise(localState).then(function(localState){
                that.fetchListingsPromise(localState).then(function(localState){
                    that.setState(localState);
                }).catch(function(err){
                    console.log(err);
                });
            }).catch(function(err){
                console.log(err);
            });
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
            page: 1 
        };
        var that=this;

        this.fetchListingPromise(localState).then(function(localState){
            that.fetchListingsPromise(localState).then(function(localState){
                that.setState(localState);
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });

    }
    fetchListingPromise(localState){
        return new Promise(function(resolve, reject){
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
                resolve(localState);
            }).catch(function(err){
                reject(err);
            });
        });
    }
    fetchListingsPromise(localState){
        var that = this;
        return new Promise(function(resolve, reject){
            var lMode = "allListings";
            if (localState.listingMode){
                lMode = localState.listingMode;
            } else {
                lMode = that.state.listingMode;
            }
            var query = "";
            var markerQuery = "";
            if (lMode === "myListings" ){
                query = "perPage=20&page="+localState.page+"&owner="+getUserEmail();
                markerQuery = "perPage=250&page=1&owner="+getUserEmail();
            } else {
                query = 'perPage=20&page='+localState.page;
                markerQuery = "perPage=250&page=1";
            }

            var spaceUseFilter = localState.spaceUseFilter ? localState.spaceUseFilter : that.state.spaceUseFilter;
            if (spaceUseFilter){
                query += spaceUseFilter;
                markerQuery += spaceUseFilter;
            }

            var moreQuery = localState.moreQuery ? localState.moreQuery : that.state.moreQuery;
            if (moreQuery){
                query += moreQuery;
                markerQuery += moreQuery;
            }

            // Location query 
            var locationQuery = "";
            var lat0 = localState.bounds ? localState.bounds.lat0 : null;
            var lng0 = localState.bounds ? localState.bounds.lng0 : null;
            var lat1 = localState.bounds ? localState.bounds.lat1 : null;
            var lng1 = localState.bounds ? localState.bounds.lng1 : null;
            if (lat0){
                locationQuery += "&lat0="+lat0;
                locationQuery += "&lng0="+lng0;
                locationQuery += "&lat1="+lat1;
                locationQuery += "&lng1="+lng1;
                query += locationQuery;
                markerQuery += locationQuery;
            }
            console.log("query: "+query);
            var getAllPromise = listingService.getAll(query);
            getAllPromise.then(function(listings){
                var enumPromise = listingService.getEnumsPromise();
                enumPromise.then(function(enums){
                    var getMarkersPromise = listingService.getMarkers(markerQuery);
                    getMarkersPromise.then(function(markers){
                        localState.allAmenities = enums.amenities;
                        localState.listings = listings.listings.rows;
                        localState.page = listings.page;
                        localState.perPage = listings.perPage;
                        localState.count = listings.listings.count;
                        localState.markers = markers.markers.rows;
                        resolve(localState);
                    }).catch(function(err){
                        reject(err);
                    });
                }).catch(function(err){
                    reject(err);
                });
            }).catch(function(err){
                reject(err);
            }); 
        });
    }

    componentDidMount(){
        if (this.state.fullscreen){
            this.handleFetchListing();
        }
        var localState = {
            listingMode: this.state.listingMode,
            page: this.state.page,
            bounds: {
                lat0: this.state.bounds.lat0,
                lng0: this.state.bounds.lng0,
                lat1: this.state.bounds.lat1,
                lng1: this.state.bounds.lng1
            }
        };
        var that = this;
        this.fetchListingsPromise(localState).then(function(localState){
            if (localState.bounds.lat0 === null){
                localState.bounds = geolocationService.calculateBounds(localState.markers);
            }
            localState.readyForMap = true;
            that.setState(localState);
        });
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
            var localState = {
                listingMode: "myListings",
                page: that.state.page
            };
            that.fetchListingsPromise(localState).then(function(localState){
                that.setState(localState);
                that.handleDeleteHide();
            }).catch(function(err){
                console.log(err);
            });

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
        var that = this;
        var deleteListingPromise = listingService.deleteListing(this.state.deleteListingId);
        deleteListingPromise.then(function(result){

            // If deleting the last item on the last page
            var page = that.state.page;
            if (that.state.listings.length === 1 && that.state.page > 1){
                page = that.state.page-1;
            }
            var localState = {
                listingMode: that.state.listingMode,
                page: page
            };

            that.fetchListingsPromise(localState).then(function(localState){
                that.setState(localState);
                that.handleDeleteListingHide();
            }).catch(function(err){
                console.log(err);
            });

        }).catch(function(err){
            console.log(err);
        });
    }
    handleDeleteListingHide(){
        this.setState({
            showDeleteListingModal: false
        });
    }

    handleBoundsChange(bounds, center, zoomLevel){
        var localState = {
            bounds: bounds,
            listingMode: this.state.listingMode,
            page: this.state.page,
            updateBounds: false,
            center: center,
            zoomLevel: zoomLevel
        };
        var that = this;
        this.fetchListingsPromise(localState).then(function(localState){
            that.setState(localState);
        }).catch(function(err){
            console.log(err);
        });
    }

    render() {
        console.log("this.state.markers");
        console.log(this.state.markers);
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

                         onGoToListingByIndex={this.handleGoToListingByIndex}
		 onGoToMyListing={this.handleGoToMyListing}
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

                                onGoToListingByIndex={this.handleGoToListingByIndex}
                                 onGoToMyListing={this.handleGoToMyListing}

                            />
                        </CSSTransition>
                        { this.state.readyForMap ?
                        <ListingMap 
                            showDetail={showDetail}
                            markers={this.state.markers}
                            bounds={this.state.bounds}
                            onBoundsChange={this.handleBoundsChange}
                            updateBounds={this.state.updateBounds}
                            center={this.state.center}
                            zoomLevel={this.state.zoomLevel}
                        />
                        : null }
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
                <Row className="bg-light">
                    <Col md={12} className="text-right">
                        <div className="text-right" >About</div>
                    </Col>
                </Row>
                </div>
                ) }
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(ListingPage);
