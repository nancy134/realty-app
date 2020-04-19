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
  ({ style, className, 'aria-labelledby': labeledBy }, ref) => {

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
      <Form>
          <Form.Group as={Row} className="mr-1 ml-1">
              <Form.Label column sm="4">Available Space</Form.Label>
              <Col sm="4">
                  <Form.Control placeholder="Min"/>
              </Col>
              <Col sm="4">
                  <Form.Control placeholder="Max"/>
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mr-1 ml-1">
              <Form.Label column sm="4">Lease Rate</Form.Label>
              <Col sm="4">
                  <Form.Control placeholder="Min"/>
              </Col>
              <Col sm="4">
                  <Form.Control placeholder="Max"/>
              </Col>
          </Form.Group>
          <Form.Group as={Row} className="mr-1 ml-1">
              <Form.Label column sm="4">Listing Type</Form.Label>
              <Col sm="4">
                  <Form.Control as="select">
                      <option>All</option>
                      <option>For Lease</option>
                      <option>For Sale</option>
                  </Form.Control>
              </Col>
          </Form.Group>
      </Form>
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

                            <Dropdown.Menu onFilterChange={(filters) => this.handleFilterChange(filters)} as={SpaceTypeMenu}$>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={1}>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                More Filters
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu} className="filter">
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
