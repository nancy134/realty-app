import React from 'react';
import {
    ListGroup,
    Row, Col,
    Tabs,
    Tab,
    Dropdown,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import {
    faFilePdf
} from '@fortawesome/free-regular-svg-icons';
import ListingPagination from '../components/ListingPagination';
import ListingItem from '../components/ListingItem';

function Toolbar(props){
    return(
    <div className="pt-1">
        <Row>
            <Col>
                <Dropdown>
                    <Dropdown.Toggle
                        size="sm"
                    >
                        Sort: By Date
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                    >
                        <Dropdown.Item>By Date</Dropdown.Item>
                        <Dropdown.Item>By Price</Dropdown.Item>
                        <Dropdown.Item>By Size</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            { (props.listingMode === "myFavorites" && !this.props.reporting) ?
            <Col>
                <Button size="sm">
                    <FontAwesomeIcon icon={faFilePdf} />&nbsp;Report
                </Button>
            </Col>
            : null }
            { (props.listingMode === "myListings") ?
            <Col>
                <Button
                    size="sm"
                    onClick={props.onNewListing}
                 >
                    <FontAwesomeIcon icon={faPlus} />&nbsp;New Listing
                </Button>
            </Col>
            : null }
            <Col>
                <ListingPagination
                    page={props.page}
                    count={props.count}
                    perPage={props.perPage}
                    onNewPage={props.onNewPage}
                />
            </Col>
        </Row>
    </div>
    );
}

class Listings extends React.Component {
   
    constructor(props) {
        super(props);
        this.showDetailChange = this.showDetailChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleListingModeChange = this.handleListingModeChange.bind(this);
        this.handleNewListing = this.handleNewListing.bind(this);
        this.handleSelectFavorite = this.handleSelectFavorite.bind(this);
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    handleDelete(e, id){
        e.stopPropagation();
        this.props.onDelete(id);
    };
    showDetailChange(id, arrayIndex){
        this.props.onShowDetailChange(true, id, arrayIndex);
    }
    handleListingModeChange(listingMode){
        this.props.onListingModeChange(listingMode);
    }
    handleNewListing(){
        this.props.onNewListing();
    }
    handleSelectFavorite(e, id){
        console.log("handleSelectFavorite");
        e.stopPropagation();
    }
    render() {

        if (this.props.listings && this.props.listings.length){
            
        var listings = this.props.listings;

        var showImage = true;
        var showShortDescription = true;

        return (
        <div>
            { this.props.loggedIn ?
            <div id="stickyHeader" className="bg-white">
                <Toolbar
                    page={this.props.page}
                    count={this.props.count}
                    perPage={this.props.perPage}
                    onNewPage={this.props.onNewPage}
                    listingMode={this.props.listingMode}
                    onNewListing={this.handleNewListing}
                />
                <Tab.Container>
                    <Tabs
                        className="listing-tabs pt-1 border-0"
                        id="listing-tabs"
                        activeKey={this.props.listingMode}
                        onSelect={listingMode => this.handleListingModeChange(listingMode)}
                    >
                        <Tab 
                            title="All Listings"
                            eventKey="allListings"
                        >
                            <Tab.Content>
                            </Tab.Content>
                        </Tab>
                        <Tab
                            title="My Listings"
                            eventKey="myListings"
                        >
                            <Tab.Content>
                            </Tab.Content>
                        </Tab>
                        <Tab
                            title="Favorites"
                            eventKey="myFavorites"
                        >
                            <Tab.Content>
                            </Tab.Content>
                        </Tab>
                    </Tabs>
                </Tab.Container>
            </div>
            :
            <Toolbar
                page={this.props.page}
                count={this.props.count}
                perPage={this.props.perPage}
                onNewPage={this.props.onNewPage}
                listingMode={this.props.listingMode}
            />
            }
            <div>
                <ListGroup>
                    {listings.map((listing, index) =>
                    (
                        <ListingItem
                            index={index}
                            key={listing.id}
                            listing={listing}
                            onDelete={this.handleDelete}
                            listingMode={this.props.listingMode}
                            onItemClick={this.showDetailChange}
                            onSelectFavorite={this.handleSelectFavorite}
                            reporting={this.props.reporting}
                            showImage={showImage}
                            showShortDescription={showShortDescription}
                            reportListItems={this.props.reportListItems}
                            onAddToList={this.props.onAddToList}
                        />
                    ))}
                </ListGroup>
            </div>
        </div>

       ); 
       } else {
       return(
       <p>No listings</p>
       );
       }
    }
}
export default Listings;
