import React from 'react';
import {
    Form,
    Row,Col,
    Button,
    Dropdown,
    ButtonGroup,
    InputGroup
} from 'react-bootstrap';
import FilterSpaceType from "./FilterSpaceType";
import FilterMore from "./FilterMore";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress
} from 'react-places-autocomplete';

const SpaceTypeMenu = React.forwardRef(
    ({style, className, 'aria-labelledby': labeledBy , onFilterChange}, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
          <FilterSpaceType onFilterChange={(filters) => onFilterChange(filters)}/>
      </div>
    );
    }
);

const CustomMenu = React.forwardRef(
  ({ style, className, 'aria-labelledby': labeledBy, onMoreFilterChange }, ref) => {

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
          <FilterMore onMoreFilterChange={(filters) => onMoreFilterChange(filters)}/>
      </div>
    );
  },
);

class ListingToolbar extends React.Component {
    constructor(props){
        super(props);
        this.onAddListing = this.onAddListing.bind(this);
        this.handleListingToggle = this.handleListingToggle.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleMoreFilterChange = this.handleMoreFilterChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.state = {
            address: this.props.formatted_address 
        };
    }
    handleSearchChange = address => {
        this.setState({address});
    };
    handleSearchSelect = address => {
        console.log('address: '+address);

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
    handleSearch(){
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
    onAddListing(e){
        this.props.onAddListing();
    }

    handleListingToggle(e){
        e.preventDefault();
        this.props.onListingToggle(e.target.value);
    }

    handleFilterChange(filters){
        this.props.onFilterChange(filters);
    }
    handleMoreFilterChange(moreFilters){
        console.log("moreFilters: "+JSON.stringify(moreFilters));
        this.props.onMoreFilterChange(moreFilters);
    }
    render(){
        var allListingsStatus = "p-1";
        var myListingsStatus = "p-1";
        if (this.props.listingMode === "allListings") allListingsStatus = "active p-1";
        if (this.props.listingMode === "myListings") myListingsStatus = "active p-1"
        var address = this.state.address;
        return (
            <Form className="toolbar-form m-2">
                <Form.Row>
                    <Col xs={4}>
                        <Row>
                            <Col xs={8}>
                                <PlacesAutocomplete
                                    value={address}
                                    onChange={this.handleSearchChange}
                                    onSelect={this.handleSearchSelect}
                                >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <InputGroup>                
                                        <Form.Control
                                            {...getInputProps({
                                                placeholder: address,
                                            })}
                                        />
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
                            </Col>
                            <Col xs={2} className="pl-0">
                                <Button
                                    variant="light"
                                    onClick={this.handleSearch}
                                >
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={1}>
                        <Dropdown>
                            <Dropdown.Toggle 
                                variant="secondary" 
                                id="toolbar_dropdown_space_type"
                            >
                                Space Type 
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                                onFilterChange={(filters) => this.handleFilterChange(filters)} 
                                as={SpaceTypeMenu}
                            />
                        </Dropdown>
                    </Col>
                    <Col xs={1}>
                        <Dropdown>
                            <Dropdown.Toggle 
                                variant="secondary" 
                                id="toolbar_dropdown_more_filters"
                            >
                                More Filters
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                                onMoreFilterChange={(filters) => this.handleMoreFilterChange(filters)} 
                                as={CustomMenu} 
                                className="filter">
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col >
                    <Col xs={4} className="text-right">
                       { this.props.loggedIn ?
                       <ButtonGroup className="border">
                           <Button
                               id="toolbar_all_listings"
                               type="radio"
                               value="allListings"
                               onClick={this.handleListingToggle}
                               className={allListingsStatus}
                               variant="light"
                           >
                               All Listings
                           </Button>
                           <Button
                               id="toolbar_my_listings"
                               type="radio"
                               value="myListings"
                               onClick={this.handleListingToggle}
                               className={myListingsStatus}
                               variant="light"
                           >
                               MyListings 
                           </Button>
                       </ButtonGroup>
                       : null }
                    </Col>
                    <Col xs={2} className="text-right">
                        { this.props.loggedIn ?
                        <Button 
                            id="add_a_listing_button"
                            onClick={this.onAddListing} 
                            variant="light"
                        >
                            Add a Listing
                        </Button>
                        : null }
                    </Col>

                </Form.Row>
            </Form>
        );
    }
}
export default ListingToolbar;
