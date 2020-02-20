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
import { isOwner } from '../helpers/authentication';

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
        } else { // Create
            console.log("Create listing");
        }
    }
    componentDidMount(){
        if (this.props.index){
            fetch(process.env.REACT_APP_LISTING_SERVICE+'listing/'+this.props.index)
            .then(res => res.json())
            .then((data) => {
                var owner = false;
                console.log("data.owner: "+data.owner);
                if (data && isOwner(data.owner)){
                    owner = true;
                } 
                this.setState({ 
                    listing: data
                });
                this.props.onOwnerChange(owner);
            })
            .catch(console.log)
        }

    }
    componentWillUnmount(){
    }
    render(){
        const showDetail = this.props.showDetail;
        var editMode = this.props.editMode;
        const listing = this.state.listing;
        const owner = this.props.owner;
        if (showDetail){
            return (
            <div>
                <ListingDetailHeader listing={listing} owner={owner} editMode={editMode} onShowDetailChange={this.handleShowDetailChange} onEditToggle={this.handleEditToggle} onListingUpdate={this.handleListingUpdate} />
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
