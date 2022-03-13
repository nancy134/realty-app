import React, { Component } from 'react';
import './Home.css';
import {
    Row,
    Col,
} from 'react-bootstrap';
import {
    geocodeByAddress
} from 'react-places-autocomplete';
import geolocationService from '../helpers/geolocation';
import WizardAddListing from '../components/WizardAddListing';
import authenticationService from '../helpers/authentication';
import listingService from '../services/listings';
import ListingToolbar from '../components/ListingToolbar';
import { Helmet } from 'react-helmet';
import { getDomain } from '../helpers/utilities';
import Features from '../components/Features';
import ListingCards from '../components/ListingCards';
import EmailRegistration from '../components/EmailRegistration';

export class Home extends Component { 
  constructor(props, context) {
    super(props, context);
    this.handleFindSpace = this.handleFindSpace.bind(this);
    this.handleAddListingFinish = this.handleAddListingFinish.bind(this);
    this.handleAddListingCancel = this.handleAddListingCancel.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
        address: ''
    };
  }

  handleAddListingFinish(listing){
      var that = this;
      listing.owner = authenticationService.getUserEmail();
      listingService.create(listing).then(function(data){
          that.props.onAddListingCancel();
          that.props.history.push({
              pathname: '/listing',
              data: {
                  listingId: data.listing.id,
                  showDetail: true,
                  listingMode: "myListings",
                  createListing: true,
                  editMode: "edit"
              }
          });
      }).catch(function(err){
          console.log(err);
      });
  }
  handleLogin(){
      this.props.onLogin();
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
              lng1: lng1,
              propertyTypes: []
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
      var that = this;
      listingService.getEnumsPromise().then(function(enums){
          that.setState({
              propertyTypes: enums.propertyTypes
          });
      }).catch(function(err){
          console.log(err);
      });
  }

  render(){
  var domain = getDomain(window.location.hostname);
  var title = "";
  if (domain === "findingcre"){
      title = "FindingCRE Home";
  }else if (domain === "sabresw"){
      title = "SabreSW Home";
  }else if (domain === "murbansw"){
      title = "MurbanSW Home";
  }else{
      title = "Phowma Home";
  }
  var showListingCards = true;
  if (domain === "findingcre") showListingCards = false;
     
  return (
    <React.Fragment>
    <div className="ml-1 mr-1 home-filter bimage">
        <Helmet>
            <title>{title}</title>
        </Helmet>
        { this.props.showAddListingWizard ?
        <WizardAddListing
            loggedIn={this.props.loggedIn}
            start={this.props.showAddListingWizard}
            onFinish={this.handleAddListingFinish}
            onCancel={this.handleAddListingCancel}
            onLogin={this.handleLogin}
            propertyTypes={this.state.propertyTypes}

            // Behalf User
            isAdmin={this.props.isAdmin}
            behalfUser={this.props.behalfUser}
            behalfUserCognitoId={this.props.behalfUserCognitoId}

        />
        : null }
        <div className="spacer">
        </div>
        <Row>
            <Col xs={3}></Col>
            <Col xs={6}>
                <div className="background">
                    <Row className="mx-auto" style={{width: '100%'}}>
                        <Col>
                            <h1>Find your commercial property</h1>
                        </Col>
                    </Row>
                    <Row className="pb-2 mx-auto" style={{width: '100%'}}>
                        <ListingToolbar
                            buttonText="Search"
                            listingMode={"allListings"}
                            formatted_address={this.state.formatted_address}
                            onSearch={this.handleFindSpace}
                            showClearFiltersButton={false}
                            showReportViewButton={false}
                            showMoreFiltersButton={false}
                            showSpaceTypeButton={false}
                            searchMSize="auto"
                        />
                    </Row>
                </div>
            </Col>
            <Col xs={3}></Col>
        </Row>
        <div className="spacer"></div>
        <Row>
            <Col xs={3}></Col>
            <Col xs={6}>
                <div className="background">
                    <Row className="pt-2 pb-2 mx-auto" style={{width: '100%'}}>
                        <Col>
                            <EmailRegistration/>
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col xs={3}></Col>
        </Row>

    </div>
    <Features />
    { showListingCards ?
    <ListingCards />
    : null }
    </React.Fragment>
    );
  }
}

export default Home;
