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
import PolicyModal from './PolicyModal';

export class AccountButton extends Component{
    constructor(props){
        super(props);

        this.handleLoginCreateAccount = this.handleLoginCreateAccount.bind(this);
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
        this.handleForgotPasswordCancel = this.handleForgotPasswordCancel.bind(this);

        // Forgot Password Confirm
        this.handleForgotConfirm = this.handleForgotConfirm.bind(this);
        this.handleForgotConfirmCancel = this.handleForgotConfirmCancel.bind(this);

        // Policy
        this.handleTerms = this.handleTerms.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
        this.handlePolicyModalHide = this.handlePolicyModalHide.bind(this);
        this.state = {
            //
            emailVerification: false,

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
            confirmResend: false,

            // Forgot Password
            modalShowForgotPassword: false,
            forgotPasswordMessage: null,
            forgotPasswordProgress: false,

            // Forgot Password Confirm
            modalShowForgotConfirm: false,
            forgotConfirmMessage: null,
            forgotConfirmProgress: false,

            email: null,

            // Policy modal
            showPolicyModal: false,
            policyType: "",
        }
    }
    componentDidMount(){
        /*
        if (authenticationService.isAuthenticated()){
            var result = {};
            var isAdmin = false;
            if (authenticationService.isAdmin()){
                isAdmin = true;
            }
            result.isAdmin = isAdmin;
            this.props.onLogin(result);
        }
        */
    }
    handleLoginCreateAccount(){
        console.log("handleLoginCreateAccount");
        this.setState({
            modalShowLogin: true
        }); 
    }
    handleLogin(email, password){
        var that = this;
        this.setState({
            loginProgress: true
        });
        authenticationService.loginResponse(email, password).then(function(result){
            that.setState({
                modalShowLogin: false,
                loginMessage: null,
                loginProgress: false
            });
            console.log(result);
            that.props.onLogin(result);
        }).catch(function(err){
           if (err.code === 'UserNotConfirmedException'){
               console.log("Display resend confirmation request");
               authenticationService.resendConfirmationCode(email).then(function(result){
                   that.setState({
                       modalShowLogin: false,
                       loginProgress: false,
                       modalShowConfirm: true,
                       confirmResend: true,
                       email: email
                   });
               }).catch(function(err){
                   that.setState({
                       loginMessage: err.message,
                       loginProgress: false
                   });
               });
           } else {
               that.setState({
                   loginMessage: err.message,
                   loginProgress: false
               });
           }
        });
    }
    handleRegister(body){
        var that = this;
        this.setState({
            registerProgress: true
        });
        console.log("body:");
        console.log(body);
        authenticationService.signupResponse(body).then(function(result){
            if (that.state.emailVerification){
                that.setState({
                    email:body.email,
                    modalShowRegister:false,
                    modalShowConfirm:true,
                    registerMessage: null,
                    registerProgress: false,
                    loginMessage: "",
                    loginMessageVariant: "danger"
                });
            } else {
            that.setState({
                //modalShowConfirm:false,
                email: body.email,
                modalShowRegister: false,
                modalShowLogin:true,
                loginMessage:"Your email has been verified. Please login",
                loginMessageVariant: "info",
                confirmMessage: null,
                confirmProgress: false
            });

            }

            that.props.onRegister(body);
        }).catch(function(err){
            console.log(err);
            that.setState({
                registerMessage: err.message,
                registerProgress: false
            });
        });
    }
    handleConfirm(email,code){
        var that = this;
        this.setState({
            confirmProgress: true
        });
        authenticationService.confirmResponse(email, code).then(function(result){
            that.setState({
                modalShowConfirm:false,
                modalShowLogin:true,
                loginMessage:"Your email has been verified. Please login",
                loginMessageVariant: "info",
                confirmMessage: null,
                confirmProgress: false
            });
            that.props.onConfirm();
        }).catch(function(err){
            that.setState({
                confirmMessage: err.message,
                confirmProgress: false
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
        var that=this;
        this.setState({
            forgotConfirmProgress: true
        });
        authenticationService.confirmForgotPasswordResponse(code, password, this.state.email).then(function(result){
            that.setState({
                modalShowForgotConfirm: false,
                modalShowLogin: true,
                forgotConfirmProgress: false
            });
        }).catch(function(err){
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
    handleForgotPasswordCancel(){
        this.setState({
            modalShowForgotPassword: false,
            forgotPasswordMessage: null
        });
    }
    handleForgotConfirmCancel(){
        this.setState({
            modalShowForgotConfirm: false,
            forgotConfirmMessage: null
        });
    }
    handleTerms(){
        this.setState({
            showPolicyModal: true,
            policyType: "terms"
        });
    }
    handlePrivacy(){
        this.setState({
            showPolicyModal: true,
            policyType: "privacy"
        });
    }
    handlePolicyModalHide(){
        this.setState({
            showPolicyModal: false,
            policyType: ""
        });
    }
    render(){
        const userName = authenticationService.getUserName();
        return(
        <span>
            <span className="align-top text-danger">
            {this.props.loggedIn ?
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
                    { this.props.isAdmin ?
                    <Dropdown.Item
                        as="button"
                        id="account-button-administration"
                        onClick={() => {this.onAdministration()}}
                    >Administration</Dropdown.Item>
                    : null }
                    <Dropdown.Item
                        as="button"
                        id="account-button-logout"
                        onClick={() => {this.onLogout()}}
                    >Logout</Dropdown.Item>
                </DropdownButton>
                )
                :( 
                <span>
                    { !this.props.initialState ?
                    <Button 
                        onClick={this.handleLoginCreateAccount}
                        variant="success"
                        id="account-button"
                    >
                        Login / Create Account
                    </Button>
                    : null }
                    { this.props.initialState === "login" ?
                    <Button
                        onClick={() => this.setState({modalShowLogin: true})}
                        variant="success"
                    >
                        <span>Login</span>
                    </Button>
                    : null }
                    { this.props.initialState === "register" ?
                    <Button
                        onClick={() => this.setState({modalShowRegister: true})}
                        variant="success"
                    >
                        <span>Register</span>
                    </Button>
                    : null }
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
                onRegister={this.handleRegister}
                onLoginStart={() => {this.setState({modalShowLogin:true,modalShowRegister:false})}}
                onCancel={this.handleRegisterCancel}
                registerMessage={this.state.registerMessage}
                progress={this.state.registerProgress}
                onTerms={this.handleTerms}
                onPrivacy={this.handlePrivacy}
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
                resend={this.state.confirmResend}
            />
            : null}
            { this.state.modalShowForgotPassword ?
            <AccountForgotPasswordModal
                show={this.state.modalShowForgotPassword}
                onForgotPassword={(email)=>{this.handleForgotPassword(email)}}
                onCancel={this.handleForgotPasswordCancel}
                progress={this.state.forgotPasswordProgress}
            />
            : null}
            { this.state.modalShowForgotConfirm ?
            <AccountForgotConfirmModal
                show={this.state.modalShowForgotConfirm}
                onForgotPassword={(code, password)=>{this.handleForgotConfirm(code, password)}}
                progress={this.state.forgotConfirmProgress}
                onCancel={this.handleForgotConfirmCancel}
            />
            : null}
            { this.state.showPolicyModal ?
            <PolicyModal
                show={this.state.showPolicyModal}
                type={this.state.policyType}
                onHide={this.handlePolicyModalHide}
            />
            : null}
        </span>
        );
    }
}
export default AccountButton;
