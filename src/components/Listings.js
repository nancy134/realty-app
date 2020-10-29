import React from 'react';
import {
    ListGroup,
    Row, Col,
    Card,
    Image,
    Tabs,
    Tab,
    Dropdown,
    Button
} from 'react-bootstrap';
import {getUserEmail} from '../helpers/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faStar as faStarFilled,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import {
    faStar,
    faFilePdf
} from '@fortawesome/free-regular-svg-icons';
import ListingPagination from '../components/ListingPagination';

function getMinSize(array){
    return array.reduce((min, p) => p.size < min ? p.size : min, array[0].size);
}
function getMaxSize(array){
    return array.reduce((max, p) => p.size > max ? p.size : max, array[0].size);
}

function calculatePrice(price,size, priceUnit){
    var calculatedPrice;
    if (priceUnit ===  "/sf/yr"){
        calculatedPrice = price;
    }else if (priceUnit === "/sf/mo"){
        calculatedPrice = price*12;
    }else if (priceUnit === "/mo"){
        calculatedPrice = (price/size)*12;
    }else if (priceUnit === "yr"){
        calculatedPrice = price/size;
    }else{
        calculatedPrice = price;
    }
    return calculatedPrice;
}

function getMinPriceIndex(array){
    var length = array.length;
    var minIndex = 0;
    var minPrice = calculatePrice(
        array[0].price,
        array[0].size,
        array[0].priceUnit); 
    for (var i=1; i<length; i++){
       var calculatedPrice = calculatePrice(
           array[i].price,
           array[i].size,
           array[i].priceUnit
       );
       if (calculatedPrice < minPrice) minIndex = i; 
    }
    return minIndex;
}

function getMaxPriceIndex(array){
    var length = array.length;
    var maxIndex = 0;
    var maxPrice = calculatePrice(
        array[0].price,
        array[0].size,
        array[0].priceUnit);
    for (var i=1; i<length; i++){
       var calculatedPrice = calculatePrice(
           array[i].price,
           array[i].size,
           array[i].priceUnit
       );
       if (calculatedPrice > maxPrice) maxIndex = i;
    }
    return maxIndex;
}

