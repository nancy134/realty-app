import React from 'react';
import {
    Col,
    Form,
    Modal,
    Button
} from 'react-bootstrap';

class ListingEditPortfolio extends React.Component {
    constructor(props){
        super(props);
        this.onTenantChange = this.onTenantChange.bind(this);
        this.onBuildingSizeChange =this.onBuildingSizeChange.bind(this);
        this.onLotSizeChange = this.onLotSizeChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        if (this.props.portfolio){
            this.state = {
                id: this.props.portfolio.id,
                tenant: this.props.portfolio.tenant ? this.props.portfolio.tenant : "",
                buildingSize: this.props.portfolio.buildingSize ? this.props.portfolio.buildingSize : "",
                lotSize: this.props.portfolio.lostSize ? this.props.portfolio.logSize : "",
                type: this.props.portfolio.type ? this.props.portfolio.type : ""
            };
        } else {
            this.state = {
                id: null,
                tenant: "",
                buildingSize: "",
                lotSize: "",
                type: ""
            };
        }
    }
    onTenantChange(event){
        this.setState({
            tenant: event.target.value
        });
    }
    onBuildingSizeChange(event){
        this.setState({
            buildingSize: event.target.value
        });
    }
    onLotSizeChange(event){
        this.setState({
            lotSize: event.target.value
        });
    }
    onTypeChange(event){
        this.setState({
            type: event.target.value
        });
    }
    handleSave(){
        var portfolio = {};
        portfolio.id = this.state.id;
        if (this.props.portfolio) portfolio.ListingId = this.props.listing.id;
        if (this.state.tenant) portfolio.tenant = this.state.tenant;
        if (this.state.buildingSize) portfolio.buildingSize = this.state.buildingSize;
        if (this.state.lotSize) portfolio.lotSize = this.state.lotSize;
        if (this.state.type) portfolio.type = this.state.type;
        this.props.onSave(portfolio);
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
                Portfolio Edit
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
                        <Form.Label>Building Size</Form.Label>
                        <Form.Control value={this.state.buildingSize} onChange={this.onBuildingSizeChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Lot Size</Form.Label>
                        <Form.Control value={this.state.lotSize} onChange={this.onLotSizeChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Type</Form.Label>
                        <Form.Control value={this.state.type} onChange={this.onTypeChange}/>
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

export default ListingEditPortfolio;
