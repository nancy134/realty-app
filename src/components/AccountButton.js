import React from 'react';
import { Component } from 'react';
import {
    Button,
    Dropdown,
    DropdownButton
} from 'react-bootstrap';
import authenticationService from '../helpers/authentication';
import AccountLoginModal from './AccountLoginModal';
import AccountRegisterModal from './AccountRegisterModal';
import AccountConfirmModal from './AccountConfirmModal';
import AccountForgotPasswordModal from './AccountForgotPasswordModal';
import AccountForgotConfirmModal from './AccountForgotConfirmModal';

export class AccountButton extends Component{
    constructor(props){
        super(props);

        // Login
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginCancel = this.handleLoginCancel.bind(this);

        // Register
        this.handleRegister = this.handleRegister.bind(this);
        this.handleRegisterCancel = this.handleRegisterCancel.bind(this);

        // Confirm
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleConfirmCancel = this.handleConfirmCancel.bind(this);

        // Forgot Password
        this.handleForgotPasswordStart = this.handleForgotPasswordStart.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);

        // Forgot Password Confirm
        this.handleForgotConfirm = this.handleForgotConfirm.bind(this);

        this.state = {
            authenticated: false,

            // Login
            modalShowLogin: false,
            loginMessage: null,
            loginMessageVariant: "danger",
            loginProgress: false,

            // Register
            modalShowRegister: false,
            registerMessage: null,
            registerProgress: false,

            // Confirm
            modalShowConfirm: false,
            confirmMessage: null,
            confirmProgress: false,

            // Forgot Password
            modalShowForgotPassword: false,
            forgotPasswordMessage: null,
            forgotPasswordProgress: false,

            // Forgot Password Confirm
            modalShowForgotConfirm: false,
            forgotConfirmMessage: null,
            forgotConfirmProgress: false,

            email: null 
        }
    }
    componentDidMount(){
        if (authenticationService.isAuthenticated()){
            this.setState({authenticated: true});
        }
    }
    handleLogin(email, password){
        var that = this;
        this.setState({
            loginProgress: true
        });
        authenticationService.loginResponse(email, password).then(function(result){
            that.setState({
                authenticated: true,
                modalShowLogin: false,
                loginMessage: null,
                loginProgress: false
            });
            that.props.onLogin();
        }).catch(function(err){
           that.setState({
               loginMessage: err.message,
               loginProgress: false
           });
        });
    }
    handleRegister(email, password){
        var that = this;
        this.setState({
            registerProgress: true
        });
        authenticationService.signupResponse(email, password).then(function(result){
            that.setState({
                email:email,
                modalShowRegister:false,
                modalShowConfirm:true,
                registerMessage: null,
                registerProgress: false,
                loginMessage: "",
                loginMessageVariant: "danger"
            });

            that.props.onRegister();
        }).catch(function(err){
            that.setState({
                registerMessage: err.message,
                registerProgress: false
            });
        });
    }
    handleConfirm(email,code){
        var that = this;
        authenticationService.confirmResponse(email, code).then(function(result){
            that.setState({
                modalShowConfirm:false,
                modalShowLogin:true,
                loginMessage:"Your email has been verified. Please login",
                loginMessageVariant: "success",
                confirmMessage: null
            });
            that.props.onConfirm();
        }).catch(function(err){
            that.setState({
                confirmMessage: err.message
            });
        });
    }
    handleForgotPasswordStart(){
        this.setState({
            modalShowForgotPassword: true,
            modalShowLogin: false,
            loginMessage: "",
            loginMessageVariant: "danger"
        });
    }
    handleForgotPassword(email){
        var that=this;
        this.setState({
           forgotPasswordProgress: true
        });
        authenticationService.forgotPasswordResponse(email).then(function(result){
            that.setState({
                modalShowForgotPassword: false,
                modalShowForgotConfirm: true,
                forgotPasswordProgress: false,
                email: email
            });
        }).catch(function(err){
            that.setState({
                forgotPasswordMessage: err.message,
                forgotPasswordProgress: false
            });
        });
    }
    handleForgotConfirm(code, password){
        console.log(this);
        var that=this;
        this.setState({
            forgotConfirmProgress: true
        });
        authenticationService.confirmForgotPasswordResponse(code, password, this.state.email).then(function(result){
            console.log(result);
            that.setState({
                modalShowForgotConfirm: false,
                modalShowLogin: true,
                forgotConfirmProgress: false
            });
        }).catch(function(err){
            console.log(err);
            that.setState({
                forgotPasswordConfirmMessage: err.message,
                forgotConfirmProgress: false
            });
        });
    }
    onMyAccount(){
        var url = window.location.protocol + "//" + window.location.hostname + "/account";
        window.location.href = url;
    }
    onAdministration(){
        var url = window.location.protocol + "//" + window.location.hostname + "/admin";
        window.location.href = url;
    }
    onLogout(){
       authenticationService.deleteUser();
       this.setState({authenticated: false});
       this.props.onLogout();
    }
    onMyListings(){
        var url = window.location.protocol + "//" + window.location.hostname + "/listing?listingMode=myListings";
        window.location.href = url;
    }
    onMyReports(){
        var url = window.location.protocol + "//" + window.location.hostname + "/reporting";
        window.location.href = url;
    }
    handleRegisterCancel(){
        this.setState({
            modalShowRegister:false,
            registerMessage: null
        });
    }
    handleLoginCancel(){
        this.setState({
            modalShowLogin:false,
            loginMessage: null,
            loginProgress: false
        });
    }
    handleConfirmCancel(){
        this.setState({
            modalShowConfirm:false,
            confirmMessage: null
        });
    }
    render(){
        const userName = authenticationService.getUserName();
        return(
        <span>
            <span className="align-top text-danger">
            {this.state.authenticated ? 
                ( 
                <DropdownButton id="account-button-dropdown" title={userName}>
                    <Dropdown.Item
                        as="button"
                        id="account-button-my-listings"
                        onClick={() => {this.onMyListings()}}
                    >My Listings</Dropdown.Item>
                    <Dropdown.Item
                        as="button"
                        id="account-button-my-account"
                        onClick={() => {this.onMyAccount()}}
                    >My Account</Dropdown.Item>
                    <Dropdown.Item
                        as="button"
                        id="account-button-administration"
                        onClick={() => {this.onAdministration()}}
                    >Administration</Dropdown.Item>
                    <Dropdown.Item
                        as="button"
                        id="account-button-logout"
                        onClick={() => {this.onLogout()}}
                    >Logout</Dropdown.Item>
                </DropdownButton> 
                )
                :( 
                <span>
                    <Button 
                        onClick={() => this.setState({modalShowLogin: true})} 
                        variant="success"
                        id="account-button"
                    >
                        Login / Create Account
                    </Button>
                </span> 
                )}
            </span>
            { this.state.modalShowLogin ?
            <AccountLoginModal
                show={this.state.modalShowLogin}
                onCancel={this.handleLoginCancel}
                onLogin ={(email, password) => {this.handleLogin(email, password)}}
                onRegisterStart={() => {this.setState({modalShowLogin:false,modalShowRegister:true})}}
                onForgotPassword={this.handleForgotPasswordStart}
                loginMessage={this.state.loginMessage}
                loginProgress={this.state.loginProgress}
                loginMessageVariant={this.state.loginMessageVariant}
            />
            : null}
            { this.state.modalShowRegister ?
            <AccountRegisterModal
                show={this.state.modalShowRegister}
                onRegister={(email,password) =>{this.handleRegister(email,password);}}
                onCancel={this.handleRegisterCancel}
                registerMessage={this.state.registerMessage}
                progress={this.state.registerProgress}
                
            />
            : null}
            { this.state.modalShowConfirm ?
            <AccountConfirmModal
                show={this.state.modalShowConfirm}
                email={this.state.email}
                onConfirm={(email,code) =>{this.handleConfirm(email,code)}}
                onCancel={this.handleConfirmCancel}
                confirmMessage={this.state.confirmMessage}
                progress={this.state.confirmProgress}
                confirmMessageVariant={this.state.confirmMessageVariant}
            />
            : null}
            { this.state.modalShowForgotPassword ?
            <AccountForgotPasswordModal
                show={this.state.modalShowForgotPassword}
                onForgotPassword={(email)=>{this.handleForgotPassword(email)}}
                progress={this.state.forgotPasswordProgress}
            />
            : null}
            { this.state.modalShowForgotConfirm ?
            <AccountForgotConfirmModal
                show={this.state.modalShowForgotConfirm}
                onForgotPassword={(code, password)=>{this.handleForgotConfirm(code, password)}}
                progress={this.state.forgotConfirmProgress}
            />
            : null}
        </span>
        );
    }
}
export default AccountButton;
