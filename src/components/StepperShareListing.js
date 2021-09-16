import React from 'react';
import {
    Stepper,
    Step,
    StepLabel
} from '@material-ui/core';
import {shareMethodTypes} from '../constants/shareMethodTypes';

class StepperShareListing extends React.Component {
    render(){

       var contactsText = "Contacts";

       if (this.props.methodType === shareMethodTypes.EMAILCC ||
           this.props.methodType === shareMethodTypes.FACEBOOK ||
           this.props.methodType === shareMethodTypes.TWITTER){
           contactsText = "Authentication";
       }

       return(
       <React.Fragment>
           <Stepper>
               <Step
                   active={this.props.selectShareMethodActive}
                   completed={this.props.selectShareMethodComplete}
               >
                   <StepLabel>Method</StepLabel>
               </Step>
               <Step
                   active={this.props.selectShareContactsActive}
                   completed={this.props.selectShareContactsComplete}
               >
                   <StepLabel>{contactsText}</StepLabel>
               </Step>
               <Step
                   active={this.props.selectSharePreviewActive}
                   completed={this.props.selectSharePreviewComplete}
               >
                   <StepLabel>Preview</StepLabel>
               </Step>
               <Step
                   active={this.props.selectConfirmActive}
                   completed={this.props.selectConfirmComplete}
               >
                   <StepLabel>Confirmation</StepLabel>
               </Step>
             
                  
           </Stepper>
       </React.Fragment>
       );
    }
}

export default StepperShareListing;
