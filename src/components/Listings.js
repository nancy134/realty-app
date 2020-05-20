import React from 'react';
import {
    ListGroup,
    Row, Col,
    Card,
    Image
} from 'react-bootstrap';
import {getUserEmail} from '../helpers/authentication';

function ListItem(props){
    var listing = props.listing;
    var publishStatus = listing.publishStatus;
    if (publishStatus === "Draft") {
        if (listing.listing.latestApprovedId === null){
            publishStatus = "Unpublished";
        } else {
            publishStatus = "Unpublished update";
        } 
    }

    var address = "No address entered";
    if (listing.address !== null){
        address = listing.address;
    }
    return(
        <ListGroup.Item>
            <Row>
                <Col>
                    { listing.images.length > 0 ?
                    <Image 
                        src={listing.images[0].url} 
                        className="border-0" 
                        thumbnail
                    />
                    :
                    <Image 
                        src="/default.jpg" 
                        className="border-0" 
                        thumbnail 
                    />
                    }
                </Col>
                <Col>
                    <Card className="border-0">
                        <Card.Body >
                            <Card.Title 
                                id="listing_title"
                                className="listing-title text-danger"  
                                data-index={listing.id} 
                                onClick={props.onShowDetailChange}
                            >
                                {address}
                            </Card.Title>
                            
                            { listing.city ?
                            <Card.Subtitle>
                                {listing.city}, {listing.state}
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
                            { listing.spaces.length > 0 ?
                            <div>{listing.spaces[0].size} sf Space</div>
                            : null}
                            { listing.spaces.length > 0 ?
                            <div>${listing.spaces[0].price} sf/yr</div>
                            : null }
                            { listing.listingType === "For Sale" && listing.listingPrice?
                            <div>${listing.listingPrice}</div>
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
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }


    showDetailChange(e){
        this.props.onShowDetailChange(true, e.target.dataset.index);
    }
 
    render() {

        if (this.props.listings && this.props.listings.length){
            
        var listings = this.props.listings;
        return ( 
            <ListGroup>
                {listings.map((index, listing) => 
                (
                <ListItem
                    index={index}
                    key={listing.id}
                    listing={listing} 
                    onShowDetailChange={this.showDetailChange}
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
