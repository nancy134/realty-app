import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col,
    Alert
} from 'react-bootstrap';
import StepperAddListing from '../components/StepperAddListing';

class ListingAddReview extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }
    handleNext(listing){
        this.props.onNext(listing);
    }
    render()
    {

        // Stepper
        var addListingTypeCompleted=true;
        var addListingAddressCompleted=true;
        var addListingOverviewCompleted=true;
        var loggedIn=this.props.loggedIn;
        var loginCompleted=true;
        var forgotPassword = this.props.forgotPassword;
        var forgotPasswordCompleted=true;
        var forgotConfirmCompleted=true;
        var notRegistered = this.props.notRegistered;
        var registerCompleted=true;
        var confirmCompleted=true;
        var addListingReviewActive=true;

        // Listing
        var listing = this.props.listing;
        var listingType = listing.listingType;
        var address = listing.address + " " + listing.city + "," + listing.state + " " + listing.zip;
        var shortDescription = listing.shortDescription;
        var longDescription = listing.longDescription; 
       return(
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-80w"
          animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>Create New Listing</span> 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepperAddListing
                    addListingTypeCompleted={addListingTypeCompleted}
                    addListingAddressCompleted={addListingAddressCompleted}
                    addListingOverviewCompleted={addListingOverviewCompleted}
                    forgotPassword={forgotPassword}
                    forgotPasswordCompleted={forgotPasswordCompleted}
                    forgotConfirmCompleted={forgotConfirmCompleted}
                    notRegistered={notRegistered}
                    registerCompleted={registerCompleted}
                    confirmCompleted={confirmCompleted}
                    loginCompleted={loginCompleted}
                    loggedIn={loggedIn}
                    addListingReviewActive={addListingReviewActive}
                />
                <div className="pl-5 pr-5 ml-5 mr-5">
                <Row>
                    <Col><Alert variant="info">When selecting Create Listing, a draft listing will be created.  This listing will not be seen by the public.  You can edit the listing and add more information.  Once the listing is ready to be seen by the public, select the Publish button.</Alert></Col>
                </Row>
                <Row>
                    <Col xs={2} className="font-weight-bold">Listing Type</Col>
                    <Col xs={2}>{listingType}</Col>
                </Row>
                <Row>
                    <Col xs={2} className="font-weight-bold">Address</Col>
                    <Col xs={10}>{address}</Col>
                </Row>
                <Row>
                    <Col><p className="font-weight-bold">Short Description</p>
                    <p>{shortDescription}</p></Col>
                </Row>
                <Row>
                    <Col><p className="font-weight-bold">Long Description</p>
                    <p>{longDescription}</p></Col>
                </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="overview_edit_cancel_button"
                    onClick={this.props.onCancel}
                >
                    <span>Discard Changes</span> 
                </Button>
                <Button 
                    id="overview_edit_next_button"
                    onClick={() => this.handleNext(listing)}
                >
                    <span>Create Listing</span> 
                </Button>
            </Modal.Footer>
       </Modal>
       );
    }
}
export default ListingAddReview;
