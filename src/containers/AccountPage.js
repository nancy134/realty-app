import React, { Component } from 'react';
import './AccountPage.css';
import {
} from 'react-bootstrap';
import AccountToolbar from '../components/AccountToolbar';
import AccountProfile from '../components/AccountProfile';
import AccountPaymentMethod from '../components/AccountPaymentMethod';
import AccountAssociates from '../components/AccountAssociates';
import AccountBilling from '../components/AccountBilling';
import AccountSettings from '../components/AccountSettings';

export class AccountPage extends Component {
    constructor(props){
        super(props);
        this.handleSwitchTab = this.handleSwitchTab.bind(this);
        this.state = {
            tab: "profile"
        };
    }

    handleSwitchTab(key){
        this.setState({
            tab: key
        });
    }

    render(){
        var tab = this.state.tab;
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
    }
}

export default AccountPage;
