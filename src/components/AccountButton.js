import React from 'react';
import { Component } from 'react';
import {
    Modal,
    Form,
    Button,
    Dropdown,
    DropdownButton
} from 'react-bootstrap';

function ListingEditModal(props) {
    const standardProps = Object.assign({}, props);
    delete standardProps.onFinish;

    return (
        <Modal
            {...standardProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Email</Form.Label>
                <Form.Control />
                <Form.Label>Password</Form.Label>
                <Form.Control />
                <Button variant="link">Forgot password?</Button>
                <Button variant="link">Don't hava an account? Create one here</Button>
               
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onCancel}>Cancel</Button>
                <Button onClick={props.onFinish}>Login</Button>
            </Modal.Footer>
        </Modal>
    );
}

export class AccountButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            modalShow: false
        }
    }
    onCancel(){
        console.log("onCancel()");
    }
    onLogin(){
        console.log("onLogin()");
        this.setState({authenticated: true});
    }
    onMyAccount(){
        console.log("Go to my account");
        var url = window.location.protocol + "//" + window.location.hostname + "/account";
        window.location.href = url;
    }
    render(){
        return(
        <span>
            <span className="align-top text-danger">
            {this.state.authenticated ? 
                ( 
                <DropdownButton id="dropdown-item-button" title="Paul Piedra">
                    <Dropdown.Item as="button" onClick={() => {this.onMyAccount()}}>My Account</Dropdown.Item>
                    <Dropdown.Item as="button">My Listings</Dropdown.Item>
                    <Dropdown.Item as="button">Logout</Dropdown.Item>
                </DropdownButton> 
                )
                :( 
                <span>
                    <Button onClick={() => this.setState({modalShow: true})} variant="success">Login</Button>
                </span> 
                )}
            </span>
            <ListingEditModal
                show={this.state.modalShow}
                onCancel={() => {this.onCancel();this.setState({modalShow:false})}}
                onFinish ={() => {this.onLogin();this.setState({modalShow:false})}}
            />
        </span>
        );
    }
}
export default AccountButton;
