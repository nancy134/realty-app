import React from 'react';
import {
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
        this.state = {
            listingType: listingTypes.BOTH,
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

    handleFilterChange(filters){
        this.setState({
            numSpaceTypeFilters: filters.length,
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
            searchClass: "toolbar-search-button",
            searchVariant: "danger"
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
        return (
            <Form className="toolbar-form m-2">
                <Form.Row>
                    <Col xs="auto">
                        <Dropdown>
                            <Dropdown.Toggle
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

                    <Col xs={3}>
                        <PlacesAutocomplete
                            value={address}
                            onChange={this.handleSearchChange}
                            onSelect={this.handleSearchSelect}
                        >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <InputGroup>                
                                <Form.Control
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
                    <Col xs="auto"> 
                        <Dropdown>
                            <Dropdown.Toggle 
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
                    <Col xs="auto">
                        <Dropdown>
                            <Dropdown.Toggle 
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
                    <Col xs="auto">
                        <Button
                            onClick={this.handleClearFilters}
                        >Clear Filters</Button>
                    </Col>
                    <Col xs="auto">
                        <Button
                            className={this.state.searchClass}
                            variant={this.state.searchVariant}
                            onClick={this.handleSearch}
                        >Search</Button>
                    </Col>
                    { this.props.loggedIn && !this.props.showReportView ?
                    <Col>
                        <Button
                            variant="warning"
                            className="float-right"
                            onClick={this.handleShowReportView}
                        >Show Report View</Button>
                    </Col>
                    : null }
                    { this.props.loggedIn && this.props.showReportView ?
                    <Col>
                        <Button
                            variant="warning"
                            className="float-right"
                            onClick={this.handleShowReportView}
                        >Hide Report View</Button>
                    </Col>
                    : null }
                </Form.Row>
            </Form>
        );
    }
}
export default ListingToolbar;
