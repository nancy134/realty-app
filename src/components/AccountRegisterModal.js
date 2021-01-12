import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';

class AccountRegisterModal extends React.Component {
    constructor(props){
        super(props);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
    handleEmailChange(event){
        this.setState({
            email: event.target.value.toLowerCase()
        });
    }
    handlePasswordChange(event){
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
                {this.props.registerMessage ?
                <Alert variant="danger">
                {this.props.registerMessage}
                </Alert>
                : null }
                <Form.Label>Email</Form.Label>
                <Form.Control
                    onChange={this.handleEmailChange}
                    ref={this.emailRef}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    onChange={this.handlePasswordChange}
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
                <Button
                    onClick={this.handleRegister}
                >
                    {!this.props.progress ?
                    <span>Register</span>
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

export default AccountRegisterModal;
