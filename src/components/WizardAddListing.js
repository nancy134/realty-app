import React, { Component } from 'react';

import ListingAddType from '../components/ListingAddType';
import ListingAddAddress from '../components/ListingAddAddress';
import ListingAddOverview from '../components/ListingAddOverview';
import ListingAddReview from '../components/ListingAddReview';
import AccountLoginModal from './AccountLoginModal';
import AccountRegisterModal from './AccountRegisterModal';
import AccountConfirmModal from './AccountConfirmModal';
import AccountForgotPasswordModal from './AccountForgotPasswordModal';
import AccountForgotConfirmModal from './AccountForgotConfirmModal';
import authenticationService from '../helpers/authentication';
import PolicyModal from '../components/PolicyModal';

export class WizardAddListing extends Component {
    constructor(props){
        super(props);

        // Add Listing
        this.handleListingTypeNext = this.handleListingTypeNext.bind(this);
        this.handleListingAddressNext = this.handleListingAddressNext.bind(this);
        //this.handleGoToListing = this.handleGoToListing.bind(this);
        this.handleListingOverviewNext = this.handleListingOverviewNext.bind(this);
        this.handleListingReviewNext = this.handleListingReviewNext.bind(this);
        this.handleCancelAddType = this.handleCancelAddType.bind(this);
        this.handleCancelAddAddress = this.handleCancelAddAddress.bind(this);
        this.handleCancelAddOverview = this.handleCancelAddOverview.bind(this);

        // Login
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginCancel = this.handleLoginCancel.bind(this);
        this.handleLoginStart = this.handleLoginStart.bind(this);

        // Register
        this.handleRegisterStart = this.handleRegisterStart.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleRegisterCancel = this.handleRegisterCancel.bind(this);

        // Confirm
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleConfirmCancel = this.handleConfirmCancel.bind(this);

        // Forgot Password
        this.handleForgotPasswordStart = this.handleForgotPasswordStart.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);

        // Forgot Password Confirm
        this.handleForgotConfirm = this.handleForgotConfirm.bind(this)

        // Policy Modal
        this.handleTerms = this.handleTerms.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
        this.handlePolicyModalHide = this.handlePolicyModalHide.bind(this);

