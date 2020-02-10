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
import ListingDetailBuildingIncome from './ListingDetailBuildingIncome';
import ListingDetailUnits from './ListingDetailUnits';
import ListingDetailTenants from './ListingDetailTenants';
import ListingDetailPortfolio from './ListingDetailPortfolio';
import ListingDetailAttachments from './ListingDetailAttachments';

class ListingDetail extends React.Component {
    constructor(props) {
   super(props);
        this.state = {
            listing: null,
            editMode: this.props.editMode,
            showDetail: this.props.showDetail,
            index: this.props.index
        };
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
    }

    handleShowDetailChange() {
        this.props.onShowDetailChange(false);
    }
    componentDidMount(){
        if (this.state.index){
            fetch(process.env.REACT_APP_LISTING_SERVICE+'listing/'+this.props.index)
            .then(res => res.json())
            .then((data) => {
                this.setState({ listing: data })
            })
            .catch(console.log)
        }

    }
    componentWillUnmount(){
    }
    render(){
        const showDetail = this.props.showDetail;
        var editMode = this.state.editMode;
        const listing = this.state.listing;
        console.log("ListingDetail listing: "+JSON.stringify(listing));
        if (this.props.index === "1" || this.props.index === "2") { // Change to compare owner to logged in ower
            editMode = "edit";
        }
        if (showDetail){
            return (
            <div>
                <ListingDetailHeader listing={listing} editMode={editMode} onShowDetailChange={this.handleShowDetailChange}/>
                <ListingDetailOverview listing={listing} editMode={editMode} />
                { listing && listing.spaces.length > 0 ?
                <ListingDetailAvailableSpace listing={listing} editMode={editMode} />
                : null }
                { listing && listing.units.length > 0 ?
                <ListingDetailUnits listing={listing} editMode={editMode} />
                : null }
                { listing && listing.tenants.length > 0 ?
                <ListingDetailTenants listing={listing} editMode={editMode} />
                : null }
                { listing && listing.portfolio.length > 0 ?
                <ListingDetailPortfolio listing={listing} editoMode={editMode} />
                : null }
                <ListingDetailAttachments listing={listing} editMode={editMode} />
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
