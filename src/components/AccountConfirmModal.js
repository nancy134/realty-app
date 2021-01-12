import React from 'react';
import {
    Modal,
    Form,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';

class AccountConfirmModal extends React.Component {
    constructor(props){
        super(props);
        this.handleCodeChange = this.handleCodeChange.bind(this);
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

    handleCodeChange(event){
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
                    onChange={this.handleCodeChange}
                    ref={this.codeRef}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onCancel}>Cancel</Button>
                <Button
                    onClick={this.handleConfirm}
                >
                    {!this.props.progress ?
                    <span>Confirm</span>
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

export default AccountConfirmModal;

