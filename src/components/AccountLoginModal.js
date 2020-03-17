import React from 'react';
import {
    Modal,
    Form,
    Button
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
        console.log("AccountLoginModel:handleLogin");
        console.log("email: "+this.state.email);
        console.log("password: "+this.state.password);
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
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={this.onEmailChange}/>
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={this.onPasswordChange}/>
                <Button variant="link">Forgot password?</Button>
                <Button onClick={this.props.onRegister} variant="link">Don't hava an account? Create one here</Button>
               
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
