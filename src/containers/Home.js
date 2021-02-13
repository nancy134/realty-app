import React, { Component } from 'react';
import './Home.css';
import {
    Row,
    Col,
} from 'react-bootstrap';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
import geolocationService from '../helpers/geolocation';
import WizardAddListing from '../components/WizardAddListing';
import authenticationService from '../helpers/authentication';
import listingService from '../services/listings';
import ListingToolbar from '../components/ListingToolbar';
export class Home extends Component { 
  constructor(props, context) {
    super(props, context);
    this.handleFindSpace = this.handleFindSpace.bind(this);
    this.handleAddListingFinish = this.handleAddListingFinish.bind(this);
    this.handleAddListingCancel = this.handleAddListingCancel.bind(this);
    this.state = {
        address: ''
    };
  }
  handleAddListingFinish(listing){
      listing.owner = authenticationService.getUserEmail();
      listingService.create(listing).then(function(data){
          var url = 
              window.location.protocol + 
              "//" + 
              window.location.hostname + 
              "/listing?listingMode=myListings";
          window.location.href = url
      }).catch(function(err){
          console.log(err);
      });
  }
  handleAddListingCancel(){
      this.props.onAddListingCancel();
  }
  handleChange = address => {
      this.setState({address});
  };
  handleSelect = address => {
      geocodeByAddress(address).then(results => { 
          var formatted_address = results[0].formatted_address;
          var lat0 = results[0].geometry.viewport.getNorthEast().lat();
          var lng0 = results[0].geometry.viewport.getNorthEast().lng();
          var lat1 = results[0].geometry.viewport.getSouthWest().lat();
          var lng1 = results[0].geometry.viewport.getSouthWest().lng(); 
          this.setState({
              address: address,
              formatted_address: formatted_address,
              lat0: lat0,
              lng0: lng0,
              lat1: lat1,
              lng1: lng1
          });
      }).catch(error => {
          console.error('Error', error);
      });
  };
  handleFindSpace(state){
    var url = "";
    url = window.location.protocol + "//" + window.location.hostname + "/listing?filter=home";
    var defaultLocation = { 
        formatted_address: state.address,
        lat0: state.bounds.lat0,
        lng0: state.bounds.lng0,
        lat1: state.bounds.lat1,
        lng1: state.bounds.lng1,
        listingType: state.listingType
    };
    geolocationService.saveLocation(defaultLocation);
    window.location.href = url; 
  }

  componentDidMount(){
  }

  render(){
  return (
    <div className="home-filter bimage">
        { this.props.showAddListingWizard ?
        <WizardAddListing
            loggedIn={this.props.loggedIn}
            start={this.props.showAddListingWizard}
            onFinish={this.handleAddListingFinish}
            onCancel={this.handleAddListingCancel}
            onLogin={this.handleLogin}
        />
        : null }
        <Row className="pt-5 pl-5">
            <Col>
                <h1>Find your commercial property</h1>
            </Col>
        </Row>
        <Row className="pl-5">
          <ListingToolbar
              buttonText="Search"
              listingMode={"allListings"}
              formatted_address={this.state.formatted_address}
              onSearch={this.handleFindSpace}
              showClearFiltersButton={false}
              showReportViewButton={false}
              showMoreFiltersButton={false}
              showSpaceTypeButton={false}
          />
        </Row>
    </div>
  );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(Home);
