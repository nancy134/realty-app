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
class AccountLoginModal extends React.Component {
    constructor(props){
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.emailRef = React.createRef();
        this.state = {
            email: "",
            password: ""
        };
    }
    handleLogin(){
        this.props.onLogin(this.state.email, this.state.password);
    }
    onEmailChange(event){
        this.setState({
            email: event.target.value.toLowerCase()
        });
    }
    onPasswordChange(event){
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
        return(
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.show}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.loginProgress ?
                <SavingAlert/>
                : null}
                {this.props.loginMessage ?
                <Alert variant={this.props.loginMessageVariant}>
                {this.props.loginMessage}
                </Alert>
                : null}
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    id="login_email_input" 
                    onChange={this.onEmailChange}
                    ref={this.emailRef}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    id="login_password_input" 
                    type="password" 
                    onChange={this.onPasswordChange}
                    onKeyPress={this.handleKeyPress}
                />
                <Button
                    onClick={this.props.onForgotPassword}
                    variant="link">Forgot password?</Button>
                <Button 
                    onClick={this.props.onRegisterStart} 
                    variant="link">Don't hava an account? Create one here
                </Button>
               
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>Cancel</Button>
                <Button 
                    id="login_button"
                    onClick={this.handleLogin}
                >
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default AccountLoginModal;
