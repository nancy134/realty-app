import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col,
    Form
} from 'react-bootstrap';
import StepperShareListing from '../components/StepperShareListing';
import mailService from '../services/mail';
import {formatAddress} from '../helpers/utilities';
import {getPrimaryImage} from '../helpers/utilities';
import {getImage2and3} from '../helpers/utilities';
import {formatSizeAndPrice} from '../helpers/utilities';
import {formatName} from '../helpers/utilities';
import {formatAvailableSpacesForEmail} from '../helpers/utilities';

class ShareListingPreview extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.state = {
            src: null,
            body: null
        };
    }
    handleNext(){
        this.props.onNext(this.state.body);
    };
    handleSubjectChange(e){
        this.props.onSubjectChange(e.target.value);
    }
    componentDidMount(){
        var listing = this.props.listing;
        var logo = this.props.selectedImageUrl;
        var address = formatAddress(listing);

        // Href
        var listingHref = 
            "https://" +
            window.location.hostname +
            "/listing/" +
            listing.id;

        // Images
        var image = getPrimaryImage(listing);
        var images = getImage2and3(listing);
        var image2 = null;
        var image3 = null;
        if (images){
            image2 = images[0];
            image3 = images[1];
        }

        // Size and Price
        var sizeAndPrice = formatSizeAndPrice(listing.spaces); 
        var size = null;
        var price = null;
        if (sizeAndPrice){ 
            size = sizeAndPrice.size;
            price = sizeAndPrice.price;
        }

        // Available Space
        var availableSpace = "";
        if (listing.spaces.length > 0){
           availableSpace = formatAvailableSpacesForEmail(listing.spaces);
        }

        var strListingPrice = null;
        if (listing.listingPrice){
            var floatPrice = parseFloat(listing.listingPrice);
            var listingPrice = floatPrice.toLocaleString(undefined, {maximumFractionDigits:0});
            strListingPrice = "For Sale at $"+listingPrice; 
        }

        // Contact
        var contactName = "";
        var contactCompany = "";
        var contactEmail = "";
        var contactAddress = "";
        var contactCity = "";
        var contactOffice = "";
        var contactMobile = "";
        var contactWebsite="";
        if (listing.users.length > 0){
            contactName = formatName(listing.users[0]);
            contactEmail = listing.users[0].email;
            contactCompany = listing.users[0].company;
            contactAddress = listing.users[0].address;
            contactCity = 
                listing.users[0].city +
                ", " +
                listing.users[0].state +
                " " +
                listing.users[0].zip;
            contactOffice = listing.users[0].officePhone;
            contactMobile = listing.users[0].mobilePhone;
            contactWebsite = listing.users[0].website;
        }
        var body = {
            contacts: this.props.contactsSelected,
            to: this.props.contactsSelected[0].email,
            replyTo: this.props.user.email,
            subject: this.props.subject,
            preview: true,
            color: this.props.selectedColor,
            colorLight: this.props.selectedColorLight,
            listing: {
                image: image,
                image2: image2,
                image3: image3,
                address: address,
                shortDescription: listing.shortDescription,
                longDescription: listing.longDescription,
                listingHref: listingHref,
                availableSpace: availableSpace,
                listingPrice: strListingPrice,
                size: size,
                price: price,
                logo: logo,
                contactName: contactName,
                contactEmail: contactEmail,
                contactOffice: contactOffice,
                contactMobile: contactMobile,
                contactCompany: contactCompany,
                contactAddress: contactAddress,
                contactCity: contactCity,
                contactWebsite: contactWebsite
            }
        }
        var that = this;
        mailService.sendListing(body).then(function(html){
            that.setState({
                src: html.Location,
                body: body
            });
             
        }).catch(function(err){
        });
    }
    render(){
        var numContacts = this.props.contactsSelected.length + " Contact(s) [A separate email for each contact]";
        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onCancel}
            animation={false}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>
                        Preview 
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepperShareListing
                    selectShareMethodComplete={true}
                    selectShareContactsComplete={true}
                    selectShareImageComplete={true}
                    selectSharePreviewActive={true}
                    methodType={this.props.methodType}
                />
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            ReplyTo:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                disabled={true}
                                placeholder={this.props.user.email}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            To:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                disabled={true}
                                placeholder={numContacts}
                            />
                        </Col> 
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={2}>
                            Subject:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control
                                value={this.props.subject}
                                onChange={this.handleSubjectChange}
                            />
                        </Col>
                    </Form.Group>
                </Form>
                <Row>
                    <Col>
                        { this.state.src ?
                        <iframe title="preview" frameBorder="0" src={this.state.src} width="100%" height="300px"/>
                        : null }
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="button-add-listing-type-cancel"
                    onClick={this.props.onCancel}
                >
                    <span>Cancel</span> 
                </Button>
                <Button 
                    id="button-add-listing-type-next"
                    disabled={!this.state.body}
                    onClick={this.handleNext}
                >
                    Send Mail 
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}
export default ShareListingPreview;
