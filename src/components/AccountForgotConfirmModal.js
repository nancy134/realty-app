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
class AccountForgotConfirmModal extends React.Component {
    constructor(props){
        super(props);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
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
    onCodeChange(event){
        this.setState({
            code: event.target.value
        });
    }
    onPasswordChange(event){
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
                {this.props.forotPasswordProgress ?
                <SavingAlert/>
                : null}
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
                    onChange={this.onCodeChange}
                    ref={this.codeRef}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    id="login_password_input"
                    type="password"
                    onChange={this.onPasswordChange}
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

export default AccountForgotConfirmModal;
