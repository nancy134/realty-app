import React from 'react';
import {
    Row,
    Form,
    Col,
    Button,
    Dropdown,
    InputGroup,
    Badge
} from 'react-bootstrap';
import FilterSpaceType from "./FilterSpaceType";
import FilterMore from "./FilterMore";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress
} from 'react-places-autocomplete';
import {listingTypes} from '../constants/listingTypes';
import Geocode from 'react-geocode';
import geolocationService from '../helpers/geolocation';

const SpaceTypeMenu = React.forwardRef(
    ({style, className, spaceTypeFilters, 'aria-labelledby': labeledBy , onFilterChange}, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
          <FilterSpaceType
              onFilterChange={(filters) => onFilterChange(filters)}
              spaceTypeFilters={spaceTypeFilters}
          />
      </div>
    );
    }
);

const MoreMenu = React.forwardRef(
  ({ style, className, moreFilters, 'aria-labelledby': labeledBy, onMoreFilterChange }, ref) => {

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
          <FilterMore
              onMoreFilterChange={(filters) => onMoreFilterChange(filters)}
              moreFilters={moreFilters}
          />
      </div>
    );
  },
);

class ListingToolbar extends React.Component {
    constructor(props){
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleMoreFilterChange = this.handleMoreFilterChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchFocus = this.handleSearchFocus.bind(this);
        this.handleListingTypeChange = this.handleListingTypeChange.bind(this);
        this.handleClearFilters = this.handleClearFilters.bind(this);
        this.handleShowReportView = this.handleShowReportView.bind(this);

        var address = "";
        if (this.props.formatted_address) address = this.props.formatted_address;
        var listingType = listingTypes.BOTH;
        if (this.props.listingType) listingType = this.props.listingType;
        this.state = {
            listingType: listingType,
            address: address,
            numSpaceTypeFilters: 0,
            spaceTypeFilters: [],
            numMoreFilters: 0,
            moreFilters: {minSize:"",maxSize:"",minPrice:"",maxPrice:""},
            bounds: null,
            searchClass: "",
            searchVariant: "warning",
            needsGeocoding: false
        };
    }
    // Changes while typing
    handleSearchChange = address => {
        this.setState({
            address: address,
            needsGeocoding: true,
            searchClass: "toolbar-search-button",
            searchVariant: "danger",
        });
    };
    // Dropdown address selected
    handleSearchSelect = address => {

        geocodeByAddress(address).then(results => { 
            var formatted_address = results[0].formatted_address;
            var lat0 = results[0].geometry.viewport.getNorthEast().lat();
            var lng0 = results[0].geometry.viewport.getNorthEast().lng();
            var lat1 = results[0].geometry.viewport.getSouthWest().lat();
            var lng1 = results[0].geometry.viewport.getSouthWest().lng(); 
            this.setState({
                address: address,
                formatted_address: formatted_address,
                bounds: {lat0:lat0, lng0:lng0, lat1:lat1, lng1:lng1},
                searchClass: "toolbar-search-button",
                searchVariant: "danger",
                needsGeocoding: false
            });
        }).catch(error => {
            console.log(error);
        });
    };
    // Search button Selected
    handleSearch(){
        if (this.state.needsGeoding === false){
            this.setState({
                searchClass: "",
                searchVariant: "warning"
            });
            this.props.onSearch(this.state);
        } else {
            geocodeByAddress(this.state.address).then(results => {
                var formatted_address = results[0].formatted_address;
                var lat0 = results[0].geometry.viewport.getNorthEast().lat();
                var lng0 = results[0].geometry.viewport.getNorthEast().lng();
                var lat1 = results[0].geometry.viewport.getSouthWest().lat();
                var lng1 = results[0].geometry.viewport.getSouthWest().lng();
                this.setState({
                    address: this.state.address,
                    formatted_address: formatted_address,
                    bounds: {lat0:lat0, lng0:lng0, lat1:lat1, lng1:lng1},
                    searchClass: "",
                    searchVariant: "warning",
                    needsGeocoding: false
                });
                this.props.onSearch(this.state);
            }).catch(error => {
                console.log(error);
            });
        }
    }
    handleSearchFocus(e){
        e.target.select();
    }

