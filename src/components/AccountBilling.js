import React from 'react';
import {
    Container,
    Button,
    Spinner,
    Row,
    Col
} from 'react-bootstrap';
import DropIn from 'braintree-web-drop-in-react';
import billingService from '../services/billing';

class AccountBilling extends React.Component {

    constructor(props){
        super(props);

        this.handleNoPaymentMethodRequestable = this.handleNoPaymentMethodRequestable.bind(this);
        this.handlePaymentMethodRequestable = this.handlePaymentMethodRequestable.bind(this);
        this.handlePaymentOptionSelected = this.handlePaymentOptionSelected.bind(this);
        this.handleInstance = this.handleInstance.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

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

    handleUpdate(){
        var that = this;
        this.setState({
            paymentSpinner: true
        });   
        this.instance.requestPaymentMethod().then(function(result){
            billingService.setPaymentMethod(result.nonce).then(function(paymentResult){
                console.log(paymentResult);
                 that.setState({
                     paymentSpinner: false,
                     showError: false,
                     errorMessage: "" 
                 });
            }).catch(function(err){
                console.log(err);
                that.setState({
                    paymentSpinner: false,
                    showError: true,
                    errorMessage: err.message
                });
            });
        }).catch(function(err){
            console.log(err);
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
        <Container className="p-5">
            <Row><Col xs={2}></Col><Col xs={8}>
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
            : null }
            </Col><Col xs={2}></Col></Row>


            <Row>
                <Col xs={4}></Col>
                <Col xs={4}>
                   <Button
                        onClick={this.handleUpdate}
                        disabled={!this.state.paymentMethodRequestable}
                        block
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
                        <span>Update Payment Method</span>}
                    </Button>
                </Col>
                <Col xs={4}></Col>
            </Row>
        </Container>
    </React.Fragment>
    );
    }
}

export default AccountBilling;
