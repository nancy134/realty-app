import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';
import StepperAddListing from '../components/StepperAddListing';

class AccountForgotConfirmModal extends React.Component {
    constructor(props){
        super(props);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.codeRef = React.createRef();
        this.state = {
            code: "",
            password: ""
        };
    }
    handleForgotPassword(){
        this.props.onForgotPassword(this.state.code, this.state.password);
    }
    handleCodeChange(event){
        this.setState({
            code: event.target.value
        });
    }
    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        });
    }
    handleKeyPress(target){
        if (target.charCode === 13){
            this.handleForgotPassword();
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.codeRef.current.focus();
        }, 1)
    }
    render(){

        // Wizard
        var className="";
        var animation=true;
        var nextButton="Submit"
        var title="Forgot Password Confirm";
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
        var forgotPasswordCompleted=true;
        var forgotConfirmActive=true;

        // Button
        var buttonDisabled=true;
        if (this.state.code !== "" && this.state.password !== ""){
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
                    forgotPassword={forgotPassword}
                    forgotPasswordActive={forgotPasswordActive}
                    forgotPasswordCompleted={forgotPasswordCompleted}
                    forgotConfirmActive={forgotConfirmActive}
                />
                : null }
                <Form className={formPadding}>
                { this.props.isWizard ?
                <h3>Forgot Password Confirm</h3>
                : null }
                {this.props.forgotPasswordMessage ?
                <Alert variant="danger">
                {this.props.forgotPasswrodMessage}
                </Alert>
                : null}
                <Alert variant="primary">
                Enter the security code you received in your email and your new password
                </Alert>
                <Form.Label>Code</Form.Label>
                <Form.Control 
                    id="login_code_input" 
                    onChange={this.handleCodeChange}
                    ref={this.codeRef}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    id="login_password_input"
                    type="password"
                    onChange={this.handlePasswordChange}
                />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>{cancel}</Button>
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

export default AccountForgotConfirmModal;
