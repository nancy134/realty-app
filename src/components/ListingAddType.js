import React from 'react';
import {
    Modal,
    Button,
    Form,
    Row,
    Col,
    Alert
} from 'react-bootstrap';
import {listingTypes} from '../constants/listingTypes';
import StepperAddListing from '../components/StepperAddListing';

class ListingAddType extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleListingTypeChange = this.handleListingTypeChange.bind(this);
        this.state = {
            listingType: listingTypes.FORLEASE 
        };
    }
    handleChange(e){
        console.log("handleChange: e:");
        console.log(e);
        //this.setState({
        //    listingType: e.target.value
        //});
    }

    handleListingTypeChange(listingType){
        console.log("handleListingTypeChange: "+listingType);
        this.setState({
            listingType: listingType
        });
    }

    handleNext(){
        var listing = {};
        listing.listingType = this.state.listingType;
        this.props.onNext(listing);
    }
    render()
    {
       // Stepper
       var loggedIn=this.props.loggedIn;
       var addListingTypeActive = true;
       return(
        <Modal
          show={this.props.show}
          onHide={this.props.onCancel}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-60w"
          animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>Create New Listing</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepperAddListing
                    addListingTypeActive={addListingTypeActive}
                    loggedIn={loggedIn}
                />
                <Row>
                <Col></Col>
                <Col xs="auto"> 
                <Alert variant="primary">
                <Form className="pl-5 pr-5">
                    <h4 className="pb-2">Select Listing Type</h4>
                    <Form.Check
                    >
                        <Form.Check.Input
                            type="radio"
                            checked={this.state.listingType === listingTypes.FORLEASE}
                            onChange={this.handleChange}
                            onClick={() => this.handleListingTypeChange(listingTypes.FORLEASE)}
                        />
                        <Form.Check.Label
                            onClick={() => this.handleListingTypeChange(listingTypes.FORLEASE)}
                        >
                            <h5>{listingTypes.FORLEASE}</h5>
                        </Form.Check.Label> 
                    </Form.Check>
                    <Form.Check
                    >
                        <Form.Check.Input
                            type="radio"
                            checked={this.state.listingType === listingTypes.FORSALE }
                            onChange={this.handleChange}
                            onClick={() => this.handleListingTypeChange(listingTypes.FORSALE)}
                        />
                        <Form.Check.Label
                            onClick={() => this.handleListingTypeChange(listingTypes.FORSALE)}
                        >
                            <h5>{listingTypes.FORSALE}</h5>
                        </Form.Check.Label>
                    </Form.Check>
                </Form>
                </Alert>
                </Col>
                <Col></Col>
                </Row>
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
                    onClick={this.handleNext}
                >
                    Next 
                </Button>
            </Modal.Footer>
       </Modal>
       );
    }
}
export default ListingAddType;
