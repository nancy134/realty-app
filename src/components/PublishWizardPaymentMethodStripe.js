import React from 'react';
import {
    Modal,
    Button,
    Spinner,
    Alert,
    Row,
    Col
} from 'react-bootstrap';
import {loadStripe} from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    ElementsConsumer
} from '@stripe/react-stripe-js';
import billingService from '../services/billing';
import listingService from '../services/listings';

const stripePromise = loadStripe('pk_test_51Ir2U5C1MmnpS2EUG96WeToQkpn94auhdVlMXPpfFh7lKU3gDEZk4WOTBC87PnbPnsnoxDFMtJflcgY9IozuEfBw00AICgHAQa');

class CheckoutForm extends React.Component {
    render() {
        return (
        <div>
            <CardElement />
        </div>
        );
    }
}

class PublishWizardPaymentMethod extends React.Component{
    constructor(props){
        super(props);

        this.handleNext = this.handleNext.bind(this);
        this.state = {
            paymentSpinner: false,
            creditCardEntered: false
        }
    }

    handleNext(stripe, elements){
        var cards = elements.getElement(CardElement);
        console.log(cards);

        var that = this;
        this.setState({
            paymentSpinner: true
        });
        if (!this.state.defaultPaymentMethod && !this.state.creditCardEntered && !this.state.validPromoCode){
            billingService.getPaymentSecret().then(function(secret){
                console.log("secret:");
                console.log(secret);
                stripe.confirmCardSetup(secret.paymentSecret,{
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                }).then(function(result){
                    billingService.getPaymentMethodMe().then(function(paymentMethods){
                        console.log("paymentMethod:");
                        console.log(paymentMethods);    
                        that.setState({
                            defaultPaymentMethod: paymentMethods.data[0].card,
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
                    console.log(err);
                });
            }).catch(function(err){
                that.setState({
                    paymentSpinner: false,
                    showError: true,
                    errorMessage: err.message
                });

                console.log(err);
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

    componentDidMount(){
        var that = this;

        console.log("Checking to see if user has a validated promo code");
        if (that.props.userCode){
            that.setState({
                validPromoCode: true
            });
        } else {
            billingService.getPaymentMethodMe().then(function(paymentMethods){
                if (paymentMethods.data.length > 0){
                    that.setState({
                        defaultPaymentMethod: paymentMethods.data[0].card
                    });
                }
                console.log(paymentMethods);
            }).catch(function(err){
                that.setState({
                    defaultPaymentMethod: false
                });
            });
        }
    }
    render(){
        // Three flows
        // 1. Promotion code
        // 2. Enter credit card
        // 3. Default payment method
        var promotionCodeFlow = false;
        var enterCreditCardFlow = false;
        var defaultPaymentMethodFlow = false;
        if (this.props.userCode){
            promotionCodeFlow = true;
        } else if (this.state.defaultPaymentMethod){
            defaultPaymentMethodFlow = true;
        } else {
            enterCreditCardFlow = true;
        }

        var buttonText = "Publish Listing";
        if (enterCreditCardFlow){
            buttonText = "Verify Card";
        }
        return(
        <Elements stripe={stripePromise}>
        <ElementsConsumer>
        {({stripe, elements}) => (

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
                    { enterCreditCardFlow ?
                    <div>
                        <CheckoutForm stripe={stripe} elements={elements} onSave={() => this.handleSaveCreditCard(elements)}/>
                    </div>
                    : null }
                    { defaultPaymentMethodFlow ?
                    <div style={{'height': '60vh'}}>
                            <p>The default credit card on file will be billed according to the payment schedule detailed in the <span>Terms & Conditions</span></p>
                               <Alert variant="info">
                                <Row>
                                    <Col>
                                        <span>{this.state.defaultPaymentMethod.brand}</span>
                                        <span> ending in {this.state.defaultPaymentMethod.last4}</span>
                                    </Col>
                                </Row>
                             </Alert>
                    </div>
                    : null }
                    { promotionCodeFlow ?
                    <div>
                        <p>Your Promotion Code is valid</p>
                        <p>{this.props.userCode.Code.Promotion.description}</p>
                    </div>
                    : null }
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.handleNext(stripe, elements)}
                    >
                        <span>{buttonText}&nbsp;
                        { this.state.paymentSpinner ?
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        : null}
                        </span>
                    </Button>
                </Modal.Footer>
            </Modal>
        )}
        </ElementsConsumer>
        </Elements>
        );
    }
}

export default PublishWizardPaymentMethod;
