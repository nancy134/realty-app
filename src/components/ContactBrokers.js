import React from 'react';
import {
} from 'react-bootstrap';

class ContactBrokers extends React.Component {
    render(){
        return(
        <div className="m-2">
            
            <form id='contact-form'>
            <input type='text' name='user_name' placeholder='Name' />
            <br/>
            <input type='email' name='user_email' placeholder='Email' />
            <br/>
            <textarea name='message' placeholder='Message'/>
            <br/>
            <input type='submit' value='Send' />
            </form>
                        
        </div>
        );
    }
}

export default ContactBrokers;
