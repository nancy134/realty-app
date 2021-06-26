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
import ListingEditBrokers from './ListingEditBrokers';

function EditButton(props) {
    return (
        <span>
            <span 
                id="broker_edit_button"
                onClick={() => {props.onShow()}} 
                className="edit-button text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPencilAlt} />&nbsp;Edit Brokers
            </span>
            {props.show ?
            <ListingEditBrokers
                listing={props.listing}
                show={props.show}
                onHide={props.onHide}
                onSave={props.onSave}
                errorMessage={props.errorMessage}
                saving={props.saving}
                associates={props.associates}
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
        const enableEdit = true;
        if (listing){
        }
        return (
            <div className="m-4 shadow border">
                <Row className="mt-2 ml-0 mr-0">
                    <Col>
                        <h3>Brokers { enableEdit && editMode === "edit" ?
                            <EditButton 
                                listing={listing}
                                onSave={this.props.onSave}
                                getListing={this.props.getListing}
                                onHide={this.props.onBrokerModalHide}
                                onShow={this.props.onBrokerModalUpdate}
                                errorMessage={this.props.brokerError}
                                show={this.props.brokerUpdate}
                                saving={this.props.brokerSaving}
                                associates={this.props.associates}
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
                                { listing.owner.officePhone ?
                                <Row>Office phone: {listing.owner.officePhone}</Row>
                                : null}
                                { listing.owner.mobilePhone ?
                                <Row>Mobile phone: {listing.owner.mobilePhone}</Row>
                                : null}
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
