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
                    completed={this.props.AddListingOverviewCompleted}
                >
                    <StepLabel>Overview</StepLabel>
                </Step>
                { this.props.loggedIn ?
                <Step
                    active={this.props.loginActive}
                    completed={this.props.loginCompleted}
                >
                    <StepLabel>Login</StepLabel>
                </Step>
                : null }
            </Stepper>
        </React.Fragment>
        );
    }
}

export default StepperAddListing;
