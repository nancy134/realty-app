import React from 'react';
import {
    ListGroup,
    Navbar,
    Nav
} from 'react-bootstrap';

const Strings = {};
Strings.orEmpty = function( entity ) {
    return entity || "";
};

function ListingItem(props){
   var f = props.listing.StandardFields;
   var address = Strings.orEmpty(f.StreetNumber) + " " +
                 Strings.orEmpty(f.StreetDirPrefix) + " " +
                 Strings.orEmpty(f.StreetName) + " " +
                 Strings.orEmpty(f.StreetSuffix) + " "  +
                 Strings.orEmpty(f.StreetDirSuffix) + " " +
                 Strings.orEmpty(f.StreetAdditionalInfo);
   var city = f.City + ", " + f.StateOrProvince;

   return(
   <ListGroup.Item
   >
       <span>{address}</span><br/>
       <span>{city}</span>
   </ListGroup.Item>
   );
}

class SparkListings extends React.Component{
    render(){
        var listings = null;
        if (this.props.sparkListings){
            listings = this.props.sparkListings.D.Results;
        }
        if (listings){
        return(
        <React.Fragment>
            <div className="spark-listings pr-1">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Listings</Navbar.Brand>
                <Nav.Link>Add</Nav.Link>
            </Navbar>
            <ListGroup>
                {listings.map((listing, index) =>
                (
                    <ListingItem
                        index={index}
                        key={index}
                        listing={listing}
                    />
                ))}
            </ListGroup>
            </div>
        </React.Fragment>
        );
       } else {
           return(<div>loading...</div>);
       }
    }
}

export default SparkListings;
