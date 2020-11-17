import React, { Component } from 'react';
import {
    Row,
    Col,
    Modal,
    Button
} from 'react-bootstrap';
import './ListingPage.css';
import ListingMap from '../components/ListingMap';
import Listings from '../components/Listings';
import ReportListings from '../components/ReportListings';
import ListingToolbar from '../components/ListingToolbar';
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
import listService from '../services/lists';
import listItemService from '../services/listItems';

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

        var defaultLocation = geolocationService.getDefaultLocation();
        var formatted_address = defaultLocation.formatted_address;
        var lat0 = defaultLocation.lat0;
        var lng0 = defaultLocation.lng0;
        var lat1 = defaultLocation.lat1;
        var lng1 = defaultLocation.lng1;

        // Toolbar
        this.handleSearch = this.handleSearch.bind(this);
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
        this.handleTransitionAccept = this.handleTransitionAccept.bind(this);
        this.handleTransitionCancel = this.handleTransitionCancel.bind(this);
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

        // DeleteDraftListing
        this.handleDeleteDraftListing = this.handleDeleteDraftListing.bind(this);
        this.handleDeleteDraftListingConfirm = this.handleDeleteDraftListingConfirm.bind(this);
        this.handleDeleteDraftListingHide = this.handleDeleteDraftListingHide.bind(this);

        // Map
        this.handleBoundsChange = this.handleBoundsChange.bind(this);

        // Reports
        this.handleReportListChange = this.handleReportListChange.bind(this);
        this.handleAddToList = this.handleAddToList.bind(this);
        this.handleDeleteFromList = this.handleDeleteFromList.bind(this);

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

            // Delete Draft Listing
            deleteDraftListingId: null,
            showDeleteDraftListingModal: false,
            deleteDraftListingSaving: false,

            // Search
            formatted_address: formatted_address,

            // Map
            bounds: {lat0:lat0, lng0:lng0, lat1:lat1, lng1:lng1},
            updateBounds: true,
            center: null,
            zoomLevel: null,
            readyForMap: false,

            // Detail Map
            detailBounds: {lat0:lat0, lng0:lng0, lat1:lat1, lng1:lng1},
            detailMarkers: null,

            // Reports
            lists: [],
            listItems: [],
            listId: 0 
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

    handleSearch(state){

        var spaceTypeFilter = "";
        var moreQuery = "";
        if (state.spaceTypeFilters){
            state.spaceTypeFilters.forEach(filter => {
                spaceTypeFilter += "&spaceUse[]="+filter;
            });
        }
        var moreFilters = state.moreFilters;
        if (moreFilters){
            if (moreFilters.minSize) moreQuery += "&minSize="+moreFilters.minSize; 
            if (moreFilters.maxSize) moreQuery += "&maxSize="+moreFilters.maxSize;
            if (moreFilters.minRate) moreQuery += "&minRate="+moreFilters.minRate;
            if (moreFilters.maxRate) moreQuery += "&maxRate="+moreFilters.maxRate;
        }

        moreQuery += "&ListingType="+state.listingType;

        var bounds = null;
        if (state.bounds){
            bounds = state.bounds;
        } else {
            bounds = this.state.bounds;
        }

        var localState = {
            spaceUseFilter: spaceTypeFilter,
            moreQuery: moreQuery,
            bounds: bounds,
            page: 1
        };
        var that = this;
        this.fetchListingsPromise(localState).then(function(localState){
            that.setState(localState);
        }).catch(function(err){
            console.log(err);
        })
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
                index: data.listing.id,
                page: 1
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
            transitionModalMessage: message,
            updateBounds: true
        }, () => {
            this.handleListUpdate();
        });
    }
    handleTransitionAccept(data, title, message){
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
    handleTransitionCancel(){
        this.setState({
            transitionStart: false
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

    handleDeleteDraftListing(listingId){
        var message = "Are you sure you want to delete this draft listing?";
        this.setState({
            deleteDraftListingId: listingId,
            showDeleteDraftListingModal: true,
            deleteDraftListingSaving: false,
            deleteDraftListingMessage: message
        });
    }

    handleDeleteDraftListingConfirm(){
        var deleteDraftPromise = listingService.deleteDraftListing(this.state.deleteDraftListingId);
        var that = this;
        var localState = {
            showDetail: false,
            page: 1,
            showDeleteDraftListingModal: false
        };
        deleteDraftPromise.then(function(result){
            that.fetchListingsPromise(localState).then(function(localState){
                that.setState(localState);
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }
    handleDeleteDraftListingHide(){
        this.setState({
            showDeleteDraftListingModal: false
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

                // Detail Map
                var markers = [{
                    id: data.listing.id,
                    location: data.listing.location
                }];
                var bounds = geolocationService.calculateBounds(markers);
                localState.detailMarkers = markers;
                localState.detailBounds = bounds;

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
                query = "perPage=5&page="+localState.page+"&owner="+getUserEmail();
                markerQuery = "perPage=250&page=1&owner="+getUserEmail();
            } else {
                query = 'perPage=20&page='+localState.page;
                markerQuery = "perPage=250&page=1";
            }

            var spaceUseFilter = null;
            if (localState.spaceUseFilter){
                spaceUseFilter = localState.spaceUseFilter;
            } else if (that.state.spaceUserFilter){
                spaceUseFilter = that.state.spaceUseFilter;
            }
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
        var localState = {};
        var that = this;
        if (this.state.fullscreen){
            localState = {
                index: this.state.index,
                showDetail: true
            }
            this.fetchListingPromise(localState).then(function(localState){
                that.setState(localState);
            }).catch(function(err){
                console.log(err);
            });
    
        } else {
            localState = {
                listingMode: this.state.listingMode,
                page: this.state.page,
                bounds: {
                    lat0: this.state.bounds.lat0,
                    lng0: this.state.bounds.lng0,
                    lat1: this.state.bounds.lat1,
                    lng1: this.state.bounds.lng1
                }
            };
            this.fetchListingsPromise(localState).then(function(localState){
                if (localState.bounds.lat0 === null){
                    localState.bounds = geolocationService.calculateBounds(localState.markers);
                }
                localState.readyForMap = true;

                listService.getAll().then(function(lists){
                    if (lists.lists.rows){
                        var listId = lists.lists.rows[0].id; 
                        var query = "perPage=10&page=1&ListId="+listId;
                        listItemService.getAll(query).then(function(listItems){
                            localState.lists = lists.lists.rows;
                            localState.listItems = listItems.listItems.rows;
                            localState.listId = listId; 
                            that.setState(localState);
                        }).catch(function(err){
                            console.log(err);
                        });
                    }
                }).catch(function(err){
                });
            }).catch(function(err){
            });
        }
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

    // Reports
    handleReportListChange(listTab){
        var query = "perPage=10&page=1&ListId="+listTab;
        var that = this;
        listItemService.getAll(query).then(function(listItems){
            that.setState({
                listItems: listItems.listItems.rows,
                listId: listTab
            });
        }).catch(function(err){
            console.log(err);
        });
    }
    handleAddToList(e, ListingId){
        var that = this;
        var body = {
            ListingId: ListingId,
            ListId: this.state.listId
        }
        listItemService.create(body).then(function(listItem){
            var query = "perPage=10&page=1&ListId="+that.state.listId;
            listItemService.getAll(query).then(function(listItems){
                that.setState({
                    listItems: listItems.listItems.rows
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
        e.stopPropagation();
    }
    handleDeleteFromList(e, ListingId){
        // Get id
        var id = null;
        var that = this;
        for (var i=0; i<this.state.listItems.length; i++){
            if (ListingId === this.state.listItems[i].ListingId){
               id = this.state.listItems[i].id;
               break;
            }
        }
        if (id){
            listItemService.deleteItem(id).then(function(result){
                var query = "perPage=10&page=1&ListId="+that.state.listId;
                listItemService.getAll(query).then(function(listItems){
                    that.setState({
                        listItems: listItems.listItems.rows
                    });
                }).catch(function(err){
                    console.log(err);
                });
            }).catch(function(err){
                console.log(err);
            });
        }
        e.stopPropagation();
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
        var reporting = this.props.reporting;
        // Layouts
        var leftColumnClassName = "p-0 leftcol";
        var leftColumnSize = 8;


        // Fullscreen
        if (fullscreen){
            leftColumnClassName = "p-0 rightcol";
            leftColumnSize = 12;
        } 

        // Listing
        if (showDetail && !fullscreen){
            leftColumnClassName = "p-0 rightcol";
        }

        // Reporting
        if (reporting){
            leftColumnSize = 5;
            var rightColSize = 4;
            var reportColSize = 3;
        }
        
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
            <DeleteListingModal
                id={this.state.deleteDraftListingId}
                show={this.state.showDeleteDraftListingModal}
                message={this.state.deleteDraftListingMessage}
                onHide={this.handleDeleteDraftListingHide}
                saving={this.state.deleteDraftListingSaving}
                onDelete={this.handleDeleteDraftListingConfirm}
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
            { this.state.addListingOverview ?
                <ListingAddOverview
                    show={this.state.addListingOverview}
                    onNext={this.handleListingOverviewNext}
                    listing={this.state.newListing}
                    onCancel={this.handleCancelAddOverview}
                />
            : null }

            { !fullscreen ?
	    <Row className="bg-success">
	        <ListingToolbar
                    // No longer needed
                    loggedIn={loggedIn} 
		    listingMode={listingMode}
		    onAddListing={this.handleAddListing} 
		    onListingToggle={this.handleListingToggle}
		    onFilterChange={this.handleFilterChange}
		    onMoreFilterChange={this.handleMoreFilterChange}
                    // needed
		    formatted_address={this.state.formatted_address}
                    onSearch={this.handleSearch}
                />
	    </Row>
            : null }
	    <Row>
	        <Col xs={leftColumnSize} className={leftColumnClassName}>
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
                            onTransitionCancel={this.handleTransitionCancel}
                            onPublish={this.handlePublish}
                            onUnpublish={this.handleUnpublish}
                            onDeleteDraft={this.handleDeleteDraftListing}
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
                            // Map
                            markers={this.state.detailMarkers}
                            bounds={this.state.detailBounds}
                        />
                    </CSSTransition>
                    { (this.state.readyForMap && !fullscreen) ?
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
                { !fullscreen ?
                <Col xs={rightColSize} className="rightcol" >
                    <Listings 
                        loggedIn={loggedIn}
                        listingMode={listingMode} 
                        onShowDetailChange={this.handleShowDetailChange} 
                        onListingModeChange={this.handleListingToggle}
                        onDelete={this.handleDeleteListing}
                        listings={this.state.listings}
                        page={this.state.page}
                        count={this.state.count}
                        perPage={this.state.perPage}
                        onNewPage={this.handleNewPage}
                        onNewListing={this.handleAddListing}
                        // Reports
                        reporting={reporting}
                        reportListItems={this.state.listItems}
                        onAddToList={this.handleAddToList}
                    />
                </Col>
                : null}
                { reporting ?
                <Col xs={reportColSize} className="rightcol" >
                    <ReportListings
                        loggedIn={loggedIn}
                        onShowDetailChange={this.handleShowDetailChange}
                        onDelete={this.handleDeleteListing}
                        listings={this.state.listings}
                        page={this.state.page}
                        count={this.state.count}
                        perPage={this.state.perPage}
                        onNewPage={this.handleNewPage}
                        onNewListing={this.handleAddListing}
                        // Reports
                        onReportListChange={this.handleReportListChange}
                        onDeleteFromList={this.handleDeleteFromList}
                        lists={this.state.lists}
                        listItems={this.state.listItems}
                        listId={this.state.listId}
                    />
                </Col>
                : null}
            </Row>
            <Row className="bg-light">
                <Col md={12} className="text-right">
                    <div className="text-right" >About</div>
                </Col>
            </Row>
        </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(ListingPage);
