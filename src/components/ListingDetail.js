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
    }

    handleShowDetailChange() {
        this.props.onShowDetailChange(false);
    }
    handleEditToggle(value) {
        this.props.onEditToggle(value);
    }
    handleListingUpdate(listing){
        if (this.state.listing){ // Update
            console.log("Update listing");
            listings.update(listing, (data) => {
                this.setState({
                    listing: data.listing,
                    states: data.states
                });
            });
        } else { // Create
            listing.owner = getUserEmail();
            listings.create(listing, (data) => {
                this.setState({
                    listing: data.listing,
                    states: data.states
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
                    states: data.states
                });
            });
        } else {
            listings.getEnums((data) => {
                this.setState({
                    states: data.states
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
        if (states){
           console.log("states.length: "+states.length);
        }
        const owner = this.props.owner;
        if (showDetail){
            return (
            <div>
                <ListingDetailHeader listing={listing} states={states} owner={owner} editMode={editMode} onShowDetailChange={this.handleShowDetailChange} onEditToggle={this.handleEditToggle} onListingUpdate={this.handleListingUpdate} />
                <ListingDetailOverview listing={listing} editMode={editMode} />
                { (editMode === "edit") || (listing && listing.spaces.length) > 0 ?
                <ListingDetailAvailableSpace listing={listing} editMode={editMode} />
                : null }
                {(editMode === "edit") || (listing && (listing.units.length > 0)) ?
                <ListingDetailUnits listing={listing} editMode={editMode} />
                : null }
                {(editMode === "edit") || (listing && listing.tenants.length) > 0 ?
                <ListingDetailTenants listing={listing} editMode={editMode} />
                : null }
                {(editMode === "edit") || (listing && listing.portfolio.length) > 0 ?
                <ListingDetailPortfolio listing={listing} editMode={editMode} />
                : null }
                {(editMode === "edit") ?
                <ListingDetailAttachments listing={listing} editMode={editMode} />
                : null }
                <ListingDetailGeneral listing={listing} editMode={editMode} />
                <ListingDetailAmenities listing={listing} editMode={editMode} />
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
