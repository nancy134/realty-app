import React from 'react';
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';
import {listingTypes} from '../constants/listingTypes';

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
                            checked={this.state.listingType === listingTypes.FORLEASE}
                            onChange={this.handleChange}
                            onClick={() => this.handleListingTypeChange(listingTypes.FORLEASE)}
                        />
                        <Form.Check.Label
                            onClick={() => this.handleListingTypeChange(listingTypes.FORLEASE)}
                        >
                            For Lease
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
                            {listingTypes.FORSALE} 
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
