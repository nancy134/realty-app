import React from 'react';
import {
    Form,
    Row,Col,
    Button,
    Dropdown,
    ToggleButtonGroup,
    ToggleButton
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

    handleListingToggle(value){
        this.props.onListingToggle(value);
    }

    handleFilterChange(filters){
        this.props.onFilterChange(filters);
    }
    handleMoreFilterChange(moreFilters){
        console.log("moreFilters: "+JSON.stringify(moreFilters));
        this.props.onMoreFilterChange(moreFilters);
    }
    render(){
        var myListings = "myListings";
        var allListings = "allListings";

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
                        <ToggleButtonGroup type="radio" name="options" defaultValue={allListings} onChange={this.handleListingToggle}>
                            <ToggleButton value={allListings}>Public Listings</ToggleButton>
                            <ToggleButton value={myListings}>My Listings</ToggleButton>
                        </ToggleButtonGroup>
                        : null }
                    </Col>
                    <Col xs={4} className="text-right">
                        { this.props.loggedIn ?
                        <Button onClick={this.onAddListing} variant="light">Add a Listing</Button>
                        : null }
                    </Col>

                </Form.Row>
            </Form>
        );
    }
}
export default ListingToolbar;
