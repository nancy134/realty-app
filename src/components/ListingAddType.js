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
        this.state = {
            listingType: "For Lease"
        };
    }
    handleChange(e){
        console.log('e.target.value: '+e.target.value); 
        this.setState({
            listingType: e.target.value
        });
    }
    handleNext(){
        var listing = {};
        console.log("this.state.listingType: "+this.state.listingType); 
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
                        type="radio"
                        label="For Lease"
                        value="For Lease"
                        checked={this.state.listingType === "For Lease"}
                        onChange={this.handleChange}
                    />
                    <Form.Check
                        type="radio"
                        label="For Sale"
                        value="For Sale"
                        checked={this.state.listingType === "For Sale"}
                        onChange={this.handleChange}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="overview_edit_cancel_button"
                    onClick={this.props.onHide}
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
