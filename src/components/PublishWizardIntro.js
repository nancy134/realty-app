import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';

class PublishWizardIntro extends React.Component{

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
                    <ul>
                        <li>Publishing a listing will make the listing available to the public</li>
                        <li>Once a listing is published its status will be "On Market"</li>
                        <li>You can publish a listing at no charge for thirty days</li>
                        <li>To allow your listing to remain "On Market" beyond thirty days, you will be charged $25 per month</li>
                        <li>You must enter a credit card to publish a listing but will not be charged until the listing has been "On Market" for thirty days</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.props.onNext}
                    >
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PublishWizardIntro;
