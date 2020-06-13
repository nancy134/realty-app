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
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';

export class Home extends Component { 
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
        address: ''
    };
  }

  handleChange = address => {
      console.log("handleChange address: "+address);
      this.setState({address});
  };
  handleSelect = address => {
      console.log("handleSelect address; "+address);
      geocodeByAddress(address).then(results => { 
          console.log("results: "+JSON.stringify(results));
          var formatted_address = results[0].formatted_address;
          var lat0 = results[0].geometry.viewport.getNorthEast().lat();
          var lng0 = results[0].geometry.viewport.getNorthEast().lng();
          var lat1 = results[0].geometry.viewport.getSouthWest().lat();
          var lng1 = results[0].geometry.viewport.getSouthWest().lng(); 
          console.log("lat0: "+lat0);
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
  handleClick(){
    console.log("handleClick()");
    var url = "";
    url = window.location.protocol + "//" + window.location.hostname + "/listing";
    if (this.state.formatted_address){
        url += "?formatted_address="+this.state.formatted_address+
        "&lat0="+this.state.lat0+
        "&lng0="+this.state.lng0+
        "&lat1="+this.state.lat1+
        "&lng1="+this.state.lng1;
    }
    window.location.href = url; 
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
                <Button variant="outline-secondary" onClick={this.handleClick}>Find Space</Button>
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
                      <span>{suggestion.description}</span>
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
