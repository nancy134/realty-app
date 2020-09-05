import React from 'react';
import {
    ListGroup,
    Row, Col,
    Card,
    Image
} from 'react-bootstrap';
import {getUserEmail} from '../helpers/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash
} from '@fortawesome/free-solid-svg-icons';

function getMinSize(array){
    return array.reduce((min, p) => p.size < min ? p.size : min, array[0].size);
}
function getMaxSize(array){
    return array.reduce((max, p) => p.size > max ? p.size : max, array[0].size);
}
function getMinPrice(array){
    return array.reduce((min, p) => p.price < min ? p.price : min, array[0].price);
}
function getMaxPrice(array){
    return array.reduce((max, p) => p.price > max ? p.price : max, array[0].price);
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
        price = listing.spaces[0].price;
    } else if (listing.spaces.length > 1){
        var minSize = getMinSize(listing.spaces);
        var maxSize = getMaxSize(listing.spaces);
        if (minSize === maxSize){
            size = minSize;
        } else {
            size = minSize+" - "+maxSize;
        }

        var minPrice = getMinPrice(listing.spaces);
        var maxPrice = getMaxPrice(listing.spaces);
        if (minPrice === maxPrice){
            price = minPrice;
        } else {
            price = minPrice+" - "+maxPrice;
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
                            <div>${price} sf/yr</div>
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

class Listings extends React.Component {
   
    constructor(props) {
        super(props);
        this.showDetailChange = this.showDetailChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
 
    render() {

        if (this.props.listings && this.props.listings.length){
            
        var listings = this.props.listings;
        return ( 
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

       ); 
       } else {
       return(
       <p>No listings</p>
       );
       }
    }
}
export default Listings;
