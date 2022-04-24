import React from 'react';
import {
    ListGroup,
    Row, Col,
    Tabs,
    Tab,
    Dropdown,
    Button,
    Alert
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFilePdf
} from '@fortawesome/free-regular-svg-icons';
import ListingPagination from '../components/ListingPagination';
import ListingItem from '../components/ListingItem';

function Toolbar(props){
    var show = false;
    return(
    <div className="pt-1">
        <Row>
            { show ?
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
            : null }
            { (props.listingMode === "myFavorites" && !this.props.reporting) ?
            <Col>
                <Button size="sm">
                    <FontAwesomeIcon icon={faFilePdf} />&nbsp;Report
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
    showDetailChange(id, publishStatus){
        this.props.onShowDetailChange(true, id, publishStatus);
    }
    handleListingModeChange(listingMode){
        this.props.onListingModeChange(listingMode);
    }
    handleNewListing(){
        this.props.onNewListing();
    }
    handleSelectFavorite(e, id){
        e.stopPropagation();
    }
    render() {
    
        var listings = [];
        if (this.props.listings){
            listings = this.props.listings;
        }
        var myListings = [];
        if (this.props.myListings){
            myListings = this.props.myListings;
        }
        var showImage = true;
        var showShortDescription = true;
        var showFavorites = false;

        var count = this.props.count;
        var perPage = this.props.perPage;
        var page = this.props.page;

        if (this.props.listingMode === "myListings"){
           count = this.props.myCount;
           perPage = this.props.perPage;
           page = this.props.page;
        }
        return (
        <div>
            { this.props.loggedIn && this.props.listingMode !== "embedListings" ?
            <div id="stickyHeader" className="bg-white">
                <Toolbar
                    page={page}
                    count={count}
                    perPage={perPage}
                    loggedIn={this.props.loggedIn}
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
                        { showFavorites ?
                        <Tab
                            title="Favorites"
                            eventKey="myFavorites"
                        >
                            <Tab.Content>
                            </Tab.Content>
                        </Tab>
                        : null }
                    </Tabs>
                </Tab.Container>
            </div>
            :
            <Toolbar
                page={page}
                count={count}
                perPage={perPage}
                onNewPage={this.props.onNewPage}
                listingMode={this.props.listingMode}
                onNewListing={this.handleNewListing}
            />
            }
            <div>
                {this.props.listingMode === "allListings" && listings.length > 0 ?
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
                : null}
                {(this.props.listingMode === "myListings" || this.props.listingMode === "embedListings") && myListings.length > 0 ?
                <ListGroup>
                    {this.props.myListings.map((listing, index) =>
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
                :null}

                {(this.props.listingMode === "allListings" && listings.length === 0) ||
                 (this.props.listingMode === "myListings" && myListings.length === 0) ?
                     <Alert variant="info">No listings found</Alert>
                : null}
            </div>
        </div>

       ); 
    }
}
export default Listings;
