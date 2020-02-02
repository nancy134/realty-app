import React, { Component } from 'react';
import './AccountPage.css';
import {
} from 'react-bootstrap';
import AccountToolbar from '../components/AccountToolbar';
import AccountProfile from '../components/AccountProfile';
import AccountBilling from '../components/AccountBilling';
import AccountAssociates from '../components/AccountAssociates';

export class AccountPage extends Component {
    constructor(props){
        super(props);
        this.handleSwitchTab = this.handleSwitchTab.bind(this);
        this.state = {
            tab: "profile"
        };
    }

    handleSwitchTab(key){
        console.log("key: "+key);
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
            <AccountBilling /> 
            ): null}
            {tab === "associates" ? (
            <AccountAssociates />
            ): null}
        </React.Fragment>
        );
    }
}

export default AccountPage;
