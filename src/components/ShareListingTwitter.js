import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import {
    TwitterShareButton,
    TwitterIcon
} from 'react-share';

class ShareListingTwitter extends React.Component{
    render(){
        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onCancel}
            animation={false}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>
                        Twitter Share 
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TwitterShareButton
                   url="https://local.phowma.com/listing/8"
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    id="button-add-listing-type-cancel"
                    onClick={this.props.onCancel}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    id="button-add-listing-type-next"
                    onClick={this.handleNext}
                >
                    Next
                </Button>
            </Modal.Footer>

        </Modal>
        );
    }
}
export default ShareListingTwitter;
