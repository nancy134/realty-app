import React from 'react';
import {
    Modal,
    Button,
    Spinner,
    Alert
} from 'react-bootstrap';

class DeleteModal extends React.Component {
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete(){
        this.props.onDelete(this.props.id);
    }
    render(){
        return(
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.show}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.title} 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { this.props.errorMessage && this.props.errorMessage.length > 0 ?
                <Alert
                    variant="danger"
                >
                    <span>{this.props.errorMessage}</span>
                </Alert>
                : null }

                <div>{this.props.message}</div>
                {this.props.saving ?
                <div>Saving...<Spinner animation="border" /></div>
                : null}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Cancel</Button>
                <Button 
                    id="delete_button"
                    onClick={this.handleDelete}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default DeleteModal;
