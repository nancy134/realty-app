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
        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.handleRegisterCancel = this.handleRegisterCancel.bind(this);
        this.handleLoginCancel = this.handleLoginCancel.bind(this);
        this.handleConfirmCancel = this.handleConfirmCancel.bind(this);
        this.handleForgotPasswordStart = this.handleForgotPasswordStart.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.state = {
            authenticated: false,
            modalShowLogin: false,
            modalShowRegister: false,
            modalShowConfirm: false,
            modalShowForgotPassword: false,
            modalShowForgotConfirm: false,
            loginMessage: null,
            loginMessageVariant: "danger",
            registerMessage: null,
            confirmMessage: null,
            forgotPasswordMessage: null,
            forgotConfirmMessage: null,
            loginProgress: false,
            registerProgress: false,
            confirmProgress: false,
            forgotPasswordProgress: false,
            forgotConfirmProgress: false,
            email: null 
        }
    }
    componentDidMount(){
        if (authenticationService.isAuthenticated()){
            this.setState({authenticated: true});
        }
    }
    onLogin(email, password){
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
    onRegister(email, password){
        var that = this;
        authenticationService.signupResponse(email, password).then(function(result){
            that.setState({
                email:email,
                modalShowRegister:false,
                modalShowConfirm:true,
                registerMessage: null
            });

            that.props.onRegister();
        }).catch(function(err){
            that.setState({
                registerMessage: err.message
            });
        });
    }
    onConfirm(email,code){
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
            modalShowLogin: false
        });
    }
    handleForgotPassword(email){
        var that=this;
        authenticationService.forgotPasswordResponse(email).then(function(result){
            that.setState({
                modalShowForgotPassword: false,
                modalShowForgotConfirm: true,
                email: email
            });
        }).catch(function(err){
            that.setState({
                forgotPasswordMessage: err.message
            });
        });
    }
    handleForgotConfirm(code, password){
        var that=this;
        authenticationService.confirmForgotPasswordResponse(code, password).then(function(result){
            that.setState({
                modalShowForgotConfirm: false,
                modalShowLogin: true
            });
        }).catch(function(err){
            that.setState({
                forgotPasswordConfirmMessage: err.message
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
                <DropdownButton id="dropdown-item-button" title={userName}>
                    <Dropdown.Item as="button" onClick={() => {this.onMyListings()}}>My Listings</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => {this.onMyReports()}}>My Reports</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => {this.onMyAccount()}}>My Account</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => {this.onAdministration()}}>Administration</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => {this.onLogout()}}>Logout</Dropdown.Item>
                </DropdownButton> 
                )
                :( 
                <span>
                    <Button 
                        onClick={() => this.setState({modalShowLogin: true})} 
                        variant="success"
                        id="account_button"
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
                onLogin ={(email, password) => {this.onLogin(email, password)}}
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
                onRegister={(email,password) =>{this.onRegister(email,password);}}
                onCancel={this.handleRegisterCancel}
                registerMessage={this.state.registerMessage}
                registerProgress={this.state.registerProgress}
                
            />
            : null}
            { this.state.modalShowConfirm ?
            <AccountConfirmModal
                show={this.state.modalShowConfirm}
                email={this.state.email}
                onConfirm={(email,code) =>{this.onConfirm(email,code)}}
                onCancel={this.handleConfirmCancel}
                confirmMessage={this.state.confirmMessage}
                confirmProgress={this.state.confirmProgress}
                confirmMessageVariant={this.state.confirmMessageVariant}
            />
            : null}
            { this.state.modalShowForgotPassword ?
            <AccountForgotPasswordModal
                show={this.state.modalShowForgotPassword}
                onForgotPassword={(email)=>{this.handleForgotPassword(email)}}
            />
            : null}
            { this.state.modalShowForgotConfirm ?
            <AccountForgotConfirmModal
                show={this.state.modalShowForgotConfirm}
                onForgotPassword={(code, password)=>{this.handleForgotConfirm(code, password)}}
            />
            : null}
        </span>
        );
    }
}
export default AccountButton;
