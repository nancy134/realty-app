import React from 'react';
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap';

class ListingEditBrokers extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(){
        console.log("handleSave");
    }

    render(){

        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Brokers 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Check type="checkbox" label="Nancy Piedra" defaultChecked={true}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type="checkbox" label="Fred Ryon"/>
                    </Form.Group>

                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button>Cancel</Button>
                <Button>Save</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default ListingEditBrokers;