    getCurrentLocation(){
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
    componentDidMount(){
        if (!this.props.formatted_address){
            var defaultLocation = geolocationService.getSavedLocation();
            if (defaultLocation.formatted_address){
                this.setState({
                    formatted_address: defaultLocation.formatted_address,
                    address: defaultLocation.formatted_address,
                    lat0: defaultLocation.lat0,
                    lng0: defaultLocation.lng0,
                    lat1: defaultLocation.lat1,
                    lng1: defaultLocation.lng1,
                    listingType: defaultLocation.listingType
                });
            } else {
                this.getCurrentLocation();
            }
        }
    }
    handleFilterChange(filters){
        var numSpaceTypeFilters = 0;
        if (filters.length > 0 && filters[0] === "Any"){
            numSpaceTypeFilters = 0;
        } else {
            numSpaceTypeFilters = filters.length;
        }
        this.setState({
            numSpaceTypeFilters: numSpaceTypeFilters,
            spaceTypeFilters: filters,
            searchClass: "toolbar-search-button",
            searchVariant: "danger"
        });
    }
    handleMoreFilterChange(moreFilters){

        var numMoreFilters = 0;
        if (moreFilters.minSize !== "") ++numMoreFilters;
        if (moreFilters.maxSize !== "") ++numMoreFilters;
        if (moreFilters.minPrice !== "") ++numMoreFilters;
        if (moreFilters.maxPrice !== "") ++numMoreFilters;

        if (numMoreFilters > 0){
            this.setState({
                numMoreFilters: numMoreFilters,
                moreFilters: moreFilters,
                searchClass: "toolbar-search-button",
                searchVariant: "danger"
            });
        } 
    }
    handleListingTypeChange(e, type){
        e.preventDefault();
        this.setState({
            listingType: type,
            searchClass: "toolbar-search-button",
            searchVariant: "danger"
        });
    }
    handleClearFilters(){
        this.setState({
            numSpaceTypeFilters: 0,
            spaceTypeFilters: [],
            numMoreFilters: 0,
            listingType: listingTypes.BOTH,
            moreFilters: {minSize:"", maxSize:"", minPrice:"", maxPrice:""},
            searchClass: "",
            searchVariant: "warning"
        }, () => {
            this.props.onSearch(this.state);
        });

    }
    handleShowReportView(){
        if (this.props.showReportView){
            this.props.onShowReportView(false);
        } else {
            this.props.onShowReportView(true);
        }
    }
    render(){
        var address = this.state.address;
        var listingMode = this.props.listingMode;
        return (
            <Form className="toolbar-form m-2">
                <Form>
                    <Row>
                    <Col xs="auto">
                        <Dropdown>
                            <Dropdown.Toggle
                                size="sm"
                                variant="secondary"
                            >
                                {this.state.listingType} 
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    as="button"
                                    onClick={(e) => this.handleListingTypeChange(e,listingTypes.FORLEASE)}
                                >{listingTypes.FORLEASE}</Dropdown.Item>
                                <Dropdown.Item
                                    as="button"
                                    onClick={(e) => this.handleListingTypeChange(e,listingTypes.FORSALE)}
                                >{listingTypes.FORSALE}</Dropdown.Item>
                                <Dropdown.Item
                                    as="button"
                                    onClick={(e) => this.handleListingTypeChange(e,listingTypes.BOTH)}
                                >{listingTypes.BOTH}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    { listingMode === "allListings" ?
                    <Col m={this.props.searchMSize} xs={this.props.searchXSSize}>
                        <PlacesAutocomplete
                            value={address}
                            onChange={this.handleSearchChange}
                            onSelect={this.handleSearchSelect}
                        >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <InputGroup>                
                                <Form.Control
                                    size="sm"
                                    onFocus={this.handleSearchFocus}
                                    {...getInputProps({
                                        placeholder: address,
                                    })}
                                />
                            </InputGroup>
                            <InputGroup>
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div></div>}
                                    {suggestions.map((suggestion, index) => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { color: 'white', backgroundColor: '#007bff', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                key={index}
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
                    </Col>
                    : null }
                    { this.props.showSpaceTypeButton ?
                    <Col xs="auto"> 
                        <Dropdown>
                            <Dropdown.Toggle
                                size="sm"
                                variant="secondary" 
                                id="toolbar_dropdown_space_type"
                            >
                                Space Type {this.state.numSpaceTypeFilters ?
                                    <Badge variant="light">{this.state.numSpaceTypeFilters}</Badge>
                                : null}
                                
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                                onFilterChange={(filters) => this.handleFilterChange(filters)} 
                                as={SpaceTypeMenu}
                                spaceTypeFilters={this.state.spaceTypeFilters}
                            />
                        </Dropdown>
                    </Col>
                    : null }
                    { this.props.showMoreFiltersButton ?
                    <Col xs="auto">
                        <Dropdown>
                            <Dropdown.Toggle 
                                size="sm"
                                variant="secondary" 
                                id="toolbar_dropdown_more_filters"
                            >
                                More Filters {this.state.numMoreFilters ?
                                    <Badge variant="light">{this.state.numMoreFilters}</Badge>
                                : null }
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                                onMoreFilterChange={(filters) => this.handleMoreFilterChange(filters)}
                                as={MoreMenu}
                                moreFilters={this.state.moreFilters}
                                className="filter">
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col >
                    : null }
                    { this.props.showClearFiltersButton ?
                    <Col xs="auto">
                        <Button
                            size="sm"
                            onClick={this.handleClearFilters}
                        >Clear Filters</Button>
                    </Col>
                    : null }
                    <Col xs="auto">
                        <Button
                            size="sm"
                            className={this.state.searchClass}
                            variant={this.state.searchVariant}
                            onClick={this.handleSearch}
                        >{this.props.buttonText}</Button>
                    </Col>
                    { this.props.showReportViewButton && !this.props.showReportView ?
                    <Col>
                        <Button
                            variant="warning"
                            size="sm"
                            className="float-right"
                            onClick={this.handleShowReportView}
                        >Open Report Mode</Button>
                    </Col>
                    : null }
                    { this.props.showReportViewButton && this.props.showReportView ?
                    <Col>
                        <Button
                            variant="warning"
                            size="sm"
                            className="float-right"
                            onClick={this.handleShowReportView}
                        >Close Report Mode</Button>
                    </Col>
                    : null }
                </Row>
                </Form>
            </Form>
        );
    }
}
export default ListingToolbar;
