import React from 'react';
import {
    Col,
    Form,
    InputGroup,
    Modal,
    Button
} from 'react-bootstrap';

class ListingEditAvailableSpace extends React.Component {
    constructor(props){
        super(props);
        this.onUnitChange = this.onUnitChange.bind(this);
        this.onSizeChange = this.onSizeChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onUseChange = this.onUseChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onDriveInDoorsChange = this.onDriveInDoorsChange.bind(this);
        this.onDivisibleChange = this.onDivisibleChange.bind(this);
        this.onLoadingDocksChange = this.onLoadingDocksChange.bind(this);
        this.onLeaseTermChange = this.onLeaseTermChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        if (this.props.space){
            this.state = {
                id: this.props.space.id,
                unit: this.props.space.unit ? this.props.space.unit : "",
                size: this.props.space.size ? this.props.space.size : "",
                price: this.props.space.price ? this.props.space.price : "",
                type: this.props.space.type ? this.props.space.type : "",
                use: this.props.space.use ? this.props.space.use : "",
                description: this.props.space.description ? this.props.space.description : "",
                driveInDoors: this.props.space.driveInDoors ? this.props.space.driveInDoors : "",
                divisible: this.props.space.divisible ? this.props.space.divisible : "" ,
                loadingDocks: this.props.space.loadingDocks ? this.props.space.loadingDocs : "",
                leaseTerm: this.props.space.leaseTerm ? this.props.space.leaseterm : ""
            };
        } else {
            this.state = {
                id: null,
                unit: "",
                size: "",
                price: "",
                type: "",
                use: "",
                description: "",
                driveInDoors: null,
                divisible: null,
                loadingDocks: null,
                leaseTerm: null
            };
        }
    }
    onUnitChange(event){
        this.setState({
            unit: event.target.value
        });
    }
    onSizeChange(event){
        this.setState({
            size: event.target.value
        });
    }
    onPriceChange(event){
        this.setState({
            price: event.target.value
        });
    }
    onTypeChange(event){
        this.setState({
            type: event.target.value
        });
    }
    onUseChange(event){
        this.setState({
            use: event.target.value
        });
    }
    onDescriptionChange(event){
        this.setState({
            description: event.target.value
        });
    }
    onDriveInDoorsChange(event){
        this.setState({
            driveInDoors: event.target.value
        });
    }
    onDivisibleChange(event){
        this.setState({
            divisible: event.target.value
        });
    }
    onLoadingDocksChange(event){
        this.setState({
            loadingDocks: event.target.value
        });
    }
    onLeaseTermChange(event){
        this.setState({
            leaseTerm: event.target.value
        });
    }
    handleSave(){
        var space = {};
        space.id = this.state.id;
        if (this.props.listing) space.ListingId = this.props.listing.id;
        if (this.state.unit) space.unit = this.state.unit;
        if (this.state.size) space.size = this.state.size;
        if (this.state.price) space.price = this.state.price;
        if (this.state.type) space.type = this.state.type;
        if (this.state.description) space.description = this.state.description;
        if (this.state.driveInDoors) space.driveInDoors = this.state.driveInDoors;
        if (this.state.divisible) space.divisible = this.state.divisible;
        if (this.state.loadingDocks) space.loadingDocks = this.state.loadingDocks;
        if (this.state.leaseTerm) space.leaseTerm = this.state.leaseTerm;
        this.props.onSave(space);
        this.props.onHide();
    }
    render(){

        /*var image1 = process.env.REACT_APP_WEB_SERVER+'image1.jpg';*/
        /*var image2 = process.env.REACT_APP_WEB_SERVER+'image2.jpg';*/
        /*var image3 = process.env.REACT_APP_WEB_SERVER+'image3.jpg';*/
        /*var images = [];*/

        const space = this.props.space;
        if (space){
            /*images = [image1, image2, image3];*/
        }
        return (
        <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >   
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Available Space Edit 
                </Modal.Title>
            </Modal.Header>                    
            <Modal.Body >
            <Form>
                <Form.Row>

                    <Form.Group as={Col} >
                        <Form.Label>Unit Name</Form.Label>
                        <Form.Control value ={this.state.unit} onChange={this.onUnitChange}/> 
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Size</Form.Label>
                        <InputGroup>
                            <Form.Control value={this.state.size} onChange={this.onSizeChange}/>
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">sq ft</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Price</Form.Label>
                        <InputGroup>
                            <Form.Control value={this.state.price} onChange={this.onPriceChange}/>
                            <InputGroup.Append>
                                <InputGroup.Text>$/sf/mo</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" value={this.state.type} onChange={this.onTypeChange}>
                            <option>Full Gross</option>
                            <option>Modified Gross</option>
                            <option>NNN</option>
                        </Form.Control> 
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Use</Form.Label>
                        <Form.Control as="select" value={this.state.use} onChange={this.onUseChange}>
                            <option>Office</option>
                            <option>Flex</option>
                            <option>Retail</option>
                            <option>Warehouse</option>
                            <option>Restaurant</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="5" value={this.state.description} onChange={this.onDescriptionChange}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Drive in Doors</Form.Label>
                        <Form.Control value={this.state.driveInDoors} onChange={this.onDriveInDoorsChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Floor</Form.Label>
                        <Form.Control value={this.state.driveInDoors} onChange={this.onDriveInDoorsChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Divisible</Form.Label>
                        <Form.Control as="select" value={this.state.divisible} onChange={this.onDivisibleChange}>
                            <option>No</option>
                            <option>Yes</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Loading Docks</Form.Label>
                        <Form.Control value={this.state.loadingDocks} onChange={this.onLoadingDocksChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Lease Term</Form.Label>
                        <Form.Control value={this.state.leaseTerm} onChange={this.onLeaseTermChange}></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
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

export default ListingEditAvailableSpace;
