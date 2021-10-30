import React from 'react';
import {
    Container,
    Button,
    Spinner,
    Row,
    Col,
    Alert
} from 'react-bootstrap';
import {loadStripe} from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    ElementsConsumer
} from '@stripe/react-stripe-js';
import billingService from '../services/billing';

const stripePromise = loadStripe('pk_test_51Ir2U5C1MmnpS2EUG96WeToQkpn94auhdVlMXPpfFh7lKU3gDEZk4WOTBC87PnbPnsnoxDFMtJflcgY9IozuEfBw00AICgHAQa');


class CheckoutForm extends React.Component {
    render() {
        return (
        <div style={{"width": "50%" }}>
            <CardElement />
        </div>
        );
    }
}
class AccountPaymentMethodStripe extends React.Component {

    constructor(props){
        super(props);

        this.state = {
        };
    }

    componentDidMount(){
        var that = this;

        billingService.getUserCodeMe().then(function(userCode){
            if (userCode){
                that.setState({
                    hasPromoCode: true,
                    userCode: userCode,
                    validPromoCode: true
                });
            } else {
                billingService.getPaymentMethodMe().then(function(paymentMethods){
                    if (paymentMethods.data.length > 0){
                        that.setState({
                            defaultPaymentMethod: paymentMethods.data[0].card
                        });
                    }
                }).catch(function(err){
                    that.setState({
                        defaultPaymentMethod: false
                    });
                });
            }

        }).catch(function(err){
            console.log(err);
        });
    }

    handleAddCreditCard(stripe, elements){
            var that = this;
            billingService.getPaymentSecret().then(function(secret){
                stripe.confirmCardSetup(secret.paymentSecret,{
                    payment_method: {
                        card: elements.getElement(CardElement)
                    }
                }).then(function(result){
                    billingService.getPaymentMethodMe().then(function(paymentMethods){
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
                console.log(err);
            });
    }
    render(){
        var promotionCodeFlow = false;
        var enterCreditCardFlow = false;
        var defaultPaymentMethodFlow = false;
        if (this.state.userCode){
            promotionCodeFlow = true;
        } else if (this.state.defaultPaymentMethod){
            defaultPaymentMethodFlow = true;
        } else {
            enterCreditCardFlow = true;
        }
        return(
        <Elements stripe={stripePromise}>
        <ElementsConsumer>
        {({stripe, elements}) => (
        <React.Fragment>
            <Container className="p-5">
                { enterCreditCardFlow ?
                    <div>
                        <p>Please enter credit card information</p>
                        <p>________________________________________________________________</p>
                        <CheckoutForm stripe={stripe} elements={elements} onSave={() => this.handleSaveCreditCard(elements)}/>
                        <p>________________________________________________________________</p>
                        <Button
                            onClick={() => this.handleAddCreditCard(stripe, elements)}
                        >
                            <span>Add Credit Card&nbsp;
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
                        <p>Your Promotion Code is valid: {this.state.userCode.Code.code}</p>
                        <p>{this.state.userCode.Code.Promotion.description}</p>
                    </div>
                : null }
            </Container>
        </React.Fragment>
        )}
        </ElementsConsumer>
        </Elements>
        );
    }
}

export default AccountPaymentMethodStripe;
