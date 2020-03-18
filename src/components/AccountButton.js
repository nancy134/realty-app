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
import { 
    loginResponse,
    signupResponse,
    confirmResponse
} from '../helpers/authentication';
import AccountLoginModal from './AccountLoginModal';
import AccountRegisterModal from './AccountRegisterModal';
import AccountConfirmModal from './AccountConfirmModal';

export class AccountButton extends Component{
    constructor(props){
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.state = {
            authenticated: false,
            modalShowLogin: false,
            modalShowRegister: false,
            modalShowConfirm: false
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
        console.log("onRegister()");
        var that = this;
        console.log("email: "+email);
        console.log("password: "+password);
        console.log("confirmPassword: "+confirmPassword);
        var signupResponsePromise = signupResponse(email,password,confirmPassword);
        signupResponsePromise.then(function(result){
            that.setState({
                email:email,
                modalShowRegister:false,
                modalShowConfirm:true
            });

            that.props.onRegister();
        }).catch(function(err){
            console.log("err: "+err);
        });
    }
    onConfirm(email,code){
        console.log("onConfirm()");
        var that = this;
        console.log("email: "+email);
        console.log("code: "+code);
        var confirmResponsePromise = confirmResponse(email, code);
        confirmResponsePromise.then(function(result){
            that.setState({modalShowConfirm:false})
            that.props.onConfirm();
        }).catch(function(err){
            console.log("err: "+err);
        });
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
                onRegister={(email,password,confirmPassword) =>{this.onRegister(email,password,confirmPassword);}}
                onCancel={() => {this.onCancel();this.setState({modalShowRegister:false})}}
            />
            <AccountConfirmModal
                show={this.state.modalShowConfirm}
                email={this.state.email}
                onConfirm={(email,code) =>{this.onConfirm(email,code);this.setState({modalShowConfirm:false});}}
                onCancel={() => {this.onCancel();this.setState({modalShowConfirm:false})}}
            />

        </span>
        );
    }
}
export default AccountButton;
