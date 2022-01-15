import React from 'react';
import {
    Modal
} from 'react-bootstrap';
import {
    LinkedinShareButton,
    LinkedinIcon
} from 'react-share';

class ShareListingLinkedIn extends React.Component{
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
                <LinkedinShareButton
                   url="https://local.phowma.com/listing/8"
                >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </Modal.Body>
        </Modal>
        );
    }
}
export default ShareListingLinkedIn;
