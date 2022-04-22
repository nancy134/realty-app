import React from 'react';
import {
    Row,
    Col,
    Image,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import ListingEditBrokers from './ListingEditBrokers';
import ContactModal from './ContactModal';
import {
    formatName,
    formatWebsite
} from '../helpers/utilities';

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
    var userName = formatName(user);

    var website = null;
    if (user.website) website = formatWebsite(user.website);
    
    var showWebsite = false;
    var companyLinkToWebsite = false;
    if (!user.company && user.website){
        showWebsite = true;
    } else if (user.company && user.website){
        companyLinkToWebsite = true;
    }
    
    return(
        <div style={{ marginBottom: '15px' }}><Row>
            <Col md={2}><Image src="/broker.jpg" className="broker-image"  roundedCircle /></Col>
            <Col md={4}>
                <Row className="font-weight-bold">{user.first} {user.middle} {user.last}</Row>
                <Row>
                    <Button
                    className="pl-0"
                    variant="link"
                    size="sm"
                    onClick={() => props.onEmail(user.email, userName)}
                    >
                    Email {user.first}
                    </Button>
                </Row>
                <Row>
                { showWebsite ?
                <a href={website} target="_blank" rel="noreferrer">{user.website}</a>
                : null }
                </Row>
                { user.officePhone ?
                <Row>Office phone: {user.officePhone}</Row>
                : null}
                { user.mobilePhone ?
                <Row>Mobile phone: {user.mobilePhone}</Row>
                : null}
            </Col>
            <Col md={4}>
                { companyLinkToWebsite ?
                <Row className="font-weight-bold"><a href={website} target="_blank" rel="noreferrer">{user.company}</a></Row>
                :
                <Row className="font-weight-bold">{user.company}</Row>
                }
                <Row>{user.address1}</Row>
                <Row>{user.city}, {user.state} {user.zip}</Row>
            </Col>
        </Row></div>
    );
    }
}
class ListingDetailBrokers extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.getListing = this.getListing.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleContactHide = this.handleContactHide.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.state = {
            showContactEmail: false
        };
    }
    handleSave(listing){
        this.props.onListingUpdate(listing);
    }
    handleEmail(email, userName){
      
        console.log("email: "+email);
        console.log("userName: "+userName);
        this.setState({
           showContactEmail: true,
           toEmail: email,
           toUserName: userName
        }); 
    }
    handleContactHide(){
        this.setState({
            showContactEmail: false
        });
    }
    handleSendMessage(body){
        body.toEmail = this.state.toEmail;
        body.toUserName = this.state.toUserName;
        this.props.onSendMessage(body);
        this.setState({
            showContactEmail: false
        });
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
                { this.state.showContactEmail ?
                <ContactModal
                    toEmail={this.state.toEmail}
                    toUserName={this.state.toUserName}
                    listing={listing}
                    show={this.state.showContactEmail}
                    onHide={this.handleContactHide}
                    onSendMessage={this.handleSendMessage}
                />
                : null }
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
                            onEmail={this.handleEmail}
                        />
                        ))} 
                    </Col>
                </Row>
             </div>
        );
    }
}
export default ListingDetailBrokers;
