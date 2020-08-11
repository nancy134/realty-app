import React from 'react';
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';

class ListingAddType extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleListingTypeChange = this.handleListingTypeChange.bind(this);
        this.state = {
            listingType: "For Lease"
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
       return(
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Select Listing Type 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Check
                    >
                        <Form.Check.Input
                            type="radio"
                            checked={this.state.listingType === "For Lease"}
                            onChange={this.handleChange}
                            onClick={() => this.handleListingTypeChange("For Lease")}
                        />
                        <Form.Check.Label
                            onClick={() => this.handleListingTypeChange("For Lease")}
                        >
                            For Lease
                        </Form.Check.Label> 
                    </Form.Check>
                    <Form.Check
                    >
                        <Form.Check.Input
                            type="radio"
                            checked={this.state.listingType === "For Sale"}
                            onChange={this.handleChange}
                            onClick={() => this.handleListingTypeChange("For Sale")}
                        />
                        <Form.Check.Label
                            onClick={() => this.handleListingTypeChange("For Sale")}
                        >
                            For Sale
                        </Form.Check.Label>
                    </Form.Check>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="overview_edit_cancel_button"
                    onClick={this.props.onCancel}
                >
                    Cancel
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
