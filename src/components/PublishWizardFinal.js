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
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title
                    >
                       Publish a Listing
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>Congratulations!</h2>
                    <p>You listing is has been published and visible to all visitors on FindingCRE.com!</p>
                    <p>Easy access to any listings you have created are available on the “My Listings” tab.  A listing can be taken off market at any time by editing the listing and clicking the “Take Off Market”.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        id="wizard-publish-finish"
                        onClick={this.props.onFinish}
                    >
                        <span>Finish</span> 
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PublishWizardFinal;
