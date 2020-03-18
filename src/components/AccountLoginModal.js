import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert
} from 'react-bootstrap';

class AccountLoginModal extends React.Component {
    constructor(props){
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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
            email: event.target.value
        });
    }
    onPasswordChange(event){
        this.setState({
            password: event.target.value
        });
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
                <Alert variant="danger">
                {this.props.loginMessage}
                </Alert>
                : null}
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={this.onEmailChange}/>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={this.onPasswordChange}/>
                <Button variant="link">Forgot password?</Button>
                <Button onClick={this.props.onRegisterStart} variant="link">Don't hava an account? Create one here</Button>
               
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>Cancel</Button>
                <Button onClick={this.handleLogin}>Login</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default AccountLoginModal;
