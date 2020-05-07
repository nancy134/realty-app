import React from 'react';
import {
    Form,
    Row,Col,
    Button,
    Dropdown,
    ButtonGroup
} from 'react-bootstrap';
import FilterSpaceType from "./FilterSpaceType";
import FilterMore from "./FilterMore";

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

        return (
            <Form className="toolbar-form m-2">
                <Form.Row>
                    <Col xs={4}>
                        <Row>
                            <Col xs={8}>
                                <Form.Control placeholder="Waltham, MA" />
                            </Col>
                            <Col xs={2} className="pl-0">
                                <Button variant="light">Search</Button>
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
                               Public Listings
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
