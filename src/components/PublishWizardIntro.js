import React from 'react';
import {
    Modal,
    Button,
    Form,
    Spinner,
    Row,
    Col,
    Alert
} from 'react-bootstrap';
import billingService from '../services/billing';

class PublishWizardIntro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            termsAgreed: false,
            promoCode: "",
            hasPromoCode: false,
            validateProgress: true,
            errorMessage: "",

            userCode: null
        };
        this.handleViewTerms = this.handleViewTerms.bind(this);
        this.handleTermsChanged = this.handleTermsChanged.bind(this);
        this.handlePromoCodeChanged = this.handlePromoCodeChanged.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }
    handleViewTerms(){
        this.props.onShowPolicyModal("terms");
    }
    handleTermsChanged(){
        var termsAgreed = true;
        if (this.state.termsAgreed)
            termsAgreed = false;
        this.setState({
            termsAgreed: termsAgreed 
        });
    }
    handlePromoCodeChanged(e){
        this.setState({
            promoCode: e.target.value
        });
    }
    handleNext(){
        this.setState({
            validateProgress: true
        });
        var that = this;
        console.log("Checking to see if user has entered a valid promo code");
        if (this.state.promoCode.length > 0){
            var body = {
                code: this.state.promoCode
            };
            console.log("Checking to see if the promo code entered is valid");
            billingService.validatePromoCode(body).then(function(userCode){
                that.setState({
                    validateProgress: false,
                    hasPromoCode: true,
                    userCode: userCode
                });
                that.props.onNext(userCode);
            }).catch(function(err){
                console.log(err);
                that.setState({
                    validPromoCode: false,
                    validateProgress: false,
                    errorMessage: err.message
                });
            });
        } else {
            this.props.onNext(this.state.userCode);
        }
    }

    componentDidMount(){
        var that = this;
        console.log("Checking to see if user has valid promo code");
        billingService.getUserCodeMe().then(function(userCode){
            if (userCode){
                that.setState({
                    hasPromoCode: true,
                    userCode: userCode
                });
            }
        }).catch(function(err){
            console.log(err);
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
                    <p>Publishing a listing will make the listing visible to all visitors of FindingCRE.</p>
                    <p>By publishing a listing, you agree to our terms and conditions</p>
                    <Form>
                    <Row>
                    <Col xs={4}>
                    <Button
                        variant="light"
                        onClick={this.handleViewTerms}
                    >
                        <span>View Terms & Conditions</span>
                    </Button>

                    <Form.Check
                        className="pt-2"
                    >
                        <Form.Check.Input
                            type="checkbox"
                            id="wizard-publish-checkbox-terms"
                            checked={this.state.termsAgreed}
                            onChange={this.handleTermsChanged}
                        />
                        <Form.Check.Label>
                            <span>I agree to Terms & Conditions</span>
                        </Form.Check.Label>
                    </Form.Check> 

                    </Col>
                    <Col xs={4}>
                    { !this.state.hasPromoCode ?
                    <div className="pt-2" >
                        <Form.Label>Promotion Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.promoCode}
                            onChange={this.handlePromoCodeChanged}
                        />
                    </div>
                    : null }
                    </Col>
                    </Row>
                    </Form>
                    { this.state.errorMessage.length > 0 ?
                    <div className="pt-2">
                    <Alert
                        variant="danger"
                    >
                        {this.state.errorMessage}
                    </Alert>
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
                        disabled={!this.state.termsAgreed}
                        onClick={this.handleNext}
                        id="wizard-publish-intro-next"
                    >
                        { !this.props.validateProgress?
                        <span>Next</span>
                        :
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
        );
    }
}

export default PublishWizardIntro;
