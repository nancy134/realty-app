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

        const params = new URLSearchParams(props.location.search);
        console.log(params);
        var token  = params.get('token');
        console.log(token);
        this.state = {
            tab: "profile",
            token: token,
            accountStatus: null,
            association: null
        };
    }

    handleSwitchTab(key){
        this.setState({
            tab: key
        });
    }

    componentDidMount(){
        console.log("this.state.token: "+this.state.token);
        var that = this;
        if (this.state.token){
            var body = {
                token: this.state.token
            };
            userService.inviteConfirm(body).then(function(result){
                console.log(result);
                that.setState({
                    accountStatus: result.operation,
                    association: result.association
                });
            }).catch(function(err){
                console.log(err);
            });
        }
    }
    render(){
        var tab = this.state.tab;
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
                            />
                        </div>
                    </div>
                    : null }
                </Alert>
            </Container>
            :
            <Container>
            <Alert variant="primary">You need to login first</Alert>
            </Container>
            }
        </React.Fragment>
        );
        }
    }
}

export default AccountPage;
