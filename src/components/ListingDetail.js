import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import ListingDetailHeader from './ListingDetailHeader';
import ListingDetailOverview from './ListingDetailOverview';
import ListingDetailAvailableSpace from './ListingDetailAvailableSpace';
import ListingDetailGeneral from './ListingDetailGeneral';
import ListingDetailAmenities from './ListingDetailAmenities';
import ListingDetailBrokers from './ListingDetailBrokers';
//import ListingDetailBuildingIncome from './ListingDetailBuildingIncome';
import ListingDetailUnits from './ListingDetailUnits';
import ListingDetailTenants from './ListingDetailTenants';
import ListingDetailPortfolio from './ListingDetailPortfolio';
//import ListingDetailAttachments from './ListingDetailAttachments';
import spaces from '../services/spaces';
import units from '../services/units';
import tenants from '../services/tenants';
import portfolios from '../services/portfolios';
import { isOwner, getUserEmail } from '../helpers/authentication';
import listingService from '../services/listings';
import imageService from '../services/images';
import {formatDateTime} from '../helpers/utilities';
import ContactModal from './ContactModal';

class ListingDetail extends React.Component {
    constructor(props) {
   super(props);
        this.state = {
            listing: null,

            // Overview
            overviewNew: false,
            overviewUpdate: false,
            overviewSaving: false,
            overviewFiles: [],
            uploadProgress: [],
            uploading: false,
            successfullyUploaded: false,
            cards: [],

            // Space
            spaceNew: false,
            spaceUpdate: false,
            spaceSaving: false,

            // Unit
            unitNew: false,
            unitUpdate: false,
            unitSaving: false,

            // Tenant
            tenantNew: false,
            tenantUpdate: false,
            tenantSaving: false,

            // Portfolio
            portfolioNew: false,
            portfolioUpdate: false,
            portfolioSaving: false,

            // Amenities
            amenityUpdate: false,
            amenitySaving: false,
            amenityError: null,

            // Contact
            showContactModal: false
        };
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleListingUpdate = this.handleListingUpdate.bind(this);

        // Overview
        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        this.handleOverviewUpdate = this.handleOverviewUpdate.bind(this);
        this.handleOverviewModalNew = this.handleOverviewModalNew.bind(this);
        this.handleOverviewModalUpdate = this.handleOverviewModalUpdate.bind(this);
        this.handleOverviewModalHide = this.handleOverviewModalHide.bind(this);
        this.handleImageProgress = this.handleImageProgress.bind(this);
        this.handleImagesChanged = this.handleImagesChanged.bind(this);

        // Space 
        this.handleSpaceUpdate = this.handleSpaceUpdate.bind(this);
        this.handleSpaceModalNew = this.handleSpaceModalNew.bind(this);
        this.handleSpaceModalUpdate = this.handleSpaceModalUpdate.bind(this);
        this.handleSpaceModalHide = this.handleSpaceModalHide.bind(this);

        // Unit 
        this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
        this.handleUnitModalNew = this.handleUnitModalNew.bind(this);
        this.handleUnitModalUpdate = this.handleUnitModalUpdate.bind(this);
        this.handleUnitModalHide = this.handleUnitModalHide.bind(this);

        // Portfolio
        this.handlePortfolioUpdate = this.handlePortfolioUpdate.bind(this);
        this.handlePortfolioModalNew = this.handlePortfolioModalNew.bind(this);
        this.handlePortfolioModalUpdate = this.handlePortfolioModalUpdate.bind(this);
        this.handlePortfolioModalHide = this.handlePortfolioModalHide.bind(this);

        // Tenant 
        this.handleTenantUpdate = this.handleTenantUpdate.bind(this);
        this.handleTenantModalNew = this.handleTenantModalNew.bind(this);
        this.handleTenantModalUpdate = this.handleTenantModalUpdate.bind(this);
        this.handleTenantModalHide = this.handleTenantModalHide.bind(this);

        // Amenities
        this.handleAmenityModalUpdate = this.handleAmenityModalUpdate.bind(this);
        this.handleAmenityModalHide = this.handleAmenityModalHide.bind(this);
        this.handleAmenityUpdate = this.handleAmenityUpdate.bind(this);

        // Contact
        this.handleContact = this.handleContact.bind(this);
        this.handleContactHide = this.handleContactHide.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    handleShowDetailChange() {
        this.props.onShowDetailChange(false);
    }
    handleEditToggle(value) {
        this.props.onEditToggle(value);
    }
    handleListingUpdate(listing){
        if (this.props.listingDetail && this.props.listingDetail.listing){
            this.props.onUpdate(listing);
        } else { // Create
            this.props.onCreate(listing);
        }
    }

    // Overview

    handleFilesAdded(files){
        //this.props.onFilesAdded(files);
        this.setState(prevState => ({
            overviewFiles: prevState.overviewFiles.concat(files) 
        }));
    }
    handleOverviewModalNew(){
        this.setState({
            overviewNew: true
        });
    }
    handleOverviewModalUpdate(){
        this.setState({
            overviewUpdate: true,
            successfullyUploaded: false,
            uploading: false
        });
    }
    handleOverviewModalHide(){
        this.setState({
            overviewNew: false,
            overviewUpdate: false,
            overviewSaving: false,
            overviewError: null,
            overviewFiles: []
        });
    }
    handleOverviewUpdate(listing){
        this.setState({overviewSaving: true});
        var listingProperties = Object.keys(listing).length;
        var imagesToDelete = this.checkForDeletedImages(this.props.listingDetail.listing.images, this.state.cards);
        var imagesToAdd = this.checkForAddedImages(this.state.overviewFiles, this.state.cards);
        var imagesToUpdate = this.checkForUpdatedImages(this.state.cards);

        var promises = [];
        if (listingProperties > 1){
            promises.push(listingService.update(listing));
        }

        if (imagesToAdd.length > 0){
             var uploadFilesPromise = imageService.uploadFiles(
                imagesToAdd,
                "listing",
                this.props.listingDetail.listing.id,
                this.handleImageProgress
            );
            promises.push(uploadFilesPromise);
        }

        var that = this;
        Promise.all(promises).then(function(values){
            promises = [];
            if (imagesToDelete.length > 0){
               for (var i=0; i<imagesToDelete.length; i++){
                    var deleteImagePromise = imageService.deletePromise(imagesToDelete[i]);
                    promises.push(deleteImagePromise);
                }
            }
            if (imagesToUpdate.length > 0){
                for (i=0; i<imagesToUpdate.length; i++){
                    var updateImagePromise = imageService.update(imagesToUpdate[i]);
                    promises.push(updateImagePromise);
                }
            }

            if (promises.length > 0){
                if (that.props.listingDetail.listing.publishStatus === "Draft"){
                    Promise.all(promises).then(function(values){
                        that.props.onFetchListing(that.props.listingDetail.listing.id);
                        that.handleOverviewModalHide();

                    }).catch(function(err){
                        this.setState({
                            overviewError: err.message,
                            overviewSaving: false
                        });
                        console.log(err);
                    });
                }
            } else {
                that.props.onFetchListing(that.props.listingDetail.listing.id);
                that.handleOverviewModalHide();
            }

        }).catch(function(err){
            this.setState({
                overviewError: err.message,
                overviewSaving: false
            });
            console.log(err);
        });

    }
    handleImageProgress(uploadProgress){
        this.setState({
            uploadProgress: uploadProgress
        });
    }
    handleImagesChanged(cards){
        this.setState({
            cards: cards
        });
    }
    checkForDeletedImages(images, cards){
        var imagesToDelete = [];
        for (var i=0; i<images.length; i++){
            var idToDelete = images[i].id;
            for (var j=0; j<cards.length; j++){
                if (images[i].url === cards[j].url){
                    idToDelete = 0;
                } 
            }
            if (idToDelete !== 0){
                imagesToDelete.push(idToDelete);
            }
        }
        return imagesToDelete;
    }
    checkForAddedImages(files, cards){
        var imagesToAdd = [];
        for (var i=0; i<cards.length; i++){
            for(var j=0; j<files.length; j++){
                if (cards[i].file === files[j]){
                    var imageToAdd = {
                        file: files[j],
                        order: i+1
                    }
                    imagesToAdd.push(imageToAdd);
                }
            }
        }
        return imagesToAdd;
    }

    checkForUpdatedImages(cards){
        var imagesToUpdate = [];
        for (var i=0; i<cards.length; i++){
            var order = i+1;
            if ((cards[i].file === null) && (cards[i].order !== order)){
                cards[i].order = i+1;
                imagesToUpdate.push(cards[i]);
            }
        }
        return imagesToUpdate;
    }

    // Space

    handleSpaceModalNew(){
        this.setState({
            spaceNew: true
        });
    }
    handleSpaceModalUpdate(index){
        this.setState({
            spaceUpdate: true,
            spaceUpdateIndex: index,

        });
    }
    handleSpaceModalHide(){
        this.setState({
            spaceNew: false,
            spaceUpdate: false,
            spaceSaving: false,
            spaceError: null
        });
    }
    handleSpaceUpdate(space){
        var that = this;
        this.setState({spaceSaving: true});
        if (!space.ListingVersionId){
             var listingBody = {publishStatus: 'Draft', owner: getUserEmail()};
             var createPromise = listingService.create(listingBody);
             createPromise.then(function(listingVersion){
                 space.ListingVersionId = listingVersion.listing.id;
                 var createPromise = spaces.createPromise(space);
                 createPromise.then(function(data){
                     that.props.onFetchListing(data.ListingVersionId);
                     that.handleSpaceModalHide();
                 }).catch(function(err){
                     that.setState({
                         spaceError: err.message,
                         spaceSaving: false
                     });
                     that.props.onFetchListing(listingVersion.listing.id);
                 });
             });
        } else {
            if (space.id){
                var updatePromise = spaces.updatePromise(space);
                updatePromise.then(function(data){
                    that.props.onFetchListing(data.ListingVersionId);
                    that.handleSpaceModalHide();
                }).catch(function(err){
                     that.setState({
                         spaceError: err.message,
                         spaceSaving: false
                     });
                     that.props.onFetchListing(space.ListingVersionId);

                });
            } else {
                spaces.createPromise(space).then(function(data){
                    that.props.onFetchListing(data.ListingVersionId);
                    that.handleSpaceModalHide();
                }).catch(function(err){
                     that.setState({
                         spaceError: err.message,
                         spaceSaving: false
                     });
                     that.props.onFetchListing(space.listingVersionId);
                });
            }
        }
    }

    // Unit

    handleUnitModalNew(){
        this.setState({
            unitNew: true
        });
    }
    handleUnitModalUpdate(index){
        this.setState({
            unitUpdate: true,
            unitUpdateIndex: index,

        });
    }
    handleUnitModalHide(){
        this.setState({
            unitNew: false,
            unitUpdate: false,
            unitSaving: false,
            unitError: null
        });
    }
    handleUnitUpdate(unit){
        var that = this;
        this.setState({unitSaving: true});
        if (!unit.ListingVersionId){
             var listingBody = {publishStatus: 'Draft', owner: getUserEmail()};
             var createPromise = listingService.create(listingBody);
             createPromise.then(function(listingVersion){
                 unit.ListingVersionId = listingVersion.listing.id;
                 var createPromise = units.createPromise(unit);
                 createPromise.then(function(data){
                     that.props.onFetchListing(data.ListingVersionId);
                     that.handleUnitModalHide();
                 }).catch(function(err){
                     that.setState({
                         unitError: err.message,
                         unitSaving: false
                     });
                     that.props.onFetchListing(listingVersion.listing.id);
                 });
             });
        } else {
            if (unit.id){
                var updatePromise = units.updatePromise(unit);
                updatePromise.then(function(data){
                    that.props.onFetchListing(data.ListingVersionId);
                    that.handleUnitModalHide();
                }).catch(function(err){
                     that.setState({
                         unitError: err.message,
                         unitSaving: false
                     });
                     that.props.onFetchListing(unit.ListingVersionId);

                });
            } else {
                units.createPromise(unit).then(function(data){
                    that.props.onFetchListing(data.ListingVersionId);
                    that.handleUnitModalHide();
                }).catch(function(err){
                     that.setState({
                         unitError: err.message,
                         unitSaving: false
                     });
                     that.props.onFetchListing(unit.listingVersionId);
                });
            }
        }
    }

    // Tenant

    handleTenantModalNew(){
        this.setState({
            tenantNew: true
        });
    }
    handleTenantModalUpdate(index){
        this.setState({
            tenantUpdate: true,
            tenantUpdateIndex: index,

        });
    }
    handleTenantModalHide(){
        this.setState({
            tenantNew: false,
            tenantUpdate: false,
            tenantSaving: false,
            tenantError: null
        });
    }
    handleTenantUpdate(tenant){
        var that = this;
        this.setState({tenantSaving: true});
        if (!tenant.ListingVersionId){
             var listingBody = {publishStatus: 'Draft', owner: getUserEmail()};
             var createPromise = listingService.create(listingBody);
             createPromise.then(function(listingVersion){
                 tenant.ListingVersionId = listingVersion.listing.id;
                 var createPromise = tenants.createPromise(tenant);
                 createPromise.then(function(data){
                     that.props.onFetchListing(data.ListingVersionId);
                     that.handleTenantModalHide();
                 }).catch(function(err){
                     that.setState({
                         tenantError: err.message,
                         tenantSaving: false
                     });
                     that.props.onFetchListing(listingVersion.listing.id);
                 });
             });
        } else {
            if (tenant.id){
                var updatePromise = tenants.updatePromise(tenant);
                updatePromise.then(function(data){
                    that.props.onFetchListing(data.ListingVersionId);
                    that.handleTenantModalHide();
                }).catch(function(err){
                     that.setState({
                         tenantError: err.message,
                         tenantSaving: false
                     });
                     that.props.onFetchListing(tenant.ListingVersionId);

                });
            } else {
                tenants.createPromise(tenant).then(function(data){
                    that.props.onFetchListing(data.ListingVersionId);
                    that.handleTenantModalHide();
                }).catch(function(err){
                     that.setState({
                         tenantError: err.message,
                         tenantSaving: false
                     });
                     that.props.onFetchListing(tenant.listingVersionId);
                });
            }
        }
    }

    // Portfolio

    handlePortfolioModalNew(){
        this.setState({
            portfolioNew: true
        });
    }
    handlePortfolioModalUpdate(index){
        this.setState({
            portfolioUpdate: true,
            portfolioUpdateIndex: index,
            
        });
    }
    handlePortfolioModalHide(){
        this.setState({
            portfolioNew: false,
            portfolioUpdate: false,
            portfolioSaving: false,
            portfolioError: null
        });
    }
    handlePortfolioUpdate(portfolio){
        var that = this;
        this.setState({portfolioSaving: true});
        if (!portfolio.ListingVersionId){
             var listingBody = {publishStatus: 'Draft', owner: getUserEmail()};
             var createPromise = listingService.create(listingBody);
             createPromise.then(function(listingVersion){
                 portfolio.ListingVersionId = listingVersion.listing.id;
                 var createPromise = portfolios.createPromise(portfolio);
                 createPromise.then(function(data){
                     that.props.onFetchListing(data.ListingVersionId);
                     that.handlePortfolioModalHide();
                 }).catch(function(err){
                     that.setState({
                         portfolioError: err.message,
                         portfolioSaving: false
                     });
                     that.props.onFetchListing(listingVersion.listing.id);
                 });
             });
        } else {
            if (portfolio.id){
                var updatePromise = portfolios.updatePromise(portfolio);
                updatePromise.then(function(data){
                    that.props.onFetchListing(data.ListingVersionId);
                    that.handlePortfolioModalHide();
                }).catch(function(err){
                     that.setState({
                         portfolioError: err.message,
                         portfolioSaving: false
                     });
                     that.props.onFetchListing(portfolio.ListingVersionId);

                });
            } else {
                portfolios.createPromise(portfolio).then(function(data){
                    that.props.onFetchListing(data.ListingVersionId);
                    that.handlePortfolioModalHide();
                }).catch(function(err){
                     that.setState({
                         portfolioError: err.message,
                         portfolioSaving: false
                     });
                     that.props.onFetchListing(portfolio.listingVersionId);
                });
            }
        }
    }

    // Amenity

    handleAmenityModalUpdate(){
        this.setState({
            amenityUpdate: true
        });
    }

    handleAmenityModalHide(){
        this.setState({
            amenityUpdate: false,
            amenitySaving: false,
            amenityError: null
        });
    }

    handleAmenityUpdate(listing){
        if (this.props.listingDetail && this.props.listingDetail.listing){
            this.props.onUpdate(listing);
            this.handleAmenityModalHide();
        } else { // Create
            this.props.onCreate(listing);
            this.handleAmenityModalHide();
        }
    }

    componentDidMount(){
        if (this.props.listingDetail){
            var listingDetail = this.props.listingDetail;
            if (this.props.listingDetail.listing){
                if (isOwner(listingDetail.listing.owner)){
                    this.props.onOwnerChange(true);
                } else {
                    this.props.onOwnerChange(false);
                }
            }
        }

    }
    // Contact
    handleContact(){
        this.setState({
            showContactModal: true
        });
    }
    handleContactHide(){
        this.setState({
            showContactModal: false
        });
    }
    handleSendMessage(){
        this.setState({
            showContactModal: false
        });
    }
    componentWillUnmount(){
    }
    render(){
        const showDetail = this.props.showDetail;
        var editMode = this.props.editMode;

        const listingMode = this.props.listingMode;
        var listing = null;
        var states = null;
        var listingTypes = null;
        var spaceUses = null;
        var spaceTypes = null;
        var spaceDivisibles = null;
        var portfolioTypes = null;
        var propertyTypes = null;
        if (this.props.listingDetail){
           listing = this.props.listingDetail.listing;
           states = this.props.listingDetail.states;
           listingTypes = this.props.listingDetail.listngTypes;
           spaceUses = this.props.listingDetail.spaceUses;
           spaceTypes = this.props.listingDetail.spaceTypes;
           spaceDivisibles = this.props.listingDetail.spaceDivisibles;
           portfolioTypes = this.props.listingDetail.portfolioTypes;
           propertyTypes = this.props.listingDetail.propertyTypes;
        }  
        const owner = this.props.owner;
        const fullscreen = this.props.fullscreen;
        var listingType = "For Lease";
        if (listing){
            listingType = listing.listingType;
        }

        if (showDetail){
            return (
            <div>
                <ContactModal
                    show={this.state.showContactModal}
                    onHide={this.handleContactHide}
                    onSendMessage={this.handleSendMessage}
                />
                <div id="stickyHeader">
                <ListingDetailHeader 
                    fullscreen={fullscreen}
                    listing={listing} 
                    states={states} 
                    owner={owner} 
                    editMode={editMode}
                    listingMode={listingMode} 
                    onShowDetailChange={this.handleShowDetailChange} 
                    onEditToggle={this.handleEditToggle} 
                    onListingUpdate={this.handleListingUpdate} 

                    onTransitionStart={this.props.onTransitionStart}
                    onPublish={this.props.onPublish}
                    onUnpublish={this.props.onUnpublish}
                    onTransitionHide={this.props.onTransitionHide}
                    transitionStart={this.props.transitionStart}
                    transitionSaving={this.props.transitionSaving}

                    onGoToListingByIndex={this.props.onGoToListingByIndex}
                    onContact={this.handleContact}
                />
                </div>
                <ListingDetailOverview 
                    listing={listing} 
                    listingTypes={listingTypes} 
                    editMode={editMode} 
                    getListing={this.props.onFetchListing}
                    onFilesAdded={this.handleFilesAdded}
                    files={this.state.overviewFiles}
                    uploading={this.state.uploading}
                    uploadProgress={this.state.uploadProgress}
                    successfullyUploaded={this.state.successfullyUploaded}
                    showSpinner={this.props.showSpinner}

                    onOverviewUpdate={this.handleOverviewUpdate}
                    onOverviewModalNew={this.handleOverviewModalNew}
                    onOverviewModalUpdate={this.handleOverviewModalUpdate}
                    onOverviewModalHide={this.handleOverviewModalHide}
                    overviewUpdate={this.state.overviewUpdate}
                    onImagesChanged={this.handleImagesChanged}
                    overviewSaving={this.state.overviewSaving}

                />
                { (editMode === "edit" && listingType === "For Lease") || 
                  (listing && listing.spaces.length) > 0 ?
                    <ListingDetailAvailableSpace 
                        listing={listing}
                        editMode={editMode}
                        spaceUses={spaceUses}
                        spaceTypes={spaceTypes}
                        spaceDivisibles={spaceDivisibles}
                        spaceNew={this.state.spaceNew}
                        spaceUpdate={this.state.spaceUpdate}
                        spaceError={this.state.spaceError}
                        spaceSaving={this.state.spaceSaving}
                        onSpaceModalNew={this.handleSpaceModalNew}
                        onSpaceModalUpdate={this.handleSpaceModalUpdate}
                        spaceUpdateIndex={this.state.spaceUpdateIndex}
                        onSpaceModalHide={this.handleSpaceModalHide}
                        onSpaceUpdate={this.handleSpaceUpdate}
                        getListing={this.props.onFetchListing}
                        accordionText={this.props.spaceAccordionText}
                        onAccordionChange={this.props.onAccordionChange}
                        onDelete={this.props.onDeleteSpace}

                    />
                : null }
                {(editMode === "edit" && listingType === "For Sale") || 
                 (listing && (listing.units.length > 0)) ?
                    <ListingDetailUnits 
                        listing={listing} 
                        editMode={editMode} 
                        unitNew={this.state.unitNew}
                        unitUpdate={this.state.unitUpdate}
                        unitError={this.state.unitError}
                        unitSaving={this.state.unitSaving}
                        onUnitModalNew={this.handleUnitModalNew}
                        onUnitModalUpdate={this.handleUnitModalUpdate}
                        unitUpdateIndex={this.state.unitUpdateIndex}
                        onUnitModalHide={this.handleUnitModalHide}
                        onUnitUpdate={this.handleUnitUpdate} 
                        getListing={this.props.onFetchListing}
                    />
                : null }
                {(editMode === "edit") || 
                 (listing && listing.tenants.length) > 0 ?
                    <ListingDetailTenants 
                        listing={listing}
                        editMode={editMode}
                        tenantNew={this.state.tenantNew}
                        tenantUpdate={this.state.tenantUpdate}
                        tenantError={this.state.tenantError}
                        tenantSaving={this.state.tenantSaving}
                        onTenantModalNew={this.handleTenantModalNew}
                        onTenantModalUpdate={this.handleTenantModalUpdate}
                        tenantUpdateIndex={this.state.tenantUpdateIndex}
                        onTenantModalHide={this.handleTenantModalHide}
                        onTenantUpdate={this.handleTenantUpdate}
                        getListing={this.props.onFetchListing}
                    />
                : null }
                {(editMode === "edit" && listingType === "For Sale") || 
                 (listing && listing.portfolios.length) > 0 ?
                    <ListingDetailPortfolio 
                        listing={listing} 
                        editMode={editMode} 
                        portfolioTypes={portfolioTypes}
                        portfolioNew={this.state.portfolioNew}
                        portfolioUpdate={this.state.portfolioUpdate}
                        portfolioError={this.state.portfolioError}
                        portfolioSaving={this.state.portfolioSaving}
                        onPortfolioModalNew={this.handlePortfolioModalNew}
                        onPortfolioModalUpdate={this.handlePortfolioModalUpdate}
                        portfolioUpdateIndex={this.state.portfolioUpdateIndex}
                        onPortfolioModalHide={this.handlePortfolioModalHide}
                        onPortfolioUpdate={this.handlePortfolioUpdate} 
                        getListing={this.props.onFetchListing} 
                    />
                : null }
                    <ListingDetailGeneral 
                        listing={listing} 
                        editMode={editMode} 
                        onListingUpdate={this.handleListingUpdate} 
                        getListing={this.props.onFetchListing}
                        propertyTypes={propertyTypes}
                />
                {(editMode === "edit") || 
                (listing && listing.amenities) ?
                <ListingDetailAmenities
                    listing={listing}
                    editMode={editMode}
                    allAmenities={this.props.allAmenities}

                    onAmenityUpdate={this.handleAmenityUpdate}
                    onAmenityModalUpdate={this.handleAmenityModalUpdate}
                    onAmenityModalHide={this.handleAmenityModalHide}
                    amenityUpdate={this.state.amenityUpdate}
                    amenityError={this.state.amenityError}
                    amenitySaving={this.state.amenitySaving}
                    
                />
                : null }

                <ListingDetailBrokers
                    listing={listing}
                    editMode={editMode}
                />
                { listing ?
                <Row className="bg-light listing-footer">
                    <Col>
                    Created: {formatDateTime(listing.createdAt)}
                    </Col>
                    <Col>
                    Updated: {formatDateTime(listing.updatedAt)}
                    </Col> 
                </Row>
                : null }

            </div>
//                {(editMode === "edit") ?
//                <ListingDetailAttachments listing={listing} editMode={editMode} />
//                : null }

//                <ListingDetailBuildingIncome listing={listing} editMode={editMode} />

            );
        } else {
            return null;
        }
    } 
}

export default ListingDetail;
