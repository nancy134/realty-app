import React, { Component } from 'react';
import {
    Row,
    Col
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
import { Transition } from 'react-transition-group';

const defaultStyle = {
  transition: `transform 200ms, opacity 200ms ease`,
  opacity: 1
};
const transitionStyles = {
  entering: { transform: 'scale(0.5)', opacity: .75 }, 
  entered: { transform: 'scale(2.0)', opacity: 1},
  exiting: { opacity: .75 },
  exited: { opacity: .25 } 
};
const AComponent = ({ in: inProp }) => (
    <Transition 
        in={inProp} 
        timeout={{
            appear: 100,
            enter: 300,
            exit: 300 
        }}
        appear
        unmountOnExit
    >
        {state => (
            <div
                style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}
            >
            I am {state}
            </div>
        )}
    </Transition>
); 
function TransitionApp(){
  const [entered, setEntered] = React.useState(false);
  return (
    <div
>
      <AComponent in={entered} />
        <button
          onClick={() => {
            setEntered(!entered);
          }}
        >
          Toggle Entered
        </button>
    </div>
  );
}

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
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleMoreFilterChange = this.handleMoreFilterChange.bind(this);
        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        this.handleImageUploadFinished = this.handleImageUploadFinished.bind(this);
        this.state = {
            showDetail: false,
            editMode: "view",
            listingMode: "allListings",
            owner: false,
            page: 1,
            listingDetail: null,
            spaceUseFilter: null,
            enableTransitionTest: false,
            files: [],
            uploading: false,
            uploadProgress: [],
            successfullUploaded: false,
            showSpinner: false
        };
    }
    handleShowDetailChange(showDetail, index){
        var editMode = "view";
        if (index !== this.state.index){
            editMode = "view";
        } else {
            editMode = this.state.editMode;
        }

        var localState = {
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
    handleAddListing(){
        var localState = {
           index: 0,
           showDetail: true,
           editMode: "edit",
           files: [],
           uploading: false,
           uploadProgress: [],
           successfullUploaded: false
        };
        this.fetchListing(localState);
        this.fetchListings("myListings",this.state.page);
    }
    handleListingToggle(value){
        this.setState({
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
        listings.update(listing, (data) => {
            if (this.state.files.length > 0){
                this.uploadFiles(data);
            } else {
                this.setState({
                    listingDetail: data,
                    index: data.listing.id
                });
                this.handleListUpdate();
            } 
        });
    }
    handleCreate(listing){
        listing.owner = getUserEmail();
        listings.create(listing, (data) => {
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
        var localState = {
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
            listings.get(localState.index, (data) => {
                var owner = false;
                if (isOwner(data.listing.owner)){
                    owner = true;
                }
                this.setState({
                    listingDetail: data,
                    showDetail: localState.showDetail,
                    editMode: localState.editMode,
                    index: localState.index,
                    owner: owner,
                    files: localState.files,
                    uploading: localState.uploading,
                    uploadProgress: localState.uploadProgress,
                    successfullUploaded: localState.successfullUploaded 
                }, () => {
                    this.handleListUpdate();
                });
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
        listings.getAll(query, (listings) => {
           this.setState({
               listingMode: listingMode,
               listings: listings.listings.rows,
               page: listings.page,
               perPage: listings.perPage,
               count: listings.listings.count
           });
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
                {this.state.enabledTransitionTest ?
                <TransitionApp />
                : null}
                <Row className="bg-success">
                    <ListingToolbar 
                        loggedIn={loggedIn} 
                        listingMode={listingMode}
                        onAddListing={this.handleAddListing} 
                        onListingToggle={this.handleListingToggle}
                        onFilterChange={this.handleFilterChange}
                        onMoreFilterChange={this.handleMoreFilterChange}
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
                                onFilesAdded={this.handleFilesAdded}
                                files={this.state.files}
                                uploading={this.state.uploading}
                                uploadProgress={this.state.uploadProgress}
                                successfullUploaded={this.state.successfullUploaded}
                                showSpinner={this.state.showSpinner}
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
