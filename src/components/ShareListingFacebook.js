import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import {
    FacebookShareButton,
    FacebookIcon
} from 'react-share';

class ShareListingFacebook extends React.Component{
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
                        Facebook Share 
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FacebookShareButton
                   url="https://local.phowma.com/listing/8"
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
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
export default ShareListingFacebook;
