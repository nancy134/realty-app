import React from 'react';
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';

class ContactModal extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.show}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Contact 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Row>
                        <Form.Label>Your email</Form.Label>
                        <Form.Control
                            type="text"
                        />
                    </Form.Row>
                    <Form.Row>
                        <Form.Label>Your message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows="5"
                        />
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Cancel</Button>
                <Button 
                    id="delete_button"
                    onClick={this.props.onSendMessage}
                >
                    Send Message 
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default ContactModal;
