import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner
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
    componentDidMount(){
        setTimeout(() => {
            this.emailRef.current.focus();
        }, 500)
    }
    render(){

        // Wizard
        var className="";
        var animation=true;
        var nextButton="Register";
        var title="Register";
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
                <Form className={formPadding}>
                { this.props.isWizard ?
                <h3>Register Account</h3>
                : null }
                {this.props.registerMessage ?
                <Alert variant="danger">
                {this.props.registerMessage}
                </Alert>
                : null }
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
                <div>Password must be at least 8 characters and contain:</div>
                <ul>
                    <li>One lowercase letter AND</li>
                    <li>One uppercase letter AND</li>
                    <li>One number AND</li>
                    <li>One special charater: ^  $  *  .  ?  - </li>
                </ul>
               <Button
                    onClick={this.props.onLoginStart}
                    variant="link">Already have an account? Login here
                </Button>

                </Form>
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
