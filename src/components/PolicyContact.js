import React from 'react';
import {
} from 'react-bootstrap';

class PolicyContact extends React.Component {
    render(){
        return(
        <div>
        <h3>Address</h3>
        FindingCRE, LLC<br/>
        28 Rapids Road<br/>
        Stamford, CT 06905<br/>
        <h3 className="pt-2">Email</h3>
        <a href="mailto:support@findingCRE.com">support@findingCRE.com</a>
        </div>
        );
    }
}

export default PolicyContact;

