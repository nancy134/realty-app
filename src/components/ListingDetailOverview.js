import React from 'react';
import {
    Row,
    Col,
    Image
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import ListingEditOverview from './ListingEditOverview';

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
            <ListingEditOverview
                listing = {props.listing}
                listingTypes = {props.listingTypes}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSave={listing => props.onSave(listing)}
            />
        </span>
  );
}

class ListingDetailOverview extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleEdit(){
    }
    handleSave(listing){
        console.log("listing: "+listing);
        this.props.onListingUpdate(listing);
    }

    render() {
        var shortDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae.";
        var longDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae aliquet purus. In sollicitudin lobortis sollicitudin. Morbi sagittis ornare lorem, sed volutpat dolor. Vestibulum ac erat et ante cursus bibendum at in urna. Duis quis ex sapien. Sed massa mauris, consectetur eget nisl vel, tincidunt varius dolor. Cras porttitor tortor mauris, ut congue odio fringilla id. Aenean pretium a ante ut fermentum. Donec fringilla quam et felis tempor varius.";
        var image = "/default.jpg"; 
        var listingType = "For Lease";

        if (this.props.listing){
            shortDescription = this.props.listing.shortDescription;
            longDescription = this.props.listing.longDescription;
            if (this.props.listing.images.length > 0){
                image = this.props.listing.images[0].url;
            }
            listingType = this.props.listing.listingType;
        }
        const listing = this.props.listing;
        const editMode = this.props.editMode;
        const listingTypes = this.props.listingTypes;
        return (
            <div>
                <Row className="mt-2 border-bottom border-warning">
                    <Col>
	                <h2>Overview {editMode === "edit" ? <EditButton listing={listing} listingTypes={listingTypes} onSave={this.handleSave}/> : null}</h2>
                    </Col>
                    <Col>
                        <div className="text-right">
                            <h4>{listingType}</h4>
                         </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p>{shortDescription}</p>
                        <p>{longDescription}</p>
                    </Col>
                    <Col md={6}>
                        <Image src={image} className="border-0" thumbnail />
                    </Col>

                </Row>
            </div>
        );
    }
}

export default ListingDetailOverview;
