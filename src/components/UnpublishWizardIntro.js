import React from 'react';
import {
    Modal,
    Button,
    Spinner
} from 'react-bootstrap';
import listingService from '../services/listings';

class UnpublishWizardIntro extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            spinner: false
        };
        this.handleFinish = this.handleFinish.bind(this);
    }

    handleFinish(){
        var that = this;
        var listingId = this.props.listingDetail.listing.ListingId;
        listingService.unpublish(listingId).then(function(result){
            that.setState({
                spinner: false
            });
        }).catch(function(err){
            that.setState({
                showError: true,
                errMessage: err.message
            });
        });
        this.props.onFinish();
    }
    
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
                       Take listing off market 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>When you take a listing off market it will no longer be send by the public</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleFinish}
                    >
                        { this.state.spinner ?
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        :
                        <span>Take off Market</span>
                        } 
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UnpublishWizardIntro;
