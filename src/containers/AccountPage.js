import React, { Component } from 'react';
import './AccountPage.css';
import {
    Container,
    Alert,
} from 'react-bootstrap';
import AccountToolbar from '../components/AccountToolbar';
import AccountProfile from '../components/AccountProfile';
import AccountPaymentMethod from '../components/AccountPaymentMethod';
import AccountAssociates from '../components/AccountAssociates';
import AccountBilling from '../components/AccountBilling';
import AccountSettings from '../components/AccountSettings';
import AccountButton from '../components/AccountButton';

import userService from '../services/users';

export class AccountPage extends Component {
    constructor(props){
        super(props);
        this.handleSwitchTab = this.handleSwitchTab.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        const params = new URLSearchParams(props.location.search);
        var token  = params.get('token');
        this.state = {
            tab: "profile",
            token: token,
            accountStatus: null,
            association: null,
            loading: true
        };
    }

    handleSwitchTab(key){
        this.setState({
            tab: key
        });
    }

    handleLogin(result){
        var that = this;
        if (this.state.token){
            var body = {
                token: this.state.token
            };
            userService.acceptInvite(body).then(function(user){
                that.setState({
                    token: null
                });
            }).catch(function(err){
            });
        }
        this.props.onLogin(result);
    }

    handleRegister(result){
        var that = this;
        var body = {
            token: this.state.token,
            email: result.email
        };
        console.log("handleRegister()");
        console.log("body:");
        console.log(body);
        userService.acceptInvite(body).then(function(user){
            console.log("user:");
            console.log(user);
            //that.setState({
            //    token: null
            //});
        }).catch(function(err){
            console.log(err);
        });
    }

    componentDidMount(){
        var that = this;
        if (this.state.token){
            userService.getInvite(this.state.token).then(function(result){
                console.log(result);
                that.setState({
                    accountStatus: result.operation,
                    association: result.association,
                    loading: false
                });
            }).catch(function(err){
                console.log(err);
                that.setState({
                    loading: false,
                    token: null
                });
            });
        } else {
            that.setState({
                loading: false
            });
        }
    }
    render(){
        var tab = this.state.tab;
        if (this.state.loading || this.props.loading){
            return(
            <Container>
            <Alert variant="primary">Initializing Page...</Alert>
            </Container>
            );
        } else {
        if (this.props.loggedIn){
            return(
            <React.Fragment>
                <AccountToolbar onSwitchTab={this.handleSwitchTab}/>
                {tab === "profile" ? (
                <AccountProfile />
                ): null}
                {tab === "billing" ? (
                <AccountPaymentMethod /> 
                ): null}
                {tab === "associates" ? (
                <AccountAssociates />
                ): null}
                {tab === "settings" ? (
                <AccountSettings />
                ): null}
                {tab === "payment" ? (
                <AccountBilling />
                ): null}
            </React.Fragment>
            );
        } else {
            return(
            <React.Fragment>
                { this.state.token ?
                <Container>
                    <Alert
                        variant="primary"
                    >

                        { this.state.accountStatus === "login" ?
                        <div className="d-flex flex-column">
                            <p className="d-flex justify-content-center">You have been invited to become an associate of <b>&nbsp;{this.state.association}</b></p>
                            <p className="d-flex justify-content-center">Please login with to confirm.</p>
                            <div className="d-flex justify-content-center">
                                <AccountButton
                                    initialState="login"
                                    onLogin={this.handleLogin}
                                    onRegister={this.handleRegister}
                                />
                            </div>
                        </div>
                        : null }

                        { this.state.accountStatus === "register" ?
                        <div className="d-flex flex-column">
                            <p className="d-flex justify-content-center">You have been invited to become an associate of <b>&nbsp;{this.state.association}</b></p>
                            <p className="d-flex justify-content-center">Please register with FindingCRE to join!</p>
                            <div className="d-flex justify-content-center">
                                <AccountButton
                                    initialState="register"
                                    onRegister={this.handleRegister}
                                    onLogin={this.handleLogin}
                                />
                            </div>
                        </div>
                        : null }
                    </Alert>
                </Container>
                :
                <Container>
                <Alert variant="primary">Login to see your Account information</Alert>
                </Container>
                }
            </React.Fragment>
            );
            }
        }
    }
}

export default AccountPage;
