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

function Broker(props){
    var user = props.user;
    if (user.role === "Administrator" || user.role === "Client"){
        return null
    } else {
    return(
        <Row >
            <Col md={2}><Image src="/broker.jpg" className="broker-image"  roundedCircle /></Col>
            <Col md={4}>
                <Row className="font-weight-bold">{user.first} {user.middle} {user.last}</Row>
                <Row><a href={user.email}>Contact Me</a></Row>
                { user.officePhone ?
                <Row>Office phone: {user.officePhone}</Row>
                : null}
                { user.mobilePhone ?
                <Row>Mobile phone: {user.mobilePhone}</Row>
                : null}
            </Col>
            <Col md={4}>
                <Row className="font-weight-bold">{user.company}</Row>
                <Row>{user.address1}</Row>
                <Row>{user.city}, {user.state} {user.zip}</Row>
            </Col>
        </Row>
    );
    }
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
                        <h3>Contacts { enableEdit && editMode === "edit" ?
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
                        {this.props.listing.users.map((user, index) =>
                        (
                        <Broker
                            key={index}
                            index={index}
                            user={user}
                        />
                        ))} 
                    </Col>
                </Row>
             </div>
        );
    }
}

export default ListingDetailBrokers;
