import React from 'react';
import {
    Modal,
    Button,
    Form,
    Alert
} from 'react-bootstrap';

class UserModal extends React.Component {
    constructor(props){
        super(props);

        this.handleSetUser = this.handleSetUser.bind(this);
        this.handleBehalfUserChange = this.handleBehalfUserChange.bind(this);

        this.state = {
            behalfUser: ""
        }
    }

    handleSetUser(){
        this.props.onSetBehalfUser(this.state.behalfUser);
    }

    handleBehalfUserChange(e){
        this.setState({
            behalfUser: e.target.value
        });
    }

    render(){
        var disableSetUser = true;
        if (this.state.behalfUser && this.state.behalfUser !== ""){
            disableSetUser = false;
        }
        return(
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={this.props.show}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Select User 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.props.behalfUserError ?
                    <Alert
                        variant="danger"
                    >{this.props.behalfUserError}</Alert>
                    : null }
                    <Form>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.behalfUser}
                            onChange={this.handleBehalfUserChange}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button 
                        disabled={disableSetUser}
                        onClick={this.handleSetUser}
                    >
                        Set User
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UserModal;
