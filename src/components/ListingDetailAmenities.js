import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import ListingEditAmenities from './ListingEditAmenities';

function EditButton(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <span>
            <span 
                onClick={() => setModalShow(true)} 
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPencilAlt} />
            </span>
            <ListingEditAmenities
                listing={props.listing}
                allAmenities={props.allAmenities}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSave={listing => props.onSave(listing)}
            />
        </span>
  );
}

class ListingDetailAmenities extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.getListing = this.getListing.bind(this);
    }
    handleSave(listing){
        this.props.onListingUpdate(listing);
    }
    getListing(){
        this.props.getListing();
    }
    render() {
        const editMode = this.props.editMode;
        const listing = this.props.listing;
        return (
        <React.Fragment>
            <Row className="mt-3 border-bottom border-warning">
                <Col><h2>Amenities {editMode === "edit" ? <EditButton listing={listing} onSave={this.handleSave} getListing={this.props.getListing} allAmenities={this.props.allAmenities}/> : null}</h2></Col>
            </Row>
            <ul>
            {listing && listing.amenities ?
             (
             listing.amenities.map(amenity =>
                 <li>{amenity}</li>
             ))
                : <Row></Row> }
            </ul>
        </React.Fragment>
        );
    }
}

export default ListingDetailAmenities;
