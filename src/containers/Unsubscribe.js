import React, { Component } from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import './Unsubscribe.css';
import userService from '../services/users';

export class Unsubscribe extends Component {
    constructor(props){
        super(props);

        const params = new URLSearchParams(props.location.search);
        var email = params.get('email');

        this.state = {
            progress: false,
            unsubscribed: false,
            error: false,
            email: email
        };
    }

    componentDidMount(){
        var body = {
            email: this.state.email,
            optout: true
        };
        var that = this;
        that.setState({
            progress: true
        });
        userService.optInUser(body).then(function(result){
            that.setState({
                progress: false,
                unsubscribed: true
            });
            console.log(result);
        }).catch(function(err){
            that.setState({
                progress: false,
                error: true 
            });
            console.log(err);
        });

    }
    render(){
        var leftColumnClassName = "p-0 leftcol";
        var leftColumnSize = 12;
        return(
        <React.Fragment>
            <div className="listing-container">
                <Row className="ml-1 mr-1">
                    <Col xs={leftColumnSize} className={leftColumnClassName}>
                        <div className="text-center pt-5">
                        { this.state.progress ?
                        <h3>Unscubscribing, please wait...</h3>
                        : null }
                        { this.state.error ?
                        <h3>An error occurred</h3>
                        : null }
                        { this.state.unsubscribed ?
                        <h3>{this.state.email} has been successfully unsubscribed!</h3>
                        : null } 
                        </div>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
        );
    }
}

export default Unsubscribe;
