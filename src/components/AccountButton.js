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
            modalShowConfirm: false,
            loginMessage: null,
            registerMessage: null,
            confirmMessage: null
        }
    }
    componentDidMount(){
        if (isAuthenticated()){
            this.setState({authenticated: true});
        }
    }
    onCancel(){
    }
    onLogin(email, password){
        var that = this;
        var loginResponsePromise = loginResponse(email, password);
        loginResponsePromise.then(function(result){
            that.setState({
                authenticated: true,
                modalShowLogin: false,
                loginMessage: null
            });
            that.props.onLogin();
        }).catch(function(err){
           that.setState({
               loginMessage: err.message
           });
        });
    }
    onRegister(email, password){
        var that = this;
        var signupResponsePromise = signupResponse(email,password);
        signupResponsePromise.then(function(result){
            that.setState({
                email:email,
                modalShowRegister:false,
                modalShowConfirm:true,
                registerMessage: null
            });

            that.props.onRegister();
        }).catch(function(err){
            console.log("err: "+JSON.stringify(err));
            that.setState({
                registerMessage: err.message
            });
        });
    }
    onConfirm(email,code){
        var that = this;
        var confirmResponsePromise = confirmResponse(email, code);
        confirmResponsePromise.then(function(result){
            that.setState({
                modalShowConfirm:false,
                modalShowLogin:true,
                loginMessage:"Your email has been verified. Please login",
                confirmMessage: null
            });
            that.props.onConfirm();
        }).catch(function(err){
            console.log("err: "+JSON.stringify(err));
            that.setState({
                confirmMessage: err.message
            });
        });
    }
    onMyAccount(){
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
                    <Button onClick={() => this.setState({modalShowLogin: true})} variant="success">Login / Create Account</Button>
                </span> 
                )}
            </span>
            <AccountLoginModal
                show={this.state.modalShowLogin}
                onCancel={() => {this.onCancel();this.setState({modalShowLogin:false})}}
                onLogin ={(email, password) => {this.onLogin(email, password)}}
                onRegisterStart={() => {this.setState({modalShowLogin:false,modalShowRegister:true})}}
                loginMessage={this.state.loginMessage}

            />
            <AccountRegisterModal
                show={this.state.modalShowRegister}
                onRegister={(email,password) =>{this.onRegister(email,password);}}
                onCancel={() => {this.onCancel();this.setState({modalShowRegister:false})}}
                registerMessage={this.state.registerMessage}
            />
            <AccountConfirmModal
                show={this.state.modalShowConfirm}
                email={this.state.email}
                onConfirm={(email,code) =>{this.onConfirm(email,code)}}
                onCancel={() => {this.onCancel();this.setState({modalShowConfirm:false})}}
                confirmMessage={this.state.confirmMessage}
            />

        </span>
        );
    }
}
export default AccountButton;
