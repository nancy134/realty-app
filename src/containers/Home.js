import React, { Component } from 'react';
import './Home.css';
import {
    Jumbotron,
    InputGroup,
    FormControl,
    Button,
    Container
} from 'react-bootstrap';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import Geocode from 'react-geocode';
import geolocationService from '../helpers/geolocation';

export class Home extends Component { 
  constructor(props, context) {
    super(props, context);
    this.handleFindSpace = this.handleFindSpace.bind(this);
    this.state = {
        address: ''
    };
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
  handleFindSpace(){
    var url = "";
    url = window.location.protocol + "//" + window.location.hostname + "/listing";
    var defaultLocation = { 
        formatted_address: this.state.formatted_address,
        lat0: this.state.lat0,
        lng0: this.state.lng0,
        lat1: this.state.lat1,
        lng1: this.state.lng1
    };
    geolocationService.saveDefaultLocation(defaultLocation);
    window.location.href = url; 
  }

  componentDidMount(){
    Geocode.setApiKey('AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4');
    var that = this;
    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(function(response){
               var city = "";
               var state = "";
               var len = response.results[0].address_components.length;
               for (var i=0; i<len; i++){
                  var len2 = response.results[0].address_components[i].types.length;
                   for (var j=0; j<len2; j++){
                       if (response.results[0].address_components[i].types[j] === "locality"){
                           city = response.results[0].address_components[i].long_name;
                       } else if (response.results[0].address_components[i].types[j] === "administrative_area_level_1"){
                           state = response.results[0].address_components[i].short_name;
                      }
                   }
               }

               var address = city+", "+state;
               Geocode.fromAddress(address).then(function(response2){

                   var lat0 = response2.results[0].geometry.bounds.northeast.lat;
                   var lng0 = response2.results[0].geometry.bounds.northeast.lng;
                   var lat1 = response2.results[0].geometry.bounds.southwest.lat;
                   var lng1 = response2.results[0].geometry.bounds.southwest.lng;

                    that.setState({
                        address: address,
                        formatted_address: address,
                        lat0: lat0,
                        lng0: lng0,
                        lat1: lat1,
                        lng1: lng1
                    });
                });

            });
        }, function(err){
            var defaultLocation = geolocationService.getDefaultLocation();
            that.setState(defaultLocation); 
        });
    } else {
       console.log("geolocation not available");
    }
  }

  render(){
  return (
    <div className="bimage">
      <p className="p-5"></p>
      <Jumbotron className="jtron">
        <Container>
          <h1>FIND YOUR SPACE</h1>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={this.handleSelect}
            >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <InputGroup>                
                <FormControl
                  {...getInputProps({
                    placeholder: 'Search...',
                    className: 'form-control location-search-input',
                  })}
                />
                <InputGroup.Append>
                <Button
                    variant="outline-secondary"
                    onClick={this.handleFindSpace}
                >Find Space</Button>
                </InputGroup.Append>
              </InputGroup>
              <InputGroup>
              <div className="autocomplete-dropdown-container">
                {loading && <div></div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span className="ml-3">{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
              </InputGroup>
            </div>
          )}
        </PlacesAutocomplete>
        <p className="p-5"></p>
      </Container>
      </Jumbotron>
    </div>
  );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(Home);
