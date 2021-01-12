import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';

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
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>Cancel</Button>
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

export default AccountForgotConfirmModal;
