import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';

class PublishWizardFinal extends React.Component{
    render(){
        return(
            <Modal
                show={this.props.show}
                backdrop='static'
                dialogClassName="modal-60w"
            >
                <Modal.Header>
                    <Modal.Title
                    >
                       Publish a Listing
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Congratulations!</h1>
                    <p>Your listing is now public on All Commerical Listings.</p>
                    <p>It will be publish for FREE for the first 30 days.</p>
                    <p>After 30 days you will be charged $25/mo for each listing</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.onClose}
                    >
                        Close 
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PublishWizardFinal;
