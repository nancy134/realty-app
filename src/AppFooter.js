import React from 'react';
import {
    Button
} from 'react-bootstrap';

class AppFooter extends React.Component {
    render(){
        return(
        <div className="bg-light ml-1 mr-1">
            <Button
                variant="link"
                size="sm"
                onClick={() => this.props.onPolicyModalShow("terms")}
            >
                <span>Terms & Conditions</span>
            </Button>
            <Button
                variant="link"
                size="sm"
                onClick={() => this.props.onPolicyModalShow("privacy")}
            >
                <span>Privacy Policy</span>
            </Button>
            <Button
                variant="link"
                size="sm"
                onClick={() => this.props.onPolicyModalShow("about")}
            >
                <span>About</span>
            </Button>
            <Button
                variant="link"
                size="sm"
                onClick={() => this.handlePolicyModalShow("contact")}
            >
                <span>Contact Us</span>
            </Button>

        </div>
        );
    }
}

export default AppFooter;
