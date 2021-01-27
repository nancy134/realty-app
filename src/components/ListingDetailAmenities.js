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
                className="edit-button text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPencilAlt} />&nbsp;Edit Amenities
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
        <div className="mb-2 shadow border">
            <Row className="mt-2 ml-0 mr-0">
                <Col>
                    <h3>Amenities&nbsp;{editMode === "edit" ? 
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
                    </h3>
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
        </div>
        );
    }
}

export default ListingDetailAmenities;
