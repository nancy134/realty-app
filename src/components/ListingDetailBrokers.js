import React from 'react';
import {
    Row,
    Col,
    Image,
    Spinner
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import ListingEditBrokers from './ListingEditBrokers';

function EditButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <span>
            {props.showSpinner ?
            <span
                id="general_spinner"
                className="edit-button align-top text-danger"
            >
                <Spinner animation="border" size="sm"/>
            </span>
            : 
            <span 
                id="general_edit_button"
                onClick={() => setModalShow(true)} 
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPencilAlt} />
            </span>
            }
            {modalShow ?
            <ListingEditBrokers
                listing={props.listing}
                propertyTypes={props.propertyTypes}
                show={modalShow}
                getListing={props.getListing}
                onHide={() => setModalShow(false)}
                onSave={listing => props.onSave(listing)}
            />
            : null}
        </span>
  );
}

class ListingDetailBrokers extends React.Component {
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
        const enableEdit = false;
        if (listing){
        }
        return (
            <div className="m-4 shadow border">
                <Row className="mt-2 ml-0 mr-0">
                    <Col>
                        <h3>Brokers { enableEdit && editMode === "edit" ?
                            <EditButton 
                                listing={listing}
                                onSave={this.handleSave}
                                getListing={this.props.getListing}
                            /> : null}</h3>
                    </Col>
                </Row>
                <Row className="pt-2 pb-2 ml-0 mr-0">
                    <Col md={12}>
                        <Row>
                            <Col md={2}><Image src="/broker.jpg" className="broker-image"  roundedCircle /></Col>
                            <Col md={4}>
                                <Row className="font-weight-bold">{listing.owner.first} {listing.owner.middle} {listing.owner.last}</Row>
                                <Row>{listing.owner.email}</Row>
                            </Col>
                            <Col md={4}>
                                <Row className="font-weight-bold">{listing.owner.company}</Row>
                                <Row>{listing.owner.address1}</Row>
                                <Row>{listing.owner.city}, {listing.owner.state} {listing.owner.zip}</Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
             </div>
        );
    }
}

export default ListingDetailBrokers;
