import React from 'react';
import {
    ListGroup,
    Row, Col,
    Card,
    Image
} from 'react-bootstrap';

class Listings extends React.Component {
   
    constructor(props) {
        super(props);
        this.showDetailChange = this.showDetailChange.bind(this);
        this.state = {
            listings: [],
            editMode: this.props.editMode
        };
    }
    componentDidMount() {
        var url = "";
        if (this.state.editMode === true ){
           url = process.env.REACT_APP_LISTING_SERVICE+'listings?perPage=4&page=1&owner=loggedIn';
        } else {
           url = process.env.REACT_APP_LISTING_SERVICE+'listings?perPage=4&page=1'; 
        }
        fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ listings: data.listings.rows })
        })
        .catch(console.log)
    }
    componentWillUnmount() {
    }
    shouldComponentUpdate(){
        return true;
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
                            <Image src={listing.images[0].url} className="border-0" thumbnail/>
                        </Col>
                        <Col>
                            <Card className="border-0">
                                <Card.Body >
                                    <Card.Title className="listing-title text-danger"  data-index={listing.id} onClick={this.showDetailChange}>{listing.address}</Card.Title>
                                    <Card.Subtitle>{listing.city}, {listing.state}</Card.Subtitle>
                                    <div>Built in {listing.yearBuilt}</div>
                                    <div>{listing.spaces[0].size} sf Space</div>
                                    <div>${listing.spaces[0].price} sf/yr</div>
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
