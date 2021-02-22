import React from 'react';
import {
    Row,
    Col,
    Modal,
    Button,
    Spinner,
    Alert,
    Image
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
            errorMessage: "",
            creditCardEntered: false
        };
    }

    componentDidMount(){
        var that = this;
        billingService.getClientToken().then(function(result){
            billingService.getPaymentMethod().then(function(paymentMethod){
                if (paymentMethod.creditCards.length > 0){
                    var defaultPaymentMethod = null;
                    for (var i=0; i<paymentMethod.creditCards.length; i++){
                        if (paymentMethod.creditCards[i].default === true){
                            defaultPaymentMethod = paymentMethod.creditCards[i];
                        } 
                    }
                    that.setState({
                        defaultPaymentMethod: defaultPaymentMethod
                    });
                }
            }).catch(function(err){
                if (err.errorCode === "notFoundError"){
                    that.setState({
                        clientToken: result.clientToken
                    });
                } else {
                    that.setState({
                        showError: true,
                        errorMessage: err.message
                    });
                }
            });
        }).catch(function(err){
            that.setState({
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

        if (!this.state.defaultPaymentMethod && !this.state.creditCardEntered){
        this.instance.requestPaymentMethod().then(function(result){
            billingService.setPaymentMethod(result.nonce).then(function(paymentResult){
                that.setState({
                    paymentSpinner: false,
                    creditCardEntered: true
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
        } else {
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
        }        
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
                animation={false}
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
                    { !this.state.defaultPaymentMethod ?
                    <div style={{'height': '60vh'}}>
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
                    </div>
                    : null}
                    {this.state.defaultPaymentMethod ?
                    <div style={{'height': '60vh'}}>
                            <p>The default credit card on file will be billed according to the payment schedule detailed in the <span>Terms & Conditions</span></p>
                               <Alert variant="info">
                                <Row>
                                    <Col xs={1}>
                                        <Image src={this.state.defaultPaymentMethod.imageUrl}/>
                                    </Col>
                                    <Col>
                                        <span>{this.state.defaultPaymentMethod.cardType}</span>
                                        <span> ending in {this.state.defaultPaymentMethod.last4}</span>
                                    </Col>
                                </Row>
                             </Alert>
                    </div>
                    : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleNext}
                        disabled={!this.state.paymentMethodRequestable && !this.state.defaultPaymentMethod}
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
