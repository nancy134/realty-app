import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';

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
        return(
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.show}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Forgot Password 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onCancel}
                >Cancel</Button>
                <Button 
                    id="login_button"
                    onClick={this.handleForgotPassword}
                >
                { !this.props.progress ?
                    <span>Submit</span>
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
