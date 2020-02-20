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
                address: this.props.listing.address,
                city: this.props.listing.city,
                state: this.props.listing.state,
                displayAddress: this.props.listing.displayAddress
            };
        } else {
            this.state = {
                address: "",
                city: "",
                state: "",
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
        console.log("ListingEditHeader: handleSave())");
        var listing = {};
        if (this.state.address) listing.address = this.state.address;
        if (this.state.city) listing.city = this.state.city;
        if (this.state.state) listing.state = this.state.state;
        if (this.state.displayAddress) listing.displayAddress = this.state.displayAddress;
        console.log("listing: "+JSON.stringify(listing));
        this.props.onSave(listing);
        this.props.onHide();
    }
    render(){
        return (
        
        <Modal
            show={this.props.show}
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
                                <Col md={6}>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control value={this.state.address} onChange={this.onAddressChange}/>
                                </Col>
                                <Col md={4}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control value={this.state.city} onChange={this.onCityChange}/>
                                </Col>
                                <Col md={2}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control value={this.state.state} onChange={this.onStateChange}/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={6}>
                                    <Form.Label>Display Address</Form.Label>
                                    <Form.Control value={this.state.displayAddress} onChange={this.onDisplayAddressChange}/>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
                <Button onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>        
        );
    }

}

export default ListingEditHeader;

