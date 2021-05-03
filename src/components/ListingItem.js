import React from 'react';
import {
    ListGroup,
    Row,
    Col,
    Card,
    Image
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faStar as faStarFilled,
    faArrowRight,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import {
    faStar
} from '@fortawesome/free-regular-svg-icons';
import authenticationService from '../helpers/authentication';
import {listingTypes} from '../constants/listingTypes';
import {formatSizeAndPrice} from '../helpers/utilities';

class ListingItem extends React.Component {

    render(){
    var listing = this.props.listing;
    var publishStatus = listing.publishStatus;
    if (publishStatus === "Draft" && listing.listing) {
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
    var sizeAndPrice = formatSizeAndPrice(listing.spaces);
    if (sizeAndPrice){
        size = sizeAndPrice.size;
        price = sizeAndPrice.price;
    }

    // Listing Price
    var floatPrice = parseFloat(listing.listingPrice);
    var listingPrice = floatPrice.toLocaleString(undefined, {maximumFractionDigits:0});

    // Reports
    var hideRightArrow = false;
    if (this.props.reportListItems){
        var reportListItems = this.props.reportListItems;
        for (var i=0; i<reportListItems.length; i++){
            if (listing.ListingId === reportListItems[i].ListingId){
                hideRightArrow = true;
                break;
            }
        }
    }

    var contentColSize = 8;
    if (!this.props.showImage){
        contentColSize = 12;
    }

    var showFavorites = false;
    return(
        <ListGroup.Item 
            className="border p-1 addPointer list-item" 
            onClick={() => this.props.onItemClick(listing.id, listing.publishStatus)}
        >
            <Row>
                {this.props.showImage ?
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
                : null}
                <Col xs={contentColSize}>
                    <Card className="border-0">
                        <Card.Body className="p-1">
                            <Card.Title 
                                id="listing_title"
                                className="listing-title text-danger"  
                            >
                                <span>{address}</span>
                                { listing.owner === authenticationService.getUserEmail() && this.props.listingMode === "myListings" && !this.props.reporting ?
                                <span 
                                    data-id={listing.ListingId} 
                                    onClick={(e) => this.props.onDelete(e, listing.ListingId)}
                                    className="float-right"
                                >
                                    <FontAwesomeIcon className="text-danger" size="xs" icon={faTrash} />
                                </span>
                                : null }
                                { showFavorites && this.props.listingMode === "allListings" && !this.props.reporting ?
                                <span
                                    data-id={listing.ListingId}
                                    onClick={(e) => this.props.onSelectFavorite(e, listing.ListingId)}
                                    className="float-right"
                                >
                                    <FontAwesomeIcon className="text-danger" size="xs" icon={faStar} />
                                </span>
                                : null }
                                { this.props.listingMode === "myFavorites" && !this.props.reporting ?
                                <span
                                    data-id={listing.ListingId}
                                    onClick={(e) => this.props.onSelectFavorite(e, listing.ListingId)}
                                    className="float-right"
                                >
                                    <FontAwesomeIcon className="text-danger" size="xs" icon={faStarFilled} />
                                </span>
                                : null }
                                { this.props.reporting && !hideRightArrow ?
                                <span
                                    data-id={listing.ListingId}
                                    onClick={(e) => this.props.onAddToList(e, listing.ListingId)}
                                    className="float-right"
                                >
                                    <FontAwesomeIcon className="text-danger" icon={faArrowRight} />
                                </span>

                                : null }
                               { this.props.showDeleteFromList ?
                                <span
                                    data-id={listing.ListingId}
                                    onClick={(e) => this.props.onDeleteFromList(e, listing.ListingId)}
                                    className="float-right"
                                >
                                    <FontAwesomeIcon className="text-danger" size="sm" icon={faArrowLeft} />
                                </span>

                                : null }
                               
                            </Card.Title>
                            
                            { listing.city ?
                            <Card.Subtitle>
                                {listing.city}, {listing.state} {listing.zip}
                            </Card.Subtitle>
                            : null }
                            { listing.owner === authenticationService.getUserEmail() ?
                            <div 
                                className="text-danger"
                            >
                                Status: {publishStatus}
                            </div>
                            : null }
                            <div>{size}</div>
                            <div>{price}</div>
                            { listing.listingType === listingTypes.FORSALE && listing.listingPrice?
                            <div>For Sale ${listingPrice}</div>
                            : null }
                            { this.props.showShortDescription ?
                            <div>{listing.shortDescription}</div>
                            : null }
                            { this.props.listingMode === "myListings" ?
                            <div>Status: {listing.publishStatus}</div> 
                            : null }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </ListGroup.Item>
    );

    }
}

export default ListingItem;
