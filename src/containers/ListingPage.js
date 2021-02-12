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
import listingService from '../services/listings';
import spaceService from '../services/spaces';
import authenticationService from '../helpers/authentication';
import { CSSTransition } from 'react-transition-group';
import DeleteModal from '../components/DeleteModal';
import DeleteListingModal from '../components/DeleteListingModal';
import { GoogleApiWrapper } from 'google-maps-react';
import geolocationService from '../helpers/geolocation';
import listService from '../services/lists';
import listItemService from '../services/listItems';
import PublishWizardIntro from '../components/PublishWizardIntro';
import PublishWizardPaymentMethod from '../components/PublishWizardPaymentMethod';
import PublishWizardFinal from '../components/PublishWizardFinal';
import UnpublishWizardIntro from '../components/UnpublishWizardIntro';
import {listingTypes} from '../constants/listingTypes';
import WizardAddListing from '../components/WizardAddListing';

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
        this.handleShowReportView = this.handleShowReportView.bind(this);

        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
        this.handleListingToggle = this.handleListingToggle.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleListUpdate = this.handleListUpdate.bind(this);
        this.handleNewPage = this.handleNewPage.bind(this);

        // Listing
        this.handleAddListingFinish = this.handleAddListingFinish.bind(this);
        this.handleAddListingCancel = this.handleAddListingCancel.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFetchListing = this.handleFetchListing.bind(this);
        this.handleGoToListingByIndex = this.handleGoToListingByIndex.bind(this);
        this.handleGoToMyListing = this.handleGoToMyListing.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        // Message
        this.handleMessageClose = this.handleMessageClose.bind(this);

        // Transition
        this.handleTransitionStart = this.handleTransitionStart.bind(this);
        this.handleMessageClose = this.handleMessageClose.bind(this);
        this.handlePublishWizardIntroNext = this.handlePublishWizardIntroNext.bind(this);
        this.handlePublishWizardPaymentMethodNext = this.handlePublishWizardPaymentMethodNext.bind(this);
        this.handlePublishWizardFinalFinish = this.handlePublishWizardFinalFinish.bind(this);
        this.handleUnpublishWizardIntroFinish = this.handleUnpublishWizardIntroFinish.bind(this);
        this.handlePublishWizardClose = this.handlePublishWizardClose.bind(this);

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
        this.handleNewPageReport = this.handleNewPageReport.bind(this);
        this.handleAddNewList = this.handleAddNewList.bind(this);

        this.state = {

            // Message Modal 
            showMessageModal: false,
            messageModalTitle: "",
            messageModalMessage: "",

            // Transition
            showPublishWizardIntro: false,
            showPublishWizardPaymentMethod: false,
            showPublishWizardFinal: false,
            showUnpublishWizardIntro: false,

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

            // Toolbar 
            formatted_address: formatted_address,
            showReportView: false,

            // Map
            bounds: {lat0:lat0, lng0:lng0, lat1:lat1, lng1:lng1},
            center: null,
            zoomLevel: null,
            myListings: {
                bounds: {lat0:null, lng0:null, lat1:null, lng1:null},
                center: null,
                zoomLevel: null,
            },
            readyForMap: false,
            updateBounds: true,
       

            // Detail Map
            detailBounds: {lat0:lat0, lng0:lng0, lat1:lat1, lng1:lng1},
            detailMarkers: null,

            // Reports
            lists: [],
            listItems: [],
            listId: 0 
        };
    }

    handleAddListingCancel(){
        this.props.onAddListingCancel();
    }

    handleLogin(){
        this.props.onLogin();
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
    handleShowDetailChange(showDetail, index, publishStatus){
        var editMode = "view";
        if (index !== this.state.index){
            editMode = "view";
        } else {
            editMode = this.state.editMode;
        }
        if (showDetail && publishStatus === "Draft"){
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

    handleAddListingFinish(listing){
        listing.owner = authenticationService.getUserEmail();
        var createPromise = listingService.create(listing);
        var that = this;
        createPromise.then(function(data) {
            var myBounds = {lat0:null,lng0:null,lat1:null,lng1:null}; 
            var localState = {
                addListingOverview: false,
                listingMode: "myListings",
                index: data.listing.id,
                showDetail: true,
                editMode: "edit",
                myListings: {
                    bounds: myBounds,
                    center: null,
                    zoomLevel: null
                },
                page: 1
            };

            that.fetchListingPromise(localState).then(function(localState){
                that.fetchListingsPromise(localState).then(function(localState){
                    if (localState.myListings.bounds.lat0 === null){
                        localState.myListings.bounds = geolocationService.calculateBounds(localState.markers);
                    }
                    that.setState(localState);
                    that.props.onAddListingCancel();
                }).catch(function(err){
                    console.log(err);
                    that.props.onAddListingCancel();
                });
            }).catch(function(err){
                console.log(err);
                that.props.onAddListingCancel();
            });

        }).catch(function(err){
            console.log(err);
            that.props.onAddListingCancel();
        });
    }

    handleListingToggle(value){
        var localState = {
            listingMode: value,
            page: 1,
            showDetail: false,
            bounds: this.state.bounds,
            center: this.state.center,
            zoomLevel: this.state.zoomLevel,
            myListings: {
                bounds: this.state.myListings.bounds,
                center: this.state.myListings.center,
                zoomLevel: this.state.myListings.zoomLevel
            },
            updateBounds: true
        };
        var that = this;
        this.fetchListingsPromise(localState).then(function(localState){
            //localState.bounds = geolocationService.calculateBounds(localState.markers);
                if (localState.listingMode === "allListings"){
                    if (localState.bounds.lat0 === null){
                        localState.bounds =
                            geolocationService.calculateBounds(localState.markers);
                    }
                }
                if (localState.listingMode === "myListings"){
                    if (localState.myListings.bounds.lat0 === null){
                        localState.myListings.bounds =
                           geolocationService.calculateBounds(localState.markers);
                    }
                }

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
        if (state.spaceTypeFilters && state.spaceTypeFilters[0] !== "Any"){
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

        // Listing Type
        if (state.listingType === listingTypes.BOTH){
            moreQuery += "&ListingType[]="+listingTypes.FORSALE;
            moreQuery += "&ListingType[]="+listingTypes.FORLEASE;
        } else {
            moreQuery += "&ListingType="+state.listingType;
        }

        var bounds = null;
        var center = null;
        var zoomLevel = null;
        var updateBounds = false;
        if (state.bounds){
            bounds = state.bounds;
            updateBounds = true;
        } else {
            bounds = this.state.bounds;
            center = this.state.center;
            zoomLevel = this.state.zoomLevel;
        }

        var localState = {
            spaceUseFilter: spaceTypeFilter,
            moreQuery: moreQuery,
            bounds: bounds,
            center: center,
            zoomLevel: zoomLevel,
            page: 1,
            updateBounds: updateBounds
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
        console.log("handleUpdate");
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
               showMessageModal: true,
               messageModalTitle: "Oops!",
               messageModalMessage: errMessage 
            });
            console.log(err);
        });
    }

    //////////////////////////////////
    //
    // Publish / UnPublish Transitions
    //
    //////////////////////////////////
    handleTransitionStart(transitionType){
        if (transitionType === "publish"){

            this.setState({
                showPublishWizardIntro: true
            });
        } else {
            this.setState({
                showUnpublishWizardIntro: true
            });
        }
    }
    handlePublishWizardIntroNext(){
        this.setState({
            showPublishWizardIntro: false,
            showPublishWizardPaymentMethod: true
        });
    }
    handlePublishWizardPaymentMethodNext(){
        this.setState({
            showPublishWizardPaymentMethod: false,
            showPublishWizardFinal: true
        });
    }
    handlePublishWizardFinalFinish(){
        var that = this;
        var localState = {
            // Go to page 1
            page: 1,
            // Close wizard
            showPublishWizardFinal: false,
            // Close detail view
            showDetail: false,
            // Keep the bounds
            //bounds: this.state.bounds,
            //center: this.state.center,
            //zoomLevel: this.state.zoomLevel,
            //updateBounds: true
        }
        this.fetchListingsPromise(localState).then(function(localState){
            that.setState(localState);
        }).catch(function(err){
            console.log(err);
        });
    }
    handleUnpublishWizardIntroFinish(){
        /*
        this.setState({
            showUnpublishWizardIntro: false,
            showDetail: false
        });
        this.handleListUpdate();
        */
        var that = this;
        var localState = {
            showUnpublishWizardIntro: false,
            showDetail: false,
            page: this.state.page
        }
        this.fetchListingsPromise(localState).then(function(localstate){
            that.setState(localState);
        }).catch(function(err){
            console.log(err);
        });
    }
    handlePublishWizardClose(){
        this.setState({
            showPublishWizardIntro: false,
            showPublishWizardPaymentMethod: false,
            showPublishWizardFinal: false,
            showUnpublishWizardIntro: false
        });
    }

    /////////////////////////////
    // Delete Draft Listing
    /////////////////////////////

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
            showDeleteDraftListingModal: false,
            bounds: {lat0:null,lng0:null,lat1:null,lng1:null},
            center: null,
            zoomLevel: null,
            updateBounds: true
        };
        deleteDraftPromise.then(function(result){
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
                if (authenticationService.isOwner(data.listing.owner)){
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

    //
    // FetchListingsPromise
    //
    fetchListingsPromise(localState){
        var that = this;
        return new Promise(function(resolve, reject){

            // Listing mode
            var lMode = "allListings";
            if (localState.listingMode){
                lMode = localState.listingMode;
            } else {
                lMode = that.state.listingMode;
            }

            // Pagination
            var query = 'perPage=20&page='+localState.page;
            var markerQuery = "perPage=250&page=1";

            // Space Use Filtesr
            var spaceUseFilter = localState.spaceUseFilter ?
                  localState.spaceUseFilter : that.state.spaceUseFilter;
            if (spaceUseFilter){
                query += spaceUseFilter;
                markerQuery += spaceUseFilter;
            }

            // More Filters
            var moreQuery = localState.moreQuery ? localState.moreQuery : that.state.moreQuery;
            if (moreQuery){
                query += moreQuery;
                markerQuery += moreQuery;
            }

            // Location query 
            var locationQuery = "";
            if (lMode === "allListings"){
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
            }

            var getAllPromise = listingService.getAll(query, lMode);
            getAllPromise.then(function(listings){
                var enumPromise = listingService.getEnumsPromise();
                enumPromise.then(function(enums){
                    listingService.getMarkers(markerQuery, lMode).then(function(markers){
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
            var bounds = this.state.bounds;
            var myBounds = this.state.myListings.bounds;
            localState = {
                listingMode: this.state.listingMode,
                page: this.state.page,
                bounds: bounds,
                myListings: { bounds: myBounds}
            };
            this.fetchListingsPromise(localState).then(function(localState){
                if (localState.listingMode === "allListings"){
                    if (localState.bounds.lat0 === null){
                        localState.bounds = 
                            geolocationService.calculateBounds(localState.markers);
                    }
                }
                if (localState.listingMode === "myListings"){
                    if (localState.myListings.bounds.lat0 === null){
                        localState.myListings.bounds = 
                           geolocationService.calculateBounds(localState.markers);
                    }
                }
                localState.readyForMap = true;
                that.setState(localState);
            }).catch(function(err){
                console.log(err);
            });
        }
    }
    componentWillUnmount(){
    }
    shouldComponentUpdate(){
        return true;
    }
    handleMessageClose() {
        this.setState({
            showMessageModal: false
        });
    }
    // Space
    handleAccordionChange(index){
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
            listingMode: this.state.listingMode,
            page: this.state.page,
            updateBounds: false,
        };

        if (this.state.listingMode === "allListings"){
            localState.bounds = bounds;
            localState.center = center;
            localState.zoomLevel = zoomLevel;
        }
        if (this.state.listingMode === "myListings"){
            localState.myListings = {};
            localState.myListings.bounds = bounds;
            localState.myListings.center = center;
            localState.myListings.zoomLevel = zoomLevel;
        }
        var that = this;
        this.fetchListingsPromise(localState).then(function(localState){
            that.setState(localState);
        }).catch(function(err){
            console.log(err);
        });
    }

    // Reports
    handleReportListChange(listTab){
        var that = this;
        listItemService.getAll(listTab).then(function(listItems){
            that.setState({
                listItems: listItems.listItems.rows,
                listId: listTab,
                reportPage: listItems.page,
                reportPerPage: listItems.perPage,
                reportCount: listItems.listItems.count
            });
        }).catch(function(err){
            console.log(err);
        });
    }
    handleAddToList(e, ListingId){
        console.log("ListingId: "+ListingId);
        var that = this;
        var body = {
            ListingId: ListingId
        }
        var listId = this.state.listId;
        listItemService.create(listId, body).then(function(listItem){
            var listId = that.state.listId;
            listItemService.getAll(listId).then(function(listItems){
                that.setState({
                    listItems: listItems.listItems.rows,
                    reportPage: listItems.page,
                    reportCount: listItems.listItems.count,
                    reportPerPage: listItems.perPage
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
                var listId = that.state.listId;
                listItemService.getAll(listId).then(function(listItems){
                    that.setState({
                        listItems: listItems.listItems.rows,
                        reportPage: listItems.page,
                        reportCount: listItems.listItems.count,
                        reportPerPage: listItems.perPage
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
    handleNewPageReport(goToPage){
         var that = this;
         var listId = this.state.listId;
         listItemService.getAll(listId).then(function(listItems){
             that.setState({
                 listItems: listItems.listItems.rows,
                 reportPage: listItems.page,
                 reportCount: listItems.listItems.count,
                 reportPerPage: listItems.perPage
             });
         }).catch(function(err){
             console.log(err);
         });
    }

    handleAddNewList(listName){
        var that = this;
        var body = {
            name: listName
        };
        listService.create(body).then(function(list){
            listService.getAll().then(function(lists){
                that.setState({
                    lists: lists.lists.rows,
                    listId: list.id,
                    listItems: [],
                    reportPage: 1,
                    reportCount: 0,
                    reportPerPage: 5 
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }
    handleShowReportView(showReportView){
        if (showReportView){
            var localState = {};
            var that = this;
            listService.getAll().then(function(lists){
                if (lists.lists.rows.length > 0){
                    console.log("lists found");
                    var listId = lists.lists.rows[0].id;
                    listItemService.getAll(listId).then(function(listItems){
                        localState.lists = lists.lists.rows;
                        localState.listItems = listItems.listItems.rows;
                        localState.listId = listId;
                        localState.reportPage = listItems.page;
                        localState.reportPerPage = listItems.perPage;
                        localState.reportCount = listItems.listItems.count;
                        localState.showReportView = showReportView;
                        that.setState(localState);
                    }).catch(function(err){
                        console.log(err);
                    });
                } else {
                    console.log("lists not found...creating one");
                    var body = {
                        name: "List 1"
                    };
                    listService.create(body).then(function(list){
                        listService.getAll().then(function(lists){
                            localState.lists = lists.lists.rows;
                            localState.listId = list.id;
                            localState.reportPage = 1;
                            localState.reportCount = 0;
                            localState.reportPerPage = 5;
                            localState.showReportView = showReportView;
                            that.setState(localState);
                        }).catch(function(err){
                            console.log(err);
                        });
                    }).catch(function(err){
                        console.log(err);
                    });
                }
            }).catch(function(err){
                console.log(err);
            });
        } else {
            this.setState({
                showReportView: showReportView 
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
        var reporting = this.state.showReportView;
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
    
        // Map
        var bounds = {};
        var center, zoomLevel;
        if (listingMode === "allListings"){
            bounds = this.state.bounds;
            center = this.state.center;
            zoomLevel = this.state.zoomLevel;
        }else if (listingMode === "myListings"){
            bounds = this.state.myListings.bounds;
            center = this.state.myListings.center;
            zoomLevel = this.state.myListings.zoomLevel;
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
            <PublishWizardIntro
                show={this.state.showPublishWizardIntro}
                onNext={this.handlePublishWizardIntroNext}
                onCancel={this.handlePublishWizardClose}
            />
            { this.state.showPublishWizardPaymentMethod ?
            <PublishWizardPaymentMethod
                show={this.state.showPublishWizardPaymentMethod}
                onNext={this.handlePublishWizardPaymentMethodNext}
                onCancel={this.handlePublishWizardClose}
                listingDetail={listingDetail}
            />
            : null}
            <PublishWizardFinal
                show={this.state.showPublishWizardFinal}
                onFinish={this.handlePublishWizardFinalFinish}
            />
            <UnpublishWizardIntro
                show={this.state.showUnpublishWizardIntro}
                onFinish={this.handleUnpublishWizardIntroFinish}
                onCancel={this.handlePublishWizardClose}
                listingDetail={listingDetail}
            />
            <Modal show={this.state.showMessageModal}>
                <Modal.Header>
                    <Modal.Title>{this.state.messageModalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.state.messageModalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button
                        id="alert_modal_close"
                        variant="secondary" 
                        onClick={this.handleMessageClose}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
            { this.props.showAddListingWizard ?
            <WizardAddListing
                loggedIn={this.props.loggedIn}
                start={this.props.showAddListingWizard}
                onFinish={this.handleAddListingFinish}
                onCancel={this.handleAddListingCancel}
                onLogin={this.handleLogin}
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
                    onShowReportView={this.handleShowReportView}
                    showReportView={this.state.showReportView}
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
                            onUpdate={this.handleUpdate}
                            onFetchListing={this.handleFetchListing}
                            showSpinner={this.state.showSpinner}

                            // Transition
                            onTransitionStart={this.handleTransitionStart}
                            onTransitionCancel={this.handleTransitionCancel}
                            // Delete
                            onDeleteDraft={this.handleDeleteDraftListing}
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
                        bounds={bounds}
                        onBoundsChange={this.handleBoundsChange}
                        updateBounds={this.state.updateBounds}
                        center={center}
                        zoomLevel={zoomLevel}
                        onShowDetailChange={this.handleShowDetailChange}
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
                        // Pagination
                        page={this.state.reportPage}
                        count={this.state.reportCount}
                        perPage={this.state.reportPerPage}
                        onNewPage={this.handleNewPageReport}
                        // Reports
                        onReportListChange={this.handleReportListChange}
                        onDeleteFromList={this.handleDeleteFromList}
                        lists={this.state.lists}
                        listItems={this.state.listItems}
                        listId={this.state.listId}
                        onAddNewList={this.handleAddNewList}
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
