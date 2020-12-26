import React from 'react';
import {
    Modal,
    Button,
    Spinner,
    Alert
} from 'react-bootstrap';
import DropIn from 'braintree-web-drop-in-react';
import billingService from '../services/billing';
import listingService from '../services/listings';

class PublishWizardPaymentMethod extends React.Component{
    constructor(props){
        super(props);

        this.handleNext = this.handleNext.bind(this);
        this.handleNoPaymentMethodRequestable = this.handleNoPaymentMethodRequestable.bind(this);
        this.handlePaymentMethodRequestable = this.handlePaymentMethodRequestable.bind(this);
        this.handlePaymentOptionSelected = this.handlePaymentOptionSelected.bind(this);
        this.handleInstance = this.handleInstance.bind(this);

        this.state = {
            clientToken: null,
            paymentMethodRequestable: false,
            paymentSpinner: false,
            showError: false,
            errorMessage: ""
        };
    }

    componentDidMount(){
        var that = this;
        billingService.getClientToken().then(function(result){
            that.setState({
                clientToken: result.clientToken
            });
        }).catch(function(err){
            this.setState({
                showError: true,
                errorMessage: err.message
            });
        });
    }

    handleNext(){
        var that = this;
        this.setState({
            paymentSpinner: true
        });   
        this.instance.requestPaymentMethod().then(function(result){
            billingService.setPaymentMethod(result.nonce).then(function(paymentResult){
                var listingId = that.props.listingDetail.listing.ListingId;
                listingService.publish(listingId).then(function(result){
                    that.setState({
                        paymentSpinner: false
                    });
                    that.props.onNext();
                }).catch(function(err){
                    that.setState({
                        paymentSpinner: false,
                        showError: true,
                        errorMessage: err.message
                    });
                });
            }).catch(function(err){
                that.setState({
                    paymentSpinner: false,
                    showError: true,
                    errorMessage: err.message
                });
            });
        }).catch(function(err){
            that.setState({
                paymentSpinner: false,
                showError: true,
                errorMessage: err.message
            });
        });
    }

    handleNoPaymentMethodRequestable(event){
        this.setState({
            paymentMethodRequestable: false
        });
    }
    handlePaymentMethodRequestable(event){
        this.setState({
            paymentMethodRequestable: true
        });
    }
    handlePaymentOptionSelected(event){
    }
    handleInstance(instance){
        this.instance = instance;
        if (this.instance.isPaymentMethodRequestable){
            this.setState({
                paymentMethodRequestable: true
            });
        }
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
                       Payment Method 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.state.showError ?
                    <Alert
                        variant="danger"
                    >
                        <span>{this.state.errorMessage}</span>
                    </Alert>
                    : null }
                    { this.state.clientToken ?
                    <DropIn
                        options={{
                            authorization: this.state.clientToken
                        }}
                        onInstance={this.handleInstance}
                        onNoPaymentMethodRequestable={this.handleNoPaymentMethodRequestable}
                        onPaymentMethodRequestable={this.handlePaymentMethodRequestable}
                        onPaymentOptionSelected={this.handlePaymentOptionSelected}
                    />
                    :
                    <Spinner
                        as="span"
                        animation="border"
                        size="lg"
                        role="status"
                        aria-hidden="true"
                    />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleNext}
                        disabled={!this.state.paymentMethodRequestable}
                    >
                        {this.state.paymentSpinner ?
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        :
                        <span>Next</span>}
                    </Button>

                </Modal.Footer>
            </Modal>
        );
    }
}

export default PublishWizardPaymentMethod;
