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
import {getDomain} from '../helpers/utilities';
import constantService from '../services/constant';
import listingService from '../services/listings';

class ShareListingPreviewConstant extends React.Component{
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
        console.log("ShareListingPreviewConstant");
        var listing = this.props.listing;
        var domain = getDomain(window.location.hostname);
        var address = formatAddress(listing);
        var name = domain + " "  + address;
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

        var fromName = this.props.user.first + " " + this.props.user.last;
        var body = {
            replyTo: this.props.user.email,
            subject: this.props.subject,
            preview: true,
            content: true,
            listing: {
                image: image,
                address: address,
                shortDescription: listing.shortDescription,
                longDescription: listing.longDescription,
                listingPrice: strListingPrice,
                size: size,
                price: price
            }
        };

        var that = this;
        mailService.sendListing(body).then(function(html){
            that.setState({
                src: html.Location,
                body: body
            });
            var emailCampaignActivity = {
                    format_type: 5,
                    from_email: that.props.user.email,
                    reply_to_email: that.props.user.email,
                    from_name: fromName,
                    subject: address,
                    html_content: html.content,
                    preheader: "Exlusive Listing"
            }
            var constantBody = {
                accessToken: that.props.accessToken,
                name: name,
                email_campaign_activities: [emailCampaignActivity]
            };
            console.log(constantBody);
            if (!that.props.listing.constantContactId){
                constantService.createCampaign(JSON.stringify(constantBody)).then(function(campaign){
                    console.log(campaign);
                    var listingBody = {
                        ListingId: that.props.listing.ListingId,
                        constantContactId: campaign.campaign_id
                    };
                    listingService.update(listingBody).then(function(updatedListing){
                        console.log(updatedListing);
                    }).catch(function(err){
                        console.log(err);
                    });
                }).catch(function(err){
                    console.log(err);
                    console.log("err[0].error_key: "+err[0].error_key);
                    if (err[0] && err[0].error_key && err[0].error_key === 'email.emailcampaignname.validate.request.notunique'){
                        console.log(err[0].error_message);
                    }
                });
            } else {
                console.log(constantBody);
                //constantBody.email_campaign_activities[0].html_content='<html><body>[[trackingImage]] <a href="http://www.constantcontact.com">Visit ConstantContact.com!</a> </body></html>';
                constantService.updateCampaign(that.props.listing.constantContactId, constantBody).then(function(campaign){
                    console.log(campaign);
                }).catch(function(err){
                    console.log(err);
                });
            }
             
        }).catch(function(err){
            console.log(err);
        });
    }
    render(){
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
export default ShareListingPreviewConstant;
