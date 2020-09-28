import React from 'react';
import {
    Modal,
    Button,
    Spinner
} from 'react-bootstrap';

class TransitionModal extends React.Component {
    constructor(props){
        super(props);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleUnpublish = this.handleUnpublish.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handlePublish(){
        this.props.onPublish();
    }
    handleUnpublish(){
        this.props.onUnpublish();
    }
    handleCancel(){
        this.props.onCancel();
    }
    render(){
        var publish = false;
        var unpublish = false;
        if (this.props.transition === "Take off Market"){
           unpublish = true;
        } else if (this.props.transition === "Publish"){
           publish = true;
        } else if (this.props.transition === "Put on Market"){
           publish = true;
        } 
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
                <div>{this.props.message}</div>
                {this.props.saving ?
                <div>Saving...<Spinner animation="border" /></div>
                : null}
                <div>{this.props.transitionMessage}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleCancel}>Cancel</Button>
                { publish ?
                <Button 
                    id="transition_publish_button"
                    onClick={this.handlePublish}
                >
                    Publish
                </Button>
                : null}
                { unpublish ?
                <Button onClick={this.handleUnpublish}>Take off market</Button>
                : null}
            </Modal.Footer>
        </Modal>
        );
    }
}

export default TransitionModal;
