import React, { Component} from 'react';
import {
    Form,
    Button,
    Alert,
    Modal
} from 'react-bootstrap';
import userService from '../services/users';

export class EmailRegistration extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            confirmation: false,
            showModal: false
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleHideModal = this.handleHideModal.bind(this);
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        });
    }

    handleEmailSubmit(){
        console.log("handleEmailSubmit: "+this.state.email);
        var body = {
            email: this.state.email,
            optout: false 
        };
        var that = this;
        userService.optInUser(body).then(function(result){
            that.setState({
                confirmation:true,
                showModal: false
            });
            console.log(result);
        }).catch(function(err){
            console.log(err);
        });
    }

    handleShowModal(){
        this.setState({
            showModal: true
        });
    }

    handleHideModal(){
        this.setState({
            showModal: false
        });
    }

    render(){
        return(
        <React.Fragment>
            { !this.state.confirmation ?
            <div className="text-center">
            <div>Receive notifications when new listings are posted</div>
            <Button
                onClick={this.handleShowModal}
            >
                Register Here 
            </Button>
            </div>
            : null }
            { this.state.showModal ?
            <Modal
                show={this.state.showModal}
            >
                <Modal.Body>
                    <Form>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        >
                        </Form.Control>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.handleHideModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleEmailSubmit}
                    >
                        Register 
                    </Button>
                </Modal.Footer>
            </Modal>
            : null }       
            { this.state.confirmation ?
            <Alert>
                <div className="text-center font-weight-bold">Thank you for registering to receive email notifications of new listings!</div>
            </Alert>
            : null }
        </React.Fragment>
        );
    }
}

export default EmailRegistration;
