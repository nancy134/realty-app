import React from 'react';
import {
    Form,
    Modal,
    Button
} from 'react-bootstrap';

class ListingEditAmenities extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        var checkedAmenities = [];
        for (var i=0; i<this.props.allAmenities.length; i++){
            var checkedAmenity = false;
            if (this.props.listing && this.props.listing.amenities){
                for (var j=0; j<this.props.listing.amenities.length; j++){
                    if (this.props.listing.amenities[j] === this.props.allAmenities[i])
                        checkedAmenity = true;
                }
            }    
            checkedAmenities.push(checkedAmenity);
        }   
        this.state = {
            checkedAmenities: checkedAmenities
        };

    }
    toggleCheckbox(index) {
        const { checkedAmenities } = this.state;
        checkedAmenities[index] = !checkedAmenities[index];
    }

    handleSave(){
        var amenities = [];
        for (var i=0; i<this.state.checkedAmenities.length; i++){
            if (this.state.checkedAmenities[i] === true){
                amenities.push(this.props.allAmenities[i]);
            }
        }
        var listing = {
            "amenities" : amenities
        };
        if (this.props.listing){
            listing.ListingId = this.props.listing.ListingId;
        } else {
            listing.ListingId = this.state.ListingId;
        }
        this.props.onSave(listing);
    }
    render(){
    return(
    <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Edit Amenities
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {this.props.allAmenities.map((amenity, index) =>
                <div key={index}>
                    <Form.Check
                        type="checkbox"
                        label={amenity}
                        defaultChecked={this.state.checkedAmenities[index]}
                        onChange={() => this.toggleCheckbox(index)}
                    />
                </div>
            )}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
            <Button onClick={this.handleSave}>Save</Button>
        </Modal.Footer>
    </Modal>
    );
    } 
}

export default ListingEditAmenities;
