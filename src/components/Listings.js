import React from 'react';
import {
    ListGroup,
    Row, Col,
    Card,
    Image
} from 'react-bootstrap';
import {getUserEmail} from '../helpers/authentication';

class Listings extends React.Component {
   
    constructor(props) {
        super(props);
        this.showDetailChange = this.showDetailChange.bind(this);
        //this.state = {
        //    listingMode: this.props.listingMode
        //};
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }


    showDetailChange(e){
        this.props.onShowDetailChange(true, e.target.dataset.index);
    }
 
    render() {

        console.log("this.props.listings: "+JSON.stringify(this.props.listings));
        console.log("this.props.listingMode: "+this.props.listingMode);
        if (this.props.listings && this.props.listings.length){
 console.log("this.props.listings.length: "+this.props.listings.length);

        var listings = [];
        for (var i=0; i<this.props.listings.length; i++){
            console.log("i: "+i);
            if (this.props.listingMode === "allListings"){
                console.log("this.props.listings[i].latestApprovedId; "+this.props.listings[i].latestApprovedId);
               if (this.props.listings[i].latestApprovedId){
                   listings.push(this.props.listings[i].latestApprovedVersion);
               }
            } else if (this.props.listingMode === "myListings"){
               if (this.props.listings[i].latestDraftId){
                   listings.push(this.props.listings[i].latestDraftVersion);
               } else if  (this.props.listings.listing[i].latestApprovedId){
                    listings.push(this.props.listings[i].latestApprovedVersion);
               }

            }
        }
        console.log("listings: "+JSON.stringify(listings));
        return ( 
            <ListGroup>
                {listings.map(listing => 
                (
                <ListGroup.Item key={listing.id}>
                    <Row>
                        <Col>
                            { listing.images.length > 0 ?
                            <Image src={listing.images[0].url} className="border-0" thumbnail/>
                            :
                            <Image src="/default.jpg" className="border-0" thumbnail />
                            }
                        </Col>
                        <Col>
                            <Card className="border-0">
                                <Card.Body >
                                    <Card.Title className="listing-title text-danger"  data-index={listing.id} onClick={this.showDetailChange}>{listing.address}</Card.Title>
                                    <Card.Subtitle>{listing.city}, {listing.state}</Card.Subtitle>
                                    { listing.owner === getUserEmail() ?
                                    <div>
                                    <div className="text-danger">Status: {listing.publishStatus}</div>
                                    </div>
                                    : null}
                                    <div>Built in {listing.yearBuilt}</div>
                                    { listing.spaces.length > 0 ?
                                    <div>{listing.spaces[0].size} sf Space</div>
                                    : null}
                                    { listing.spaces.length > 0 ?
                                    <div>${listing.spaces[0].price} sf/yr</div>
                                    : null }
                                    { listing.listingType === "For Sale" ?
                                    <div>${listing.listingPrice}</div>
                                    : null }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </ListGroup.Item>

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
