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
import {formatSizeAndPrice} from '../helpers/utilities';

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

        var address = formatAddress(listing);
        var image = getPrimaryImage(listing);
        var sizeAndPrice = formatSizeAndPrice(listing.spaces); 
        var size = null;
        var price = null;
        if (sizeAndPrice){ 
            size = sizeAndPrice.size;
            price = sizeAndPrice.price;
        }

        var strListingPrice = null;
        if (listing.listingPrice){
            var floatPrice = parseFloat(listing.listingPrice);
            var listingPrice = floatPrice.toLocaleString(undefined, {maximumFractionDigits:0});
            strListingPrice = "For Sale at $"+listingPrice; 
        }
        var body = {
            to: this.props.contactsSelected[0].email,
            replyTo: this.props.user.email,
            subject: this.props.subject,
            preview: true,
            listing: {
                image: image,
                address: address,
                shortDescription: listing.shortDescription,
                longDescription: listing.longDescription,
                listingPrice: strListingPrice,
                size: size,
                price: price
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
