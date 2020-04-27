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
        console.log("handleListingToggle: "+e.target.value);
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
        var allListingsStatus = "p-0";
        var myListingsStatus = "p-0";
        if (this.props.listingMode === "allListings") allListingsStatus = "active p-0";
        if (this.props.listingMode === "myListings") myListingsStatus = "active p-0"

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
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                Space Type 
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                                onFilterChange={(filters) => this.handleFilterChange(filters)} 
                                as={SpaceTypeMenu}>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={1}>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                More Filters
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                                onMoreFilterChange={(filters) => this.handleMoreFilterChange(filters)} 
                                as={CustomMenu} 
                                className="filter">
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col >
                    <Col xs={2} >
                       { this.props.loggedIn ?
                       <ButtonGroup className="border">
                           <Button
                               type="radio"
                               value="allListings"
                               onClick={this.handleListingToggle}
                               className={allListingsStatus}
                               variant="info">
                               Public Listings
                           </Button>
                           <Button
                               type="radio"
                               value="myListings"
                               onClick={this.handleListingToggle}
                               className={myListingsStatus}
                               variant="info">
                               MyListings 
                           </Button>
                       </ButtonGroup>
                       : null }
                    </Col>
                    <Col xs={4} className="text-right">
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