        this.state = {

            // Add listing
            addListingType: true,
            addListingAddress: false,
            addListingOverview: false,
            addListingReview: false,

            // Login
            modalShowLogin: false,
            loginMessage: null,
            loginMessageVariant: "danger",
            loginProgress: false,

            // Register
            modalShowRegister: false,
            registerMessage: null,
            registerProgress: false,
            notRegistered: false,

            // Confirm
            modalShowConfirm: false,
            confirmMessage: null,
            confirmProgress: false,

            // Forgot Password
            forgotPassword: false,
            modalShowForgotPassword: false,
            forgotPasswordMessage: null,
            forgotPasswordProgress: false,

            // Forgot Password Confirm
            modalShowForgotConfirm: false,
            forgotConfirmMessage: null,
            forgotConfirmProgress: false,

            // Data
            newListing: {},
            email: null,
            authenticated: false,

        };
    }

    // Add Listing

    handleListingTypeNext(listing){
        this.setState({
            addListingType: false,
            addListingAddress: true,
            newListing: listing
        });
    }

    handleListingAddressNext(listing){
        this.setState({
            addListingAddress: false,
            addListingOverview: true,
            newListing: listing
        });
    }
    handleListingOverviewNext(listing){
        if (this.props.loggedIn){
            this.setState({
                addListingOverview: false,
                addListingReview: true,
                newListing: listing
            });
        } else {
            this.setState({
                addListingOverview: false,
                modalShowLogin: true,
                newListing: listing
            });
        }
    }
    handleListingReviewNext(listing){
        this.props.onFinish(listing);
    }
    handleCancelAddType(){
        this.setState({
            addListingType: false
        });
        this.props.onCancel();
    }
    handleCancelAddAddress(){
        this.setState({
            addListingAddress: false
        });
        this.props.onCancel();
    }
    handleCancelAddOverview(){
        this.setState({
            addListingOverview: false
        });
        this.props.onCancel();
    }

    handleLoginStart(){
        this.setState({
            modalShowLogin: true,
            modalShowRegister: false,
            notRegistered: false
        });
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
                loginProgress: false,
                addListingReview: true
            });
            that.props.onLogin(result);
        }).catch(function(err){
           that.setState({
               loginMessage: err.message,
               loginProgress: false
           });
        });
    }

    handleRegisterStart(){
        this.setState({
            modalShowLogin:false,
            modalShowRegister:true,
            notRegistered: true
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
            forgotPassword: true,
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

    handleRegisterCancel(){
        this.setState({
            modalShowRegister:false,
            registerMessage: null
        });
        this.props.onCancel();
    }
    handleLoginCancel(){
        this.setState({
            modalShowLogin:false,
            loginMessage: null,
            loginProgress: false
        });
        this.props.onCancel();
    }
    handleConfirmCancel(){
        this.setState({
            modalShowConfirm:false,
            confirmMessage: null
        });
        this.props.onCancel();
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
        var startWizard = this.props.start && this.state.addListingType;
        return(
        <React.Fragment>
            { startWizard ?
            <ListingAddType
                show={startWizard}
                onNext={this.handleListingTypeNext}
                onCancel={this.handleCancelAddType}
                loggedIn={this.props.loggedIn}
            />
            : null }
            { this.state.addListingAddress ?
            <ListingAddAddress
                show={this.state.addListingAddress}
                onNext={this.handleListingAddressNext}
                listing={this.state.newListing}
                onCancel={this.handleCancelAddAddress}
                onGoToListing={this.handleGoToListing}
                loggedIn={this.props.loggedIn}
            />
            : null }
            { this.state.addListingOverview ?
                <ListingAddOverview
                    show={this.state.addListingOverview}
                    onNext={this.handleListingOverviewNext}
                    listing={this.state.newListing}
                    onCancel={this.handleCancelAddOverview}
                    loggedIn={this.props.loggedIn}
                    propertyTypes={this.props.propertyTypes}
                />
            : null }
            { this.state.modalShowLogin ?
            <AccountLoginModal
                isWizard={true}
                loggedIn={this.props.loggedIn}
                forgotPassword={this.state.forgotPassword}
                notRegistered={this.state.notRegistered}
                show={this.state.modalShowLogin}
                onCancel={this.handleLoginCancel}
                onLogin ={this.handleLogin}
                onRegisterStart={this.handleRegisterStart}
                onForgotPassword={this.handleForgotPasswordStart}
                loginMessage={this.state.loginMessage}
                loginProgress={this.state.loginProgress}
                loginMessageVariant={this.state.loginMessageVariant}
            />
            : null}
            { this.state.modalShowRegister ?
            <AccountRegisterModal
                isWizard={true}
                loggedIn={this.props.loggedIn}
                show={this.state.modalShowRegister}
                onRegister={this.handleRegister}
                onCancel={this.handleRegisterCancel}
                onLoginStart={this.handleLoginStart}
                registerMessage={this.state.registerMessage}
                progress={this.state.registerProgress}
                onTerms={this.handleTerms}
                onPrivacy={this.handlePrivacy}
            />
            : null}
            { this.state.modalShowConfirm ?
            <AccountConfirmModal
                isWizard={true}
                loggedIn={this.props.loggedIn}
                show={this.state.modalShowConfirm}
                email={this.state.email}
                onConfirm={this.handleConfirm}
                onCancel={this.handleConfirmCancel}
                confirmMessage={this.state.confirmMessage}
                progress={this.state.confirmProgress}
                confirmMessageVariant={this.state.confirmMessageVariant}
            />
            : null}
            { this.state.modalShowForgotPassword ?
            <AccountForgotPasswordModal
                isWizard={true}
                loggedIn={this.props.loggedIn}
                show={this.state.modalShowForgotPassword}
                onForgotPassword={this.handleForgotPassword}
                progress={this.state.forgotPasswordProgress}
            />
            : null}
            { this.state.modalShowForgotConfirm ?
            <AccountForgotConfirmModal
                isWizard={true}
                loggedIn={this.props.loggedIn}
                show={this.state.modalShowForgotConfirm}
                onForgotPassword={this.handleForgotConfirm}
                progress={this.state.forgotConfirmProgress}
            />
            : null}
            { this.state.addListingReview ?
            <ListingAddReview
                forgotPassword={this.state.forgotPassword}
                notRegistered={this.state.notRegistered}
                show={this.state.addListingReview}
                onNext={this.handleListingReviewNext}
                listing={this.state.newListing}
                onCancel={this.handleCancelAddAddress}
                loggedIn={this.props.loggedIn}
            />
            : null }
            { this.state.showPolicyModal ?
            <PolicyModal
                show={this.state.showPolicyModal}
                type={this.state.policyType}
                onHide={this.handlePolicyModalHide}
            />
            : null }
        </React.Fragment>
        );
    }
}

export default WizardAddListing;
