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

    return (
        <span>
            <span 
                onClick={() => {props.onShow()}}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPencilAlt} />
            </span>
            { props.show ?
            <ListingEditAmenities
                listing={props.listing}
                allAmenities={props.allAmenities}
                show={props.show}
                onHide={props.onHide}
                onSave={listing => props.onSave(listing)}
                errorMessage={props.errorMessage}
                saving={props.saving}
            />
            : null}
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
        this.props.onAmenityUpdate(listing);
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
                <Col>
                    <h2>Amenities {editMode === "edit" ? 
                        <EditButton
                            listing={listing}
                            getListing={this.props.getListing}
                            allAmenities={this.props.allAmenities}
                            onSave={this.handleSave}
                            onShow={this.props.onAmenityModalUpdate}
                            onHide={this.props.onAmenityModalHide}
                            show={this.props.amenityUpdate}
                            saving={this.props.amenitySaving}
                            errorMessage={this.props.amenityError}
                        /> 
                        : null}
                    </h2>
                </Col>
            </Row>
            <ul>
            {listing && listing.amenities ?
             (
             listing.amenities.map((amenity, index) =>
                 <li key={index}>{amenity}</li>
             ))
                : <Row></Row> }
            </ul>
        </React.Fragment>
        );
    }
}

export default ListingDetailAmenities;
