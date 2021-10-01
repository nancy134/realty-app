import React, { Component } from 'react';
import {
} from 'react-bootstrap';

export class ConstantContact extends Component { 

    constructor(props){
        super(props);

        var message = "window.opener === false";
        if (window.opener){
            message = "window.opener === true";
            window.opener.postMessage(window.location.search);
            window.close();
        }
        this.state = {
            message: message
        };
    }
    render(){
        return (
        <div>
            <p>{this.state.message}</p>
        </div>
        );
    }
}

export default ConstantContact;