function ListItem(props){
    var listing = props.listing;
    var publishStatus = listing.publishStatus;
    if (publishStatus === "Draft") {
        if (listing.listing.latestApprovedId === null){
            publishStatus = "Unpublished";
        } else {
            publishStatus = "Live with unpublished updates";
        } 
    }

    var address = "No address entered";
    if (listing.address !== null){
        address = listing.address;
    }
    if (listing.displayAddress !== null && listing.displayAddress !== ""){
        address = listing.displayAddress;
    }
    var size = null;
    var price = null;
    if (listing.spaces.length === 1){
        size = listing.spaces[0].size;

        var priceUnit = listing.spaces[0].priceUnit;
        if (!priceUnit) priceUnit = "/sf/yr";
        price = listing.spaces[0].price + " " + priceUnit;
        
    } else if (listing.spaces.length > 1){
        var minSize = getMinSize(listing.spaces);
        var maxSize = getMaxSize(listing.spaces);
        if (minSize === maxSize){
            size = minSize;
        } else {
            size = minSize+" - "+maxSize;
        }

        var minPriceIndex = getMinPriceIndex(listing.spaces);
        var maxPriceIndex = getMaxPriceIndex(listing.spaces);
        
        if (minPriceIndex === maxPriceIndex){
            var minPrice =  listing.spaces[minPriceIndex].price;
            priceUnit = listing.spaces[minPriceIndex].priceUnit ?  listing.spaces[minPriceIndex].priceUnit : "/sf/yr";
            price = minPrice + " " + priceUnit;
        } else {

            minPrice = listing.spaces[minPriceIndex].price;
            var maxPrice = listing.spaces[maxPriceIndex].price;
            var minPriceUnit = listing.spaces[minPriceIndex].priceUnit;
            var maxPriceUnit = listing.spaces[maxPriceIndex].priceUnit;

            if (minPriceUnit === null) minPriceUnit = "/sf/yr";
            if (maxPriceUnit === null) maxPriceUnit = "/sf/yr";

            if (minPriceUnit === maxPriceUnit){
                price = minPrice + " - " + maxPrice + " " + minPriceUnit;
            } else {
                price = minPrice + " " + minPriceUnit + " - " +
                    maxPrice + " " + maxPriceUnit;
            }
        }
    }
    // Listing Price
    var floatPrice = parseFloat(listing.listingPrice);
    var listingPrice = floatPrice.toLocaleString(undefined, {maximumFractionDigits:0});
    return(
        <ListGroup.Item 
            className="border p-1 addPointer list-item" 
            onClick={() => props.onItemClick(listing.id, props.index)}
        >
            <Row>
                <Col xs={4}>
                    { listing.images.length > 0 ?
                    <Image 
                        src={listing.images[0].url} 
                        className="border-0 list-image" 
                        thumbnail
                    />
                    :
                    <Image 
                        src="/default.jpg" 
                        className="border-0 list-image" 
                        thumbnail 
                    />
                    }
                </Col>
                <Col xs={8}>
                    <Card className="border-0">
                        <Card.Body className="p-1">
                            <Card.Title 
                                id="listing_title"
                                className="listing-title text-danger"  
                            >
                                <span>{address}</span>
                                { listing.owner === getUserEmail() && props.listingMode === "myListings" ?
                                <span 
                                    data-id={listing.ListingId} 
                                    onClick={(e) => props.onDelete(e, listing.ListingId)}
                                    className="float-right"
                                >
                                    <FontAwesomeIcon className="text-danger" size="xs" icon={faTrash} />
                                </span>
                                : null }
                                { props.listingMode === "allListings" ?
                                <span
                                    data-id={listing.ListingId}
                                    onClick={(e) => props.handleSelectFavorite(e, listing.ListingId)}
                                    className="float-right"
                                >
                                    <FontAwesomeIcon className="text-danger" size="xs" icon={faStar} />
                                </span>
                                : null }
                                { props.listingMode === "myFavorites" ?
                                <span
                                    data-id={listing.ListingId}
                                    onClick={(e) => props.handleSelectFavorite(e, listing.ListingId)}
                                    className="float-right"
                                >
                                    <FontAwesomeIcon className="text-danger" size="xs" icon={faStarFilled} />
                                </span>
                                : null }
                               
                            </Card.Title>
                            
                            { listing.city ?
                            <Card.Subtitle>
                                {listing.city}, {listing.state} {listing.zip}
                            </Card.Subtitle>
                            : null }
                            { listing.owner === getUserEmail() ?
                            <div 
                                className="text-danger"
                            >
                                Status: {publishStatus}
                            </div>
                            : null}
                            {listing.yearBuilt ?
                            <div>Built in {listing.yearBuilt}</div>
                            : null}
                            { listing.spaces.length === 1 ?
                            <div>{size} sf Space</div>
                            : null}
                            { listing.spaces.length > 1 ?
                            <div>{size} sf ({listing.spaces.length} spaces)</div>
                            : null}
                            { listing.spaces.length > 0 ?
                            <div>${price}</div>
                            : null }
                            { listing.listingType === "For Sale" && listing.listingPrice?
                            <div>For Sale ${listingPrice}</div>
                            : null }
                            <div>{listing.shortDescription}</div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

function Toolbar(props){
    return(
    <div>
        <Row>
            <Col>
                <Dropdown>
                    <Dropdown.Toggle
                        variant="warning"
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
            { (props.listingMode === "myFavorites") ?
            <Col>
                <Button size="sm" variant="warning">
                    <FontAwesomeIcon icon={faFilePdf} />&nbsp;Report
                </Button>
            </Col>
            : null }
            { (props.listingMode === "myListings") ?
            <Col>
                <Button
                    size="sm"
                    variant="warning"
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
    render() {

        if (this.props.listings && this.props.listings.length){
            
        var listings = this.props.listings;
        return (
        <div>
            { this.props.loggedIn ?
            <div id="stickyHeader" className="bg-white">
            <Tab.Container>
            <Tabs
                variant="pills"
                className="listing-tabs pt-1 pb-1 border-0"
                id="listing-tabs"
                activeKey={this.props.listingMode}
                onSelect={listingMode => this.handleListingModeChange(listingMode)}
            >
                <Tab 
                    title="All Listings"
                    eventKey="allListings"
                >
                    <Tab.Content className="border">
                        <Toolbar
                            page={this.props.page}
                            count={this.props.count}
                            perPage={this.props.perPage}
                            onNewPage={this.props.onNewPage}
                            listingMode={this.props.listingMode}
                        />
                    </Tab.Content>
                </Tab>
                <Tab
                    title="My Listings"
                    eventKey="myListings"
                >
                    <Tab.Content className="border">
                        <Toolbar
                            page={this.props.page}
                            count={this.props.count}
                            perPage={this.props.perPage}
                            onNewPage={this.props.onNewPage}
                            listingMode={this.props.listingMode}
                            onNewListing={this.handleNewListing}
                        />
                    </Tab.Content>
                </Tab>
                <Tab
                    title="Favorites"
                    eventKey="myFavorites"
                >
                    <Tab.Content className="border">
                        <Toolbar
                            page={this.props.page}
                            count={this.props.count}
                            perPage={this.props.perPage}
                            onNewPage={this.props.onNewPage}
                            listingMode={this.props.listingMode}
                        />
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
                        <ListItem
                            index={index}
                            key={listing.id}
                            listing={listing}
                            onDelete={this.handleDelete}
                            listingMode={this.props.listingMode}
                            onItemClick={this.showDetailChange}
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
