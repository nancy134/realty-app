import React from 'react';
import {
    Row,
    Col,
    Form,
    Modal,
    Button
} from 'react-bootstrap';

class ListingEditHeader extends React.Component {
    constructor(props){
        super(props);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onDisplayAddressChange = this.onDisplayAddressChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        if (this.props.listing){
            this.state = {
                id: this.props.listing.id,
                ListingId: this.props.listing.ListingId,
                address: this.props.listing.address ? this.props.listing.address : "",
                city: this.props.listing.city ? this.props.listing.city : "",
                state: this.props.listing.state ? this.props.listing.state : "Alabama",
                displayAddress: this.props.listing.displayAddress ? this.props.listing.displayAddress : ""
            };
        } else {
            this.state = {
                id: null,
                ListingId: null,
                address: "",
                city: "",
                state: "Alabama",
                displayAddress: ""
            };
        }
    }
    onAddressChange(event){
        this.setState({
            address: event.target.value
        });
    }
    onCityChange(event){
        this.setState({
            city: event.target.value
        });
    }
    onStateChange(event){
        this.setState({
            state: event.target.value
        });
    }
    onDisplayAddressChange(event){
        this.setState({
            displayAddress: event.target.value
        });
    }
    handleSave(){
        var listing = {};
        listing.id = this.state.id;
        if (this.props.listing){
            listing.ListingId = this.props.listing.ListingId;
        } else {
            listing.ListingId = this.state.ListingId;
        }
        if (this.state.address) listing.address = this.state.address;
        if (this.state.city) listing.city = this.state.city;
        if (this.state.state) listing.state = this.state.state;
        if (this.state.displayAddress) listing.displayAddress = this.state.displayAddress;
        console.log("listing: "+JSON.stringify(listing));
        this.props.onSave(listing);
        this.props.onHide();
    }
    render(){
        var states = null;
        if (this.props.states){
            states = this.props.states.map((item,key) =>
                <option key={key}>{item}</option>
            );
        }
        return (
        
        <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Address Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Row className="mt-2">
                    <Col>
                        <Form>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        id="header_edit_address_input" 
                                        value={this.state.address} 
                                        onChange={this.onAddressChange}
                                    />
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={6}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                        id="header_edit_city_input"
                                        value={this.state.city} 
                                        onChange={this.onCityChange}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control 
                                        id="header_edit_state_select"
                                        as="select" 
                                        value={this.state.state} 
                                        onChange={this.onStateChange} 
                                    >
                                    {states}
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={6}>
                                    <Form.Label>Display Address</Form.Label>
                                    <Form.Control 
                                        id="header_edit_display_address_edit"
                                        value={this.state.displayAddress} 
                                        onChange={this.onDisplayAddressChange}
                                    />
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
                <Button 
                    id="header_edit_save_button"
                    onClick={this.handleSave}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>        
        );
    }

}

export default ListingEditHeader;

