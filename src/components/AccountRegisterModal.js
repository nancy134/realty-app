import React from 'react';
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap';

class AccountRegisterModal extends React.Component {
    constructor(props){
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            email: "",
            password: "",
            confirmPassword: ""
        };
    }
    handleRegister(){
        console.log("handleRegister()");
        this.props.onRegister(this.state.email, this.state.password, this.state.confirmPassword);
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
    onConfirmPasswordChange(event){
        this.setState({
            confirmPassword: event.target.value
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
                    Register
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={this.onEmailChange}/>
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={this.onPasswordChange}/>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control onChange={this.onConfirmPasswordChange}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>Cancel</Button>
                <Button onClick={this.handleRegister}>Register</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default AccountRegisterModal;
