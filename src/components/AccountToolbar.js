import React, {Component} from 'react';
import {
   Nav 
} from 'react-bootstrap';

class AccountToolbar extends Component {
    constructor(props){
        super(props);
        this.onSelectTab = this.onSelectTab.bind(this);
    }

    onSelectTab(key){
        this.props.onSwitchTab(key);
    }

    render(){
        return (
        <Nav justify variant="tabs" onSelect={this.onSelectTab} defaultActiveKey="profile">
            <Nav.Item>
                <Nav.Link
                    id="account-profile-tab"
                    eventKey="profile"
                >Account Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    id="account-associates-tab"
                    eventKey="associates"
                 >Associates</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    id="account-settings-tab"
                    eventKey="settings"
                >Settings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    id="account-payment-method-tab"
                    eventKey="billing"
                >Payment Method</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    id="account-billing-tab"
                    eventKey="payment"
                >Billing Details</Nav.Link>
            </Nav.Item>
        </Nav>
        );
    }
}


export default AccountToolbar;
