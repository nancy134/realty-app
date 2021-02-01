import React, { Component } from 'react';

import ListingAddType from '../components/ListingAddType';
import ListingAddAddress from '../components/ListingAddAddress';
import ListingAddOverview from '../components/ListingAddOverview';

export class WizardAddListing extends Component {
    constructor(props){
        super(props);

        // Add Listing
        this.handleListingTypeNext = this.handleListingTypeNext.bind(this);
        this.handleListingAddressNext = this.handleListingAddressNext.bind(this);
        //this.handleGoToListing = this.handleGoToListing.bind(this);
        this.handleListingOverviewNext = this.handleListingOverviewNext.bind(this);
        this.handleCancelAddType = this.handleCancelAddType.bind(this);
        this.handleCancelAddAddress = this.handleCancelAddAddress.bind(this);
        this.handleCancelAddOverview = this.handleCancelAddOverview.bind(this);

        this.state = {

            // Add listing
            addListingType: this.props.start,
            addListingAddress: false,
            addListingOverview: false,
            newListing: {}
        };
    }

    // Add Listing

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
        console.log("handleListingOverviewNext()");
        console.log("listing:");
        console.log(listing);
        this.props.onFinish(listing);
    }
    handleCancelAddType(){
        this.setState({
            addListingType: false
        });
        this.props.onCancel();
    }
    handleCancelAddAddress(){
        this.setState({
            addListingAddress: false
        });
        this.props.onCancel();
    }
    handleCancelAddOverview(){
        this.setState({
            addListingOverview: false
        });
        this.props.onCancel();
    }

    render(){
        return(
        <React.Fragment>
            <ListingAddType
                show={this.state.addListingType}
                onNext={this.handleListingTypeNext}
                onCancel={this.handleCancelAddType}
            />
            { this.state.addListingAddress ?
            <ListingAddAddress
                show={this.state.addListingAddress}
                onNext={this.handleListingAddressNext}
                listing={this.state.newListing}
                onCancel={this.handleCancelAddAddress}
                onGoToListing={this.handleGoToListing}
            />
            : null }
            { this.state.addListingOverview ?
                <ListingAddOverview
                    show={this.state.addListingOverview && !this.props.finish}
                    onNext={this.handleListingOverviewNext}
                    listing={this.state.newListing}
                    onCancel={this.handleCancelAddOverview}
                />
            : null }
        </React.Fragment>
        );
    }
}

export default WizardAddListing;
