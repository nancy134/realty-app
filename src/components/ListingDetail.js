import React from 'react';
import {
} from 'react-bootstrap';
import ListingDetailHeader from './ListingDetailHeader';
import ListingDetailOverview from './ListingDetailOverview';
import ListingDetailAvailableSpace from './ListingDetailAvailableSpace';
import ListingDetailGeneral from './ListingDetailGeneral';
import ListingDetailAmenities from './ListingDetailAmenities';
import ListingDetailBrokers from './ListingDetailBrokers';
import ListingDetailBuildingIncome from './ListingDetailBuildingIncome';
import ListingDetailUnits from './ListingDetailUnits';
import ListingDetailTenants from './ListingDetailTenants';
import ListingDetailPortfolio from './ListingDetailPortfolio';
import ListingDetailAttachments from './ListingDetailAttachments';
import listings from '../services/listings';
import spaces from '../services/spaces';
import units from '../services/units';
import tenants from '../services/tenants';
import portfolios from '../services/portfolios';
import { isOwner } from '../helpers/authentication';
import { getUserEmail } from '../helpers/authentication';

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
        this.getListing = this.getListing.bind(this);
    }

    handleShowDetailChange() {
        this.props.onShowDetailChange(false);
    }
    handleEditToggle(value) {
        this.props.onEditToggle(value);
    }
    handleListingUpdate(listing){
        if (this.state.listing){ // Update
            listings.update(listing, (data) => {
                this.setState({
                    listing: data.listing,
                    states: data.states,
                    listingTypes: data.listingTypes,
                    propertyTypes: data.propertyTypes
                });
                this.props.onListUpdate();
            });
        } else { // Create
            listing.owner = getUserEmail();
            listings.create(listing, (data) => {
                this.setState({
                    listing: data.listing,
                    states: data.states,
                    listingTypes: data.listingTypes,
                    propertyTypes: data.propertyTypes
                });
                this.props.onListUpdate();
            });
        }
    }
    handleSpaceUpdate(space){
        if (space.id){
            spaces.update(space, (data) => {
                this.getListing();
            });
        } else {
            spaces.create(space, (data) => {
                this.getListing();
            });
        }
    }
    handleUnitUpdate(unit){
         if (unit.id){
             units.update(unit, (data) => {
                 this.getListing();
             });
         } else {
             units.create(unit, (data) => {
                 this.getListing();
             });
         }
    }
    handleTenantUpdate(tenant){
        if (tenant.id){
            tenants.update(tenant, (data) => {
                this.getListing();
            });
        } else {
            tenants.create(tenant, (data) => {
                this.getListing();
            });
        }
    }
    handlePortfolioUpdate(portfolio){
        if (portfolio.id){
            portfolios.update(portfolio, (data) => {
                this.getListing();
            });
        } else {
            portfolios.create(portfolio, (data) => {
                this.getListing();
            });
        }
    } 
    getListing(){
        if (this.props.index){
            listings.get(this.props.index, (data) => {
                if (isOwner(data.listing.owner)){
                    this.props.onOwnerChange(true);
                } else {
                    this.props.onOwnerChange(false);
                }
                this.setState({
                    listing: data.listing,
                    states: data.states,
                    listingTypes: data.listingTypes,
                    propertyTypes: data.propertyTypes
                });
            });
        } else {
            listings.getEnums((data) => {
                this.setState({
                    states: data.states,
                    listingTypes: data.listingTypes,
                    propertyTypes: data.propertyTypes
                });
            });
        }
    }
    componentDidMount(){
        if (this.props.index){
            listings.get(this.props.index, (data) => {
                if (isOwner(data.listing.owner)){
                    this.props.onOwnerChange(true);
                } else {
                    this.props.onOwnerChange(false);
                }
                this.setState({
                    listing: data.listing,
                    states: data.states,
                    listingTypes: data.listingTypes,
                    propertyTypes: data.propertyTypes,
                    amenities: data.amenities
                });
            });
        } else {
            listings.getEnums((data) => {
                this.setState({
                    states: data.states,
                    listingTypes: data.listingTypes,
                    propertyTypes: data.propertyTypes,
                    amenities: data.amenities
                });
            });
        }

    }
    componentWillUnmount(){
    }
    render(){
        const showDetail = this.props.showDetail;
        var editMode = this.props.editMode;
        const listing = this.state.listing;
        const states = this.state.states;
        //const propertyTypes = this.state.propertyTypes;
        const listingTypes = this.state.listingTypes;
        const allAmenities = this.state.amenities;
        if (states){
        }
        const owner = this.props.owner;
        if (showDetail){
            return (
            <div>
                <ListingDetailHeader listing={listing} states={states} owner={owner} editMode={editMode} onShowDetailChange={this.handleShowDetailChange} onEditToggle={this.handleEditToggle} onListingUpdate={this.handleListingUpdate} />
                <ListingDetailOverview listing={listing} listingTypes={listingTypes} editMode={editMode} onListingUpdate={this.handleListingUpdate} getListing={this.getListing}/>
                { (editMode === "edit") || (listing && listing.spaces.length) > 0 ?
                <ListingDetailAvailableSpace listing={listing} editMode={editMode} onSpaceUpdate={this.handleSpaceUpdate} getListing={this.getListing}/>
                : null }
                {(editMode === "edit") || (listing && (listing.units.length > 0)) ?
                <ListingDetailUnits listing={listing} editMode={editMode} onUnitUpdate={this.handleUnitUpdate} getListing={this.getListing}/>
                : null }
                {(editMode === "edit") || (listing && listing.tenants.length) > 0 ?
                <ListingDetailTenants listing={listing} editMode={editMode} onTenantUpdate={this.handleTenantUpdate} getListing={this.getListing}/>
                : null }
                {(editMode === "edit") || (listing && listing.portfolios.length) > 0 ?
                <ListingDetailPortfolio listing={listing} editMode={editMode} onPortfolioUpdate={this.handlePortfolioUpdate} getListing={this.getListing} />
                : null }
                {(editMode === "edit") ?
                <ListingDetailAttachments listing={listing} editMode={editMode} />
                : null }
                <ListingDetailGeneral listing={listing} editMode={editMode} onListingUpdate={this.handleListingUpdate} getListing={this.getListing}/>
                {(editMode === "edit") || (listing && listing.amenities) ?
                <ListingDetailAmenities listing={listing} editMode={editMode}  allAmenities={allAmenities}/>
                : null }
                <ListingDetailBuildingIncome listing={listing} editMode={editMode} />
                <ListingDetailBrokers listing={listing} editMode={editMode} />

            </div> 
            );
        } else {
            return null;
        }
    } 
}

export default ListingDetail;
