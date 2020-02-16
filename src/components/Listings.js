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
        this.state = {
            listings: [],
            listingMode: this.props.listingMode
        };
    }
    componentDidMount() {
        this.fetchListings();
    }
    componentWillUnmount() {
    }
    shouldComponentUpdate(){
        return true;
    }
    componentDidUpdate(prevProps){
        if (prevProps.listingMode !== this.props.listingMode){
            this.setState({listingMode: this.props.listingMode});
            this.fetchListings();
        } 
    }

    fetchListings(){
        var url = "";
        if (this.props.listingMode === "myListings" ){
           url = process.env.REACT_APP_LISTING_SERVICE+'listings?perPage=5&page=1&owner='+getUserEmail();
        } else {
           url = process.env.REACT_APP_LISTING_SERVICE+'listings?perPage=5&page=1';
        }
        fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ listings: data.listings.rows })
        })
        .catch(console.log)

    }

    showDetailChange(e){
        this.props.onShowDetailChange(true, e.target.dataset.index);
    }
 
    render() {
        return ( 
            <ListGroup>
                {this.state.listings.map(listing => 
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
                                    <div className="text-danger">(My listing)</div>
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
    }
}
export default Listings;
