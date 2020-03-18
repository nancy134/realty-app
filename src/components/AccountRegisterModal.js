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
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            email: "",
            password: ""
        };
    }
    handleRegister(){
        console.log("handleRegister()");
        console.log("this.state.email: "+this.state.email);
        console.log("this.state.passwrd: "+this.state.password);
        this.props.onRegister(this.state.email, this.state.password);
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
                    Register
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={this.onEmailChange}/>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={this.onPasswordChange}/>
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
