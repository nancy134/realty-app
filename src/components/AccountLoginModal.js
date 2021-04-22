import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner,
    InputGroup,
    Row,
    Col
} from 'react-bootstrap';
import StepperAddListing from '../components/StepperAddListing';

class AccountLoginModal extends React.Component {
    constructor(props){
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.emailRef = React.createRef();
        this.toggleShow = this.toggleShow.bind(this);
        this.state = {
            email: "",
            password: "",
            hidden: true
        };
    }
    toggleShow(){
        this.setState({
            hidden: !this.state.hidden
        });
    }
    handleLogin(){
        this.props.onLogin(this.state.email, this.state.password);
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
            this.handleLogin();
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.emailRef.current.focus();
        }, 1)
    }
    render(){

        // Wizard
        var className="";
        var animation=true;
        var nextButton="Login"
        var title="Login";
        var cancel="Cancel";
        var formPadding="";
        if (this.props.isWizard){
            className="modal-80w"
            animation=false;
            nextButton="Next";
            title="Create New Listing";
            cancel="Discard Changes";
            formPadding="pl-5 pr-5 ml-5 mr-5";
        }

        // Stepper
        var addListingTypeCompleted=true;
        var addListingAddressCompleted=true;
        var addListingOverviewCompleted=true;
        var forgotPassword=this.props.forgotPassword;
        var forgotPasswordCompleted=true;
        var forgotConfirmCompleted=true;
        var notRegistered=this.props.notRegistered;
        var registerCompleted=true;
        var confirmCompleted=true;
        var loginActive=true;
        var loginCompleted=false;

        // Button
        var buttonDisabled = true;
        if (this.state.email !== "" && this.state.password !== ""){
            buttonDisabled = false;
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
                    addListingTypeCompleted={addListingTypeCompleted}
                    addListingAddressCompleted={addListingAddressCompleted}
                    addListingOverviewCompleted={addListingOverviewCompleted}
                    forgotPassword={forgotPassword}
                    forgotPasswordCompleted={forgotPasswordCompleted}
                    forgotConfirmCompleted={forgotConfirmCompleted}
                    notRegistered={notRegistered}
                    registerCompleted={registerCompleted}
                    confirmCompleted={confirmCompleted}
                    loginActive={loginActive}
                    loginCompleted={loginCompleted}
                />
                : null }
                <Row>
                <Col xs={2}></Col>
                <Col>
                <Form className={formPadding}>
                { this.props.isWizard ?
                <h3>Login</h3>
                : null }

                {this.props.loginMessage ?
                <Alert variant={this.props.loginMessageVariant}>
                {this.props.loginMessage}
                </Alert>
                : null}
                
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    id="login-email-input" 
                    onChange={this.handleEmailChange}
                    ref={this.emailRef}
                />
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control
                        id="login-password-input" 
                        type={this.state.hidden ? 'password' : 'text'} 
                        onChange={this.handlePasswordChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="secondary"
                            onClick={this.toggleShow}
                        >{this.state.hidden ? 'Show' : 'Hide'}</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Button
                    onClick={this.props.onForgotPassword}
                    variant="link"
                    className="pl-0 text-info"><u>Forgot password</u>?</Button>
                <Button
                    variant="link"
                    className="pr-1"
                >Don't have an account?</Button>
                <Button 
                    onClick={this.props.onRegisterStart} 
                    variant="link"
                    className="pl-0 text-info"><u>Create one here</u>
                </Button>
                </Form> 
                </Col>
                <Col xs={2}></Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>{cancel}</Button>
                <Button
                    disabled={buttonDisabled}
                    id="login-button"
                    onClick={this.handleLogin}
                >
                    { !this.props.loginProgress ?
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

export default AccountLoginModal;
