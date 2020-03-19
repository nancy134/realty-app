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
        var checkboxes = [];
        if (this.props.allAmenities){
            this.props.allAmenities.map(amenity =>
                checkboxes.push({
                    checked: false,
                    label: amenity
                })
            );
        }
        if (this.props.listing){
            this.state = {
                id: this.props.listing.id,
                checkboxes: checkboxes
            };
        } else {
            this.state = {
                id: null,
                checkboxes: checkboxes
            };
        }
    }
    toggleCheckbox(index) {
        const {checkboxes} = this.state;

        checkboxes[index].checked = !checkboxes[index].checked;

        //this.setState({
        //    checkboxes
        //});
    }

    handleSave(){
        console.log("handleSave()");
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
    {this.state.checkboxes.map((checkbox, index) =>
            <div key={checkbox.label}>
                <Form.Check
                    type="checkbox"
                    id={checkbox.label}
                    label={checkbox.label}
                    onChange={this.toggleCheckbox(index)}
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
