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
        console.log("key: "+key);
        this.props.onSwitchTab(key);
    }

    render(){
        return (
<Nav justify variant="tabs" onSelect={this.onSelectTab} defaultActiveKey="profile">
  <Nav.Item>
    <Nav.Link eventKey="profile">Account Profile</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="associates" >Associates</Nav.Link>
  </Nav.Item>

  <Nav.Item>
    <Nav.Link eventKey="billing">Billing Information</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="payment" >Payment History</Nav.Link>
  </Nav.Item>
</Nav>
        );
    }
}


export default AccountToolbar;
