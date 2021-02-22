import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import listingService from '../services/listings';

class PublishWizardUpdate extends React.Component{
    constructor(props){
        super(props);
        this.handlePublish = this.handlePublish.bind(this);
    }
    handlePublish(){
        var that=this;
        var listingId = that.props.listingDetail.listing.ListingId;
        listingService.publish(listingId).then(function(result){
            that.setState({
                paymentSpinner: false
            });
            that.props.onFinish();
        }).catch(function(err){
            that.setState({
                paymentSpinner: false,
                showError: true,
                errorMessage: err.message
            });
        });
    }
    render(){
        return(
        <React.Fragment>
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
                    <p>Select the Publish button to make your changes available to the public.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handlePublish}
                    >
                        Publish 
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
        );
    }
}

export default PublishWizardUpdate;
