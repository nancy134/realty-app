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
class AccountRegisterModal extends React.Component {
    constructor(props){
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.emailRef = React.createRef();
        this.state = {
            email: "",
            password: ""
        };
    }
    handleRegister(){
        this.props.onRegister(this.state.email, this.state.password);
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
            this.handleRegister();
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.emailRef.current.focus();
        }, 500)
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
                {this.props.loginProgress ?
                <SavingAlert/>
                : null}
                {this.props.registerMessage ?
                <Alert variant="danger">
                {this.props.registerMessage}
                </Alert>
                : null }
                <Form.Label>Email</Form.Label>
                <Form.Control
                    onChange={this.onEmailChange}
                    ref={this.emailRef}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    onChange={this.onPasswordChange}
                    onKeyPress={this.handleKeyPress}
                />
                <div>Password must be at least 8 characters and contain at least one of each below:</div>
                <ul>
                    <li>Lowercase letter</li>
                    <li>Uppercase letter</li>
                    <li>One number</li>
                    <li>One special charater: ^  $  *  .  ?  - </li>
                </ul>
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
