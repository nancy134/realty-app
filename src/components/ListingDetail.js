import React from 'react';
import {
} from 'react-bootstrap';
import ListingDetailHeader from './ListingDetailHeader';
import ListingDetailOverview from './ListingDetailOverview';
import ListingDetailAvailableSpace from './ListingDetailAvailableSpace';
import ListingDetailGeneral from './ListingDetailGeneral';
//import ListingDetailAmenities from './ListingDetailAmenities';
//import ListingDetailBrokers from './ListingDetailBrokers';
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

class ListingDetail extends React.Component {
    constructor(props) {
   super(props);
        this.state = {
            listing: null,
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
            portfolioSaving: false

        };
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleListingUpdate = this.handleListingUpdate.bind(this);
        this.handleSpaceUpdate = this.handleSpaceUpdate.bind(this);
        this.handleFilesAdded = this.handleFilesAdded.bind(this);

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
    handleFilesAdded(files){
        this.props.onFilesAdded(files);
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
        if (showDetail){
            return (
            <div>
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
                />
                </div>
                <ListingDetailOverview 
                    listing={listing} 
                    listingTypes={listingTypes} 
                    editMode={editMode} 
                    onListingUpdate={this.handleListingUpdate} 
                    getListing={this.props.onFetchListing}
                    onFilesAdded={this.handleFilesAdded}
                    files={this.props.files}
                    uploading={this.props.uploading}
                    uploadProgress={this.props.uploadProgress}
                    successfullUploaded={this.props.successfullUploaded}
                    showSpinner={this.props.showSpinner}

                />
                { (editMode === "edit") || (listing && listing.spaces.length) > 0 ?
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
                {(editMode === "edit") || (listing && (listing.units.length > 0)) ?
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
                {(editMode === "edit") || (listing && listing.tenants.length) > 0 ?
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
                {(editMode === "edit") || (listing && listing.portfolios.length) > 0 ?
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
            </div>
//                {(editMode === "edit") ?
//                <ListingDetailAttachments listing={listing} editMode={editMode} />
//                : null }

                //{(editMode === "edit") || (listing && listing.amenities) ?
                //<ListingDetailAmenities listing={listing} editMode={editMode}  allAmenities={allAmenities}/>
                //: null }
//                <ListingDetailBuildingIncome listing={listing} editMode={editMode} />
//                <ListingDetailBrokers listing={listing} editMode={editMode} />

            );
        } else {
            return null;
        }
    } 
}

export default ListingDetail;
