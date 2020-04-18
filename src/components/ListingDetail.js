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
import { isOwner } from '../helpers/authentication';
import listingService from '../services/listings';

class ListingDetail extends React.Component {
    constructor(props) {
   super(props);
        this.state = {
            listing: null
        };
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleListingUpdate = this.handleListingUpdate.bind(this);
        this.handleSpaceUpdate = this.handleSpaceUpdate.bind(this);
        this.handleUnitUpdate = this.handleUnitUpdate.bind(this);
        this.handlePortfolioUpdate = this.handlePortfolioUpdate.bind(this);
        this.handleTenantUpdate = this.handleTenantUpdate.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleUnpublish = this.handleUnpublish.bind(this);
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
    handlePublish(id){
        listingService.publish(id, (data) => {
            this.props.onPublish(data);
        });
    }
    handleUnpublish(id){
        listingService.unpublish(id, (data) => {
            this.props.onUnpublish(data);
        });
    }

    handleSpaceUpdate(space){
        if (space.id){
            spaces.update(space, (data) => {
                this.props.onFetchListing(data.ListingVersionId);
            });
        } else {
            spaces.create(space, (data) => {
                this.props.onFetchListing(data.ListingVersionId);
            });
        }
    }
    handleUnitUpdate(unit){
         if (unit.id){
             units.update(unit, (data) => {
                 this.props.onFetchListing(data.ListingVersionId);
             });
         } else {
             units.create(unit, (data) => {
                 this.props.onFetchListing(data.ListingVersionId);
             });
         }
    }
    handleTenantUpdate(tenant){
        if (tenant.id){
            tenants.update(tenant, (data) => {
                this.props.onFetchListing(data.ListingVersionId);
            });
        } else {
            tenants.create(tenant, (data) => {
                this.props.onFetchListing(data.ListingVersionId);
            });
        }
    }
    handlePortfolioUpdate(portfolio){
        if (portfolio.id){
            portfolios.update(portfolio, (data) => {
                this.props.onFetchListing(data.ListingVersionId);
            });
        } else {
            portfolios.create(portfolio, (data) => {
                this.props.onFetchListing(data.ListingVersionId);
            });
        }
    } 
    componentDidMount(){
        if (this.props.listingDetail){
                console.log("this.props.listingDetail: "+JSON.stringify(this.props.listingDetail));
                var listingDetail = this.props.listingDetail;
                if (this.props.listingDetail.listing){
                    if (isOwner(listingDetail.listing.owner)){
                        this.props.onOwnerChange(true);
                    } else {
                        this.props.onOwnerChange(false);
                    }
                }
                this.setState({
                    listing: listingDetail.listing,
                    states: listingDetail.states,
                    listingTypes: listingDetail.listingTypes,
                    spaceUses: listingDetail.spaceUses,
                    spaceTypes: listingDetail.spaceTypes,
                    propertyTypes: listingDetail.propertyTypes,
                    amenities: listingDetail.amenities
                });
        }

    }
    componentWillUnmount(){
    }
    render(){
        const showDetail = this.props.showDetail;
        var editMode = this.props.editMode;
        const states = this.state.states;
        //const propertyTypes = this.state.propertyTypes;
        const listingTypes = this.state.listingTypes;
        const spaceUses = this.state.spaceUses;
        const spaceTypes = this.state.spaceTypes;
        //const allAmenities = this.state.amenities;
        const listingMode = this.props.listingMode;
        var listing = null;
        if (this.props.listingDetail){
           listing = this.props.listingDetail.listing;
        }  
        if (states){
        }
        const owner = this.props.owner;

        if (showDetail){
            return (
            <div>
                <ListingDetailHeader 
                    listing={listing} 
                    states={states} 
                    owner={owner} 
                    editMode={editMode}
                    listingMode={listingMode} 
                    onShowDetailChange={this.handleShowDetailChange} 
                    onEditToggle={this.handleEditToggle} 
                    onListingUpdate={this.handleListingUpdate} 
                    onPublish={this.handlePublish}
                    onUnpublish={this.handleUnpublish}
                />
                <ListingDetailOverview 
                    listing={listing} 
                    listingTypes={listingTypes} 
                    editMode={editMode} 
                    onListingUpdate={this.handleListingUpdate} 
                    getListing={this.props.onFetchListing}
                />
                { (editMode === "edit") || (listing && listing.spaces.length) > 0 ?
                    <ListingDetailAvailableSpace 
                        listing={listing} 
                        editMode={editMode} 
                        spaceUses={spaceUses}
                        spaceTypes={spaceTypes}
                        onSpaceUpdate={this.handleSpaceUpdate} 
                        getListing={this.props.onFetchListing}
                    />
                : null }
                {(editMode === "edit") || (listing && (listing.units.length > 0)) ?
                    <ListingDetailUnits 
                        listing={listing} 
                        editMode={editMode} 
                        onUnitUpdate={this.handleUnitUpdate} 
                        getListing={this.props.onFetchListing}
                    />
                : null }
                {(editMode === "edit") || (listing && listing.tenants.length) > 0 ?
                    <ListingDetailTenants 
                        listing={listing} 
                        editMode={editMode} 
                        onTenantUpdate={this.handleTenantUpdate} 
                        getListing={this.props.onFetchListing}
                    />
                : null }
                {(editMode === "edit") || (listing && listing.portfolios.length) > 0 ?
                    <ListingDetailPortfolio 
                        listing={listing} 
                        editMode={editMode} 
                        onPortfolioUpdate={this.handlePortfolioUpdate} 
                        getListing={this.props.onFetchListing} />
                : null }
                    <ListingDetailGeneral 
                        listing={listing} 
                        editMode={editMode} 
                        onListingUpdate={this.handleListingUpdate} 
                        getListing={this.props.onFetchListing}
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
