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

class AccountConfirmModal extends React.Component {
    constructor(props){
        super(props);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.codeRef = React.createRef();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            code: ""
        };
    }
    handleConfirm(){
       this.props.onConfirm(this.props.email,this.state.code);
    }

    onCodeChange(event){
        this.setState({
            code: event.target.value
        });
    }
    handleKeyPress(target){
        if (target.charCode === 13){
            this.handleConfirm();
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
                    Register
                </Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                {this.props.loginProgress ?
                <SavingAlert/>
                : null}
                <Alert variant="primary">
                    <p>Check your email for verification code.</p>
                    <p>Email was sent to {this.props.email}</p>
                </Alert>
                {this.props.confirmMessage ?
                <Alert variant="danger">
                {this.props.confirmMessage}
                </Alert>
                : null }
                <Form.Label>Code</Form.Label>
                <Form.Control
                    onChange={this.onCodeChange}
                    ref={this.codeRef}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>Cancel</Button>
                <Button onClick={this.handleConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default AccountConfirmModal;

