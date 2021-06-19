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
import userService from '../services/users';

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
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.emailRef = React.createRef();
        this.state = {
            email: "",
            password: "",
            roles: [],
            role: "" 
        };
    }
    handleRegister(){
        var body = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };
        this.props.onRegister(body);
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
    handleRoleChange(e){
        this.setState({
            role: e.target.value
        });
    }
    componentDidMount(){
        var that = this;
        userService.getUserEnums().then(function(enums){
            that.setState({
                roles: enums.roles,
                role: enums.roles[0]
            });
            setTimeout(() => {
                that.emailRef.current.focus();
            }, 500)
        }).catch(function(err){
        });
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
                                    <li className="rem75">One lowercase letter</li>
                                    <li className="rem75">One uppercase letter</li>
                                </Col>
                                <Col>
                                    <li className="rem75">One number</li>
                                    <li className="rem75">One special charater: ^  $  *  .  ?  - </li>
                                </Col>
                            </Row>
                            <Form.Label>Your Role</Form.Label>
                            <Form.Control
                                as="select"
                                value={this.state.role}
                                onChange={this.handleRoleChange}
                            >
                                {this.state.roles.map((role, index) =>
                                (
                                <option key={index}>{role}</option>
                                ))}
                            </Form.Control>
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
                        <p className="rem80">
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
                    <span>
                        <span>{nextButton}&nbsp;</span>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </span>
                    }
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default AccountRegisterModal;
