import React from 'react';
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';

class SparkAddCollection extends React.Component {

    render(){
        return(
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.show}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>Add Collection</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label
                        >
                            <span>Collection Name</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onHide}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    onClick={this.props.onAddCollection}
                >
                    <span>Add Collection</span>
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default SparkAddCollection;
