import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';

function SavingAlert(){
    return(
    <div className="w-100">
       <Spinner animation="border" />
    </div>
    );
}
class AccountForgotPasswordModal extends React.Component {
    constructor(props){
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
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
    onEmailChange(event){
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
                {this.props.forotPasswordProgress ?
                <SavingAlert/>
                : null}
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
                    onChange={this.onEmailChange}
                    ref={this.emailRef}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>Cancel</Button>
                <Button 
                    id="login_button"
                    onClick={this.handleForgotPassword}
                >
                    Submit 
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default AccountForgotPasswordModal;
