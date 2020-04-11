import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';

class TransitionModal extends React.Component {
    constructor(props){
        super(props);
        this.onPublish = this.onPublish.bind(this);
    }
    onPublish(){
        this.props.onHide();
        this.props.onPublish();
    }
    render(){
        return(
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.show}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {this.props.transition} 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.message}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Cancel</Button>
                <Button onClick={this.onPublish}>OK</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default TransitionModal;
