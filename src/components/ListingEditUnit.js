import React from 'react';
import {
    Col,
    Form,
    Modal,
    Button
} from 'react-bootstrap';

class ListingEditUnit extends React.Component {
    constructor(props){
        super(props);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onNumUnitsChange = this.onNumUnitsChange.bind(this);
        this.onSpaceChange = this.onSpaceChange.bind(this);
        this.onIncomeChange = this.onIncomeChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        if (this.props.unit){
            this.state = {
                id: this.props.unit.id,
                description: this.props.unit.description ? this.props.unit.description : "",
                numUnits: this.props.unit.numUnits ? this.props.unit.NumUnits : "",
                space: this.props.unit.space ? this.props.unit.space : "",
                income: this.props.unit.income ? this.props.unit.income : ""
            };
        } else {
            this.state = {
                id: null,
                description: "",
                numUnits: "",
                space: "",
                income: ""
            };
        } 
    }
    componentDidMount(){
    }
    componentWillUnmount(){
    }
    onDescriptionChange(event){
        this.setState({
            description: event.target.value
        });
    }
    onNumUnitsChange(event){
        this.setState({
            numUnits: event.target.value
        });
    }
    onSpaceChange(event){
        this.setState({
            space: event.target.value
        });
    }
    onIncomeChange(event){
        this.setState({
            income: event.target.value
        });
    }

    handleSave(){
        var unit = {};
        unit.id = this.state.id;
        if (this.props.listing) unit.ListingVersionId = this.props.listing.id;
        if (this.state.description) unit.description = this.state.description;
        if (this.state.numUnits) unit.numUnits = this.state.numUnits;
        if (this.state.space) unit.space = this.state.space;
        if (this.state.income) unit.income = this.state.income;
        this.props.onSave(unit);
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
                Unit Edit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Decription</Form.Label>
                        <Form.Control 
                            id="unit_edit_description"
                            value={this.state.description} 
                            onChange={this.onDescriptionChange}
                        /> 
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>No. of Units</Form.Label>
                        <Form.Control 
                            id="unit_edit_num_units"
                            value={this.state.numUnits} 
                            onChange={this.onNumUnitsChange}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Square feet</Form.Label>
                        <Form.Control 
                            id="unit_edit_space"
                            value={this.state.space} 
                            onChange={this.onSpaceChange}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Income</Form.Label>
                        <Form.Control 
                            id="unit_edit_income"
                            value={this.state.income} 
                            onChange={this.onIncomeChange}
                        />
                    </Form.Group>
                </Form.Row>

            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
                <Button
                    id="unit_save_button"
                    onClick={this.handleSave}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default ListingEditUnit;
