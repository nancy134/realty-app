import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner,
    InputGroup
} from 'react-bootstrap';

class AccountLoginModal extends React.Component {
    constructor(props){
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
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
                <InputGroup>
                    <Form.Control
                        id="login_password_input" 
                        type={this.state.hidden ? 'password' : 'text'} 
                        onChange={this.onPasswordChange}
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
                    { !this.props.loginProgress ?
                    <span>Login</span>
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
