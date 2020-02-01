import React, { Component } from 'react';
import './AccountPage.css';
import {
} from 'react-bootstrap';
import AccountToolbar from '../components/AccountToolbar';
import AccountProfile from '../components/AccountProfile';

export class AccountPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
        <React.Fragment>
            <AccountToolbar />
            <AccountProfile />
        </React.Fragment>
        );
    }
}

export default AccountPage;
