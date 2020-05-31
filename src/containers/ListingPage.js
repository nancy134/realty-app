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
import listings from '../services/listings';
import spaceService from '../services/spaces';
import {getUserEmail} from '../helpers/authentication';
import { isOwner } from '../helpers/authentication';
import { CSSTransition } from 'react-transition-group';
import DeleteModal from '../components/DeleteModal';

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

        // Add Listing
        this.handleAddListing = this.handleAddListing.bind(this);
        this.handleListingTypeNext = this.handleListingTypeNext.bind(this);
        this.handleListingAddressNext = this.handleListingAddressNext.bind(this);
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
        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        this.handleImageUploadFinished = this.handleImageUploadFinished.bind(this);

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

            // Images
            files: [],
            uploading: false,
            uploadProgress: [],
            successfullUploaded: false,
            showSpinner: false,

            // Delete
            deleteTable: null,
            deleteId: null,
            showDeleteModal: false,
            deleteTitle: null,
            deleteMessage: null
        };
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
            listingMode: this.state.listingMode,
            index: index,
            showDetail: showDetail,
            editMode: editMode,
            files: [],
            uploading: false,
            uploadProgress: [],
            successfullUploaded: false
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
        var createPromise = listings.create(listing);
        var that = this;
        createPromise.then(function(data) {
            var localState = {
                addListingOverview: false,
                listingMode: "myListings",
                index: data.listing.id,
                showDetail: true,
                editMode: "edit",
                files: [],
                uploading: false,
                uploadProgress: [],
                successfullUploaded: false
            };
            that.fetchListing(localState);
            that.fetchListings("myListings",that.state.page);
        }).catch(function(err){
            console.log("err: "+err);
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
        var updatePromise = listings.update(listing);
        var that = this;
        updatePromise.then(function(data){
            if (that.state.files.length > 0){
                that.uploadFiles(data);
            } else {
                that.setState({
                    listingDetail: data,
                    index: data.listing.id
                });
                that.handleFetchListing(data.listing.id);
                that.handleListUpdate();
            } 
        }).catch(function(err){
            var errMessage = "An error occurred while trying to save your listing";
            that.setState({
               showModal: true,
               transitionModalTitle: "Oops!",
               transitionModalMessage: errMessage 
            });
            console.log("err: "+err);
        });
    }
    handleCreate(listing){
        listing.owner = getUserEmail();
        var createPromise = listings.create(listing);
        createPromise(function(data){
            if (this.state.files.length > 0){
                this.uploadFiles(data);
            }else{
                this.setState({
                    listingDetail: data,
                    index: data.listing.id
                });
                this.handleListUpdate();
            }
        });

    }
    handleFilesAdded(files){
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));
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
        var publishPromise = listings.publish(id);
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
        var unpublishPromise = listings.unpublish(id);
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
            listingMode: this.state.listingMode,
            index: fetchIndex,
            showDetail: this.state.showDetail,
            editMode: this.state.editMode,
            files: [],
            uploading: false,
            uploadProgress: [],
            successfullUploaded: false
        };
        this.fetchListing(localState);
    }
    fetchListing(localState){
        if (localState.index){
            var that = this;
            var getPromise = listings.get(localState.index);
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
                that.setState({
                    listingMode: localState.listingMode,
                    addListingOverview: localState.addListingOverview,
                    listingDetail: data,
                    showDetail: localState.showDetail,
                    editMode: localState.editMode,
                    index: localState.index,
                    owner: owner,
                    files: localState.files,
                    uploading: localState.uploading,
                    uploadProgress: localState.uploadProgress,
                    successfullUploaded: localState.successfullUploaded,
                    spaceAccordionText: accordionText
                }, () => {
                    that.handleListUpdate();
                });
            }).catch(function(err){
                console.log("err: "+err);
            });
        } else {
            listings.getEnums((data) => {
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
                    files: localState.files,
                    uploading: localState.uploading,
                    uploadProgress: localState.uploadProgress,
                    successfullUploaded: localState.successfullUploaded
                });
            });
        }
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
        var that = this;
        var getAllPromise = listings.getAll(query);
        getAllPromise.then(function(listings){
           that.setState({
               listingMode: listingMode,
               listings: listings.listings.rows,
               page: listings.page,
               perPage: listings.perPage,
               count: listings.listings.count
           });
        }).catch(function(err){
            console.log("err: "+JSON.stringify(err));
        }); 

    }
    handleImageUploadFinished(data){
        this.setState({
            listingDetail: data,
            index: data.listing.id,
            showSpinner: false
        });
        this.handleListUpdate();
        this.handleFetchListing(data.listing.id);

    }
    async uploadFiles(data) {
      
        this.setState({ 
            uploadProgress: {}, 
            uploading: true ,
            showSpinner: true
        });
        const promises = [];
        this.state.files.forEach(file => {
            promises.push(this.sendRequest(file,data.listing.id));
        });
        try {
            await Promise.all(promises);

            this.setState({ successfullUploaded: true, uploading: false });
            this.handleImageUploadFinished(data);
        } catch (e) {
        // Not Production ready! Do some error handling here instead...
            this.setState({ successfullUploaded: true, uploading: false });
            this.handleImageUploadFinished(data);
        }
    }
    sendRequest(file, id){
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.upload.addEventListener("progress", event => {
                if (event.lengthComputable) {
                    const copy = { ...this.state.uploadProgress };
                    copy[file.name] = {
                        state: "pending",
                        percentage: (event.loaded / event.total) * 100
                    };
                    this.setState({ uploadProgress: copy });
                }
            });
   
            req.upload.addEventListener("load", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "done", percentage: 100 };
                this.setState({ uploadProgress: copy });
                //resolve(req.response);
            });
   
            req.upload.addEventListener("error", event => {
                const copy = { ...this.state.uploadProgress };
                copy[file.name] = { state: "error", percentage: 0 };
                this.setState({ uploadProgress: copy });
                reject(req.response);
            });
            const formData = new FormData();
            formData.append("image", file, file.name);
            formData.append("listing_id",id);
            var url = process.env.REACT_APP_LISTING_SERVICE+"upload";
            req.open("POST", url);
            req.onreadystatechange = function(){
                if (req.readyState === 4){
                    if (req.status === 200)
                        resolve(req.responseText);
                    else
                        reject(req.responsetext);
                }
            };
            req.send(formData);
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
        console.log("this.state.deleteId: "+this.state.deleteId);
        var that=this;
        var deleteSpace = spaceService.deletePromise(this.state.deleteId);
        deleteSpace.then(function(result){
            that.handleFetchListing();
            that.fetchListings("myListings",that.state.page);
            that.handleDeleteHide();
        }).catch(function(err){
            console.log("err: "+err);
        });
    }
    handleDeleteHide(){
        this.setState({
            showDeleteModal: false
        });
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
                         onFilesAdded={this.handleFilesAdded}
                         files={this.state.files}
                         uploading={this.state.uploading}
                         uploadProgress={this.state.uploadProgress}
                         successfullUploaded={this.state.successfullUploaded}
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
                    />
                    <ListingAddType
                        show={this.state.addListingType}
                        onNext={this.handleListingTypeNext}
                        onCancel={this.handleCancelAddType}
                    />
                    <ListingAddAddress
                        show={this.state.addListingAddress}
                        onNext={this.handleListingAddressNext}
                        listing={this.state.newListing}
                        onCancel={this.handleCancelAddAddress}
                    />
                    <ListingAddOverview
                        show={this.state.addListingOverview}
                        onNext={this.handleListingOverviewNext}
                        listing={this.state.newListing}
                        onCancel={this.handleCancelAddOverview}
                    />
                </Row>
                <Row>
                    <Col xs={7} className={showDetail? "rightcol" : "leftcol"}>
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
                                onFilesAdded={this.handleFilesAdded}
                                files={this.state.files}
                                uploading={this.state.uploading}
                                uploadProgress={this.state.uploadProgress}
                                successfullUploaded={this.state.successfullUploaded}
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
                            />
                        </CSSTransition>
                    {!showDetail ?
                            <ListingMap showDetail={showDetail} />
                    : null}
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
                </div>
                ) }
            </React.Fragment>
        );
    }
}

export default ListingPage;
