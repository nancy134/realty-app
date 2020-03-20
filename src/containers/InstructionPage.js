import React, {Component} from 'react';
import {
    Jumbotron
} from 'react-bootstrap';

export class Instructions extends Component {
    render(){
        return(
        <React.Fragment>
            <Jumbotron className="p-3">
                <h3>URL</h3>
                <p>https://www.sabresw.com</p>
            </Jumbotron>
            <Jumbotron className="p-3">
                <h3>Home page</h3>
                <p>https://www.sabresw.com/home</p>
                <ul>
                    <li>Select 'Find Space' to get to the listing page</li>
                    <li>It doesn't matter what you enter into the text field - the search isn't working yet</li>
                </ul>
            </Jumbotron>
            <Jumbotron className="p-3">
                <h3>Listing Page</h3>
                <p>https://www.sabresw.com/listing</p>
                <h4>Map</h4>
                <p>Map is showing some random points and will not get updated with new listings are created</p>
                <h4>Filters</h4>
                <p>Filters are not working yet</p>
                <h4>Search</h4>
                <p>Search is not working yet</p>
                <h4>All Listings/My Listings toggle</h4>
                <p>This toggle is working.  Once you have created a new listing, this will toggle between all listings and listings you created</p>
                <h4>Login</h4>
                <ul>
                   <li>You can create an account by select 'Don't have an an account? Create one here' on the Login dialog</li>
                   <li>Once you register, you will receive an email from no-reply@verificationemail.com with a code</li>
                   <li>Forget password is not working yet</li>
                </ul>
                <h4>Add a Listing</h4>
                <ul>
                    <li>You can add a new listing using this button</li>
                    <li>Some blocks have not been implemented yet and are hidden for now until they are implemented</li>
                    <li>The Edit/View toggle will let you toggle between editing and previewing your listing</li>
                    <li>The Save button is not working yet.  As soon as you edit and save any of the blocks, the listing will be created</li>
                </ul>
                <h4>Edit a Listing</h4>
                <ul>
                    <li>By selecting a listing you own you can edit the listing by selecting Edit on the View/Edit toggle</li>
                </ul>
            </Jumbotron>
            <Jumbotron className="p-3">
                <h3>Account Page</h3>
                <p>https://www.sabresw.com/account</p>
                <p>Nothing on this page is working yet.</p>
            </Jumbotron>
            <Jumbotron className="p-3">
                <h3>Slack</h3>
                <p>https://sabresw.slack.com</p>
                <p>Issues and bugs should be documented in Slack</p>
            </Jumbotron>
        </React.Fragment>
        );
    }
}
export default Instructions;
