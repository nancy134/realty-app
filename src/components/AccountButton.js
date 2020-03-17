import React from 'react';
import { Component } from 'react';
import {
    Button,
    Dropdown,
    DropdownButton
} from 'react-bootstrap';
import { isAuthenticated } from '../helpers/authentication';
import { getUserName } from '../helpers/authentication';
import { deleteUser } from '../helpers/authentication';
import { loginResponse } from '../helpers/authentication';
import AccountLoginModal from './AccountLoginModal';
import AccountRegisterModal from './AccountRegisterModal';

export class AccountButton extends Component{
    constructor(props){
        super(props);
        this.onRegister = this.onRegister.bind(this);
        this.state = {
            authenticated: false,
            modalShowLogin: false,
            modalShowRegister: false,
        }
    }
    componentDidMount(){
        if (isAuthenticated()){
            this.setState({authenticated: true});
        }
    }
    onCancel(){
        console.log("onCancel()");
    }
    onLogin(email, password){
        var that = this;
        console.log("onLogin()");
        console.log("email: "+email);
        console.log("password: "+password);
        var loginResponsePromise = loginResponse(email, password);
        loginResponsePromise.then(function(result){
            that.setState({authenticated: true});
            that.props.onLogin();
        }).catch(function(err){
           console.log("err: "+err);
        });
    }
    onRegister(email, password, confirmPassword){
        console.log("email: "+email);
        console.log("password: "+password);
        console.log("confirmPassword: "+confirmPassword);
        console.log("onRegister()");
    }
    onMyAccount(){
        console.log("Go to my account");
        var url = window.location.protocol + "//" + window.location.hostname + "/account";
        window.location.href = url;
    }
    onLogout(){
       deleteUser();
       this.setState({authenticated: false});
       this.props.onLogout();
    }
    render(){
        const userName = getUserName();
        return(
        <span>
            <span className="align-top text-danger">
            {this.state.authenticated ? 
                ( 
                <DropdownButton id="dropdown-item-button" title={userName}>
                    <Dropdown.Item as="button" onClick={() => {this.onMyAccount()}}>My Account</Dropdown.Item>
                    <Dropdown.Item as="button">My Listings</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => {this.onLogout()}}>Logout</Dropdown.Item>
                </DropdownButton> 
                )
                :( 
                <span>
                    <Button onClick={() => this.setState({modalShowLogin: true})} variant="success">Login</Button>
                </span> 
                )}
            </span>
            <AccountLoginModal
                show={this.state.modalShowLogin}
                onCancel={() => {this.onCancel();this.setState({modalShowLogin:false})}}
                onLogin ={(email, password) => {this.onLogin(email, password);this.setState({modalShowLogin:false})}}
                onRegisterStart={() => {this.setState({modalShowLogin:false,modalShowRegister:true})}}

            />
            <AccountRegisterModal
                show={this.state.modalShowRegister}
                onRegister={this.onRegister}
                onCancel={() => {this.onCancel();this.setState({modalShowRegister:false})}}
            />
        </span>
        );
    }
}
export default AccountButton;
