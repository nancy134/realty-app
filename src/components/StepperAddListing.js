import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';

class StepperAddListing extends React.Component {
    render(){
        return(
        <React.Fragment>
            <Stepper>
                <Step
                    active={this.props.addListingTypeActive}
                    completed={this.props.addListingTypeCompleted}
                >
                    <StepLabel>Type</StepLabel>
                </Step>
                <Step
                    active={this.props.addListingAddressActive}
                    completed={this.props.addListingAddressCompleted}
                 >
                    <StepLabel>Address</StepLabel>
                </Step>
                <Step
                    active={this.props.addListingOverviewActive}
                    completed={this.props.addListingOverviewCompleted}
                >
                    <StepLabel>Overview</StepLabel>
                </Step>
                { this.props.notRegistered ?
                <Step
                    active={this.props.registerActive}
                    completed={this.props.registerCompleted}
                >
                    <StepLabel>Register</StepLabel>
                </Step>
                : null }
                { this.props.notRegistered ?
                <Step
                    active={this.props.confirmActive}
                    completed={this.props.confirmCompleted}
                >
                    <StepLabel>Confirm</StepLabel>
                </Step>
                : null }
                { this.props.forgotPassword ?
                <Step
                    active={this.props.forgotPasswordActive}
                    completed={this.props.forgotPasswordCompleted}
                >
                    <StepLabel>Forgot Password</StepLabel>
                </Step>
                : null }
                { this.props.forgotPassword ?
                <Step
                    active={this.props.forgotConfirmActive}
                    completed={this.props.forgotConfirmCompleted}
                >
                    <StepLabel>Confirm</StepLabel>
                </Step>
                : null }
                { !this.props.loggedIn ?
                <Step
                    active={this.props.loginActive}
                    completed={this.props.loginCompleted}
                >
                    <StepLabel>Login</StepLabel>
                </Step>
                : null }
                <Step
                    active={this.props.addListingReviewActive}
                    completed={this.props.addListingReviewCompleted}
                >
                    <StepLabel>Review</StepLabel>
                </Step>

            </Stepper>
        </React.Fragment>
        );
    }
}

export default StepperAddListing;
