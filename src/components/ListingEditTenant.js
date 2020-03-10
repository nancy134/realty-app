import React from 'react';
import {
    Col,
    Form,
    Modal,
    Button
} from 'react-bootstrap';

class ListingEditTenant extends React.Component {
    constructor(props){
        super(props);
        this.onTenantChange = this.onTenantChange.bind(this);
        this.onSpaceChange = this.onSpaceChange.bind(this);
        this.onLeaseEndsChange = this.onLeaseEndsChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        if (this.props.tenant){
            this.state = {
                id: this.props.tenant.id,
                tenant: this.props.tenant.tenant ? this.props.tenant.tenant : "",
                space: this.props.tenant.space ? this.props.tenant.space : "",
                leaseEnds: this.props.tenant.leaseEnds ? this.props.tenant.leaseEnds : ""
            };
        } else {
            this.state = {
                id: null,
                tenant: "",
                space: "",
                leaseEnds: ""
            };
        }
    }
    onTenantChange(event){
        this.setState({
            tenant: event.target.value
        });
    }
    onSpaceChange(event){
        this.setState({
            space: event.target.value
        });
    }
    onLeaseEndsChange(event){
        this.setState({
            leaseEnds: event.target.value
        });
    }
    handleSave(){
        var tenant = {};
        tenant.id = this.state.id;
        if (this.props.listing) tenant.ListingId = this.props.listing.id;
        if (this.state.tenant) tenant.tenant = this.state.tenant;
        if (this.state.space) tenant.space = this.state.space;
        if (this.state.leaseEnds) tenant.leaseEnds = this.state.leaseEnds;
        this.props.onSave(tenant);
        this.props.onHide();
    }
    render(){
        return (
        <Modal
            show={this.props.show}
            onHide={this.props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Tenant Edit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Tenant</Form.Label>
                        <Form.Control value={this.state.tenant} onChange={this.onTenantChange}/> 
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Square Feet</Form.Label>
                        <Form.Control value={this.state.space} onChange={this.onSpaceChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Base Rent</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Lease Ends</Form.Label>
                        <Form.Control value={this.state.leaseEnds} onChange={this.onLeaseEndsChange}/>
                    </Form.Group>
                </Form.Row>

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

export default ListingEditTenant;
