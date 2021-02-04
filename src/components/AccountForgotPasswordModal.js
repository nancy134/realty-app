import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';
import StepperAddListing from '../components/StepperAddListing';

class AccountForgotPasswordModal extends React.Component {
    constructor(props){
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.emailRef = React.createRef();
        this.state = {
            email: ""
        };
    }
    handleForgotPassword(){
        this.props.onForgotPassword(this.state.email);
    }
    handleEmailChange(event){
        this.setState({
            email: event.target.value.toLowerCase()
        });
    }
    handleKeyPress(target){
        if (target.charCode === 13){
            this.handleForgotPassword();
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
        var nextButton="Submit";
        var title="Forgot Password";
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
        var forgotPassword=true;
        var forgotPasswordActive=true;

        // Button
        var buttonDisabled = true;
        if (this.state.email !== ""){
            buttonDisabled = false;
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
                    forgotPassword={forgotPassword}
                    forgotPasswordActive={forgotPasswordActive}
                />
                : null }

                <Form className={formPadding}>
                { this.props.isWizard ?
                <h3>Forgot Password</h3>
                : null }
                {this.props.forgotPasswordMessage ?
                <Alert variant="danger">
                {this.props.forgotPasswrodMessage}
                </Alert>
                : null}
                <Alert variant="primary">
                Enter your email address and you will receive a code to allow you to change your password.
                </Alert>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    id="login_email_input" 
                    onChange={this.handleEmailChange}
                    ref={this.emailRef}
                />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onCancel}
                >{cancel}</Button>
                <Button 
                    id="login_button"
                    disabled={buttonDisabled}
                    onClick={this.handleForgotPassword}
                >
                { !this.props.progress ?
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

export default AccountForgotPasswordModal;
