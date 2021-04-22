import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner,
    Row,
    Col
} from 'react-bootstrap';
import StepperAddListing from '../components/StepperAddListing';

class AccountRegisterModal extends React.Component {
    constructor(props){
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleLoginStart = this.handleLoginStart.bind(this);
        this.handleTerms = this.handleTerms.bind(this);
        this.handlePrivacyPolicy = this.handlePrivacyPolicy.bind(this);
        this.emailRef = React.createRef();
        this.state = {
            email: "",
            password: ""
        };
    }
    handleRegister(){
        this.props.onRegister(this.state.email, this.state.password);
    }
    handleEmailChange(event){
        this.setState({
            email: event.target.value.toLowerCase()
        });
    }
    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        });
    }

    handleKeyPress(target){
        if (target.charCode === 13){
            this.handleRegister();
        }
    }
    handleLoginStart(){
        this.props.onLoginStart();
    }
    handleTerms(){
        this.props.onTerms();
    }
    handlePrivacyPolicy(){
        this.props.onPrivacy();
    }
    componentDidMount(){
        setTimeout(() => {
            this.emailRef.current.focus();
        }, 500)
    }
    render(){

        // Wizard
        var className="";
        var animation=true;
        var nextButton="Create Account";
        var title="Create an Account";
        var cancel="Cancel";
        if (this.props.isWizard){
            className="modal-80w"
            animation=false;
            nextButton="Create Account";
            title="Create New Listing";
            cancel="Discard Changes";
        }

        // Stepper
        var addListingTypeActive=true;
        var addListingTypeCompleted=true;
        var addListingAddressActive=true;
        var addListingAddressCompleted=true;
        var addListingOverviewActive=true;
        var addListingOverviewCompleted=true;
        var notRegistered=true;
        var registerActive=true;
        var loginActive=false;
        var loginCompleted=false;

        // Button
        var buttonDisabled=true;
        if (this.state.email !== "" && this.state.password !== ""){
            buttonDisabled=false;
        }
        return(
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName={className}
            animation={animation}
            show={this.props.show}
            onHide={this.props.onCancel}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>{title}</span> 
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>

                { this.props.isWizard ?
                <StepperAddListing
                    addListingTypeActive={addListingTypeActive}
                    addListingTypeCompleted={addListingTypeCompleted}
                    addListingAddressActive={addListingAddressActive}
                    addListingAddressCompleted={addListingAddressCompleted}
                    addListingOverviewActive={addListingOverviewActive}
                    addListingOverviewCompleted={addListingOverviewCompleted}
                    notRegistered={notRegistered}
                    registerActive={registerActive}
                    loginActive={loginActive}
                    loginCompleted={loginCompleted}
                />
                : null }
                <Row>
                    <Col xs={2}></Col>
                    <Col>
                        <Form>
                            {this.props.isWizard ?
                            <h3>Create an Account</h3>
                            : null }
                            {this.props.registerMessage ?
                            <Alert variant="danger">
                               {this.props.registerMessage}
                            </Alert>
                            : null }
                            <h6>Creating an account will allow you to publish your listings and to save reports.</h6>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                onChange={this.handleEmailChange}
                                ref={this.emailRef}
                            />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={this.handlePasswordChange}
                                onKeyPress={this.handleKeyPress}
                            />
                            <Row className="text-info">
                                <Col>
                                    <li style={{"font-size": "0.75rem"}}>One lowercase letter</li>
                                    <li style={{"font-size": "0.75rem"}}>One uppercase letter</li>
                                </Col>
                                <Col>
                                    <li style={{"font-size": "0.75rem"}}>One number</li>
                                    <li style={{"font-size": "0.75rem"}}>One special charater: ^  $  *  .  ?  - </li>
                                </Col>
                            </Row>
                            <Button
                                className="pl-0 pr-0"
                                variant="link">Already have an account?
                            </Button>
                            <Button
                                className="text-info pl-1"
                                onClick={this.props.onLoginStart}
                                variant="link"><u>Login here</u></Button>
                        </Form>
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                <Row>
                    <Col xs={2}></Col><Col>
                        <p style={{"font-size":"0.8rem"}}>
                            <span>By selecting Create Account you agree to our </span>
                            <span
                                onClick={this.handleTerms}
                                className="text-info addPointer">Terms & Conditions</span>
                            <span> and </span>
                            <span
                                onClick={this.handlePrivacyPolicy}
                                className="text-info addPointer">Privacy Policy</span>
                        </p>
                    </Col><Col xs={2}></Col>
                </Row> 
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>{cancel}</Button>
                <Button
                    disabled={buttonDisabled}
                    onClick={this.handleRegister}
                >
                    {!this.props.progress ?
                    <span>{nextButton}</span>
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
        );
    }
}

export default AccountRegisterModal;
