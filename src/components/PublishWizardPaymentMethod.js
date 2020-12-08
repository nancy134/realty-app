import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import DropIn from 'braintree-web-drop-in-react';
import billingService from '../services/billing';

class PublishWizardPaymentMethod extends React.Component{
    constructor(props){
        super(props);

        this.handleNext = this.handleNext.bind(this);

        this.state = {
            clientToken: null
        };
    }

    componentDidMount(){
        var that = this;
        billingService.getClientToken().then(function(result){
            console.log(result);
            that.setState({
                clientToken: result.clientToken
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    handleNext(){
        this.instance.requestPaymentMethod().then(function(result){
            console.log(result);
        }).catch(function(err){
            console.log(err);
        });
    }
    render(){
        return(
            <Modal
                show={this.props.show}
                backdrop='static'
                dialogClassName="modal-60w"
            >
                <Modal.Header>
                    <Modal.Title
                    >
                       Payment Method 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropIn
                        options={{
                            authorization: this.state.clientToken
                        }}
                        onInstance={(instance) => (this.instance = instance)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.OnCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={this.handleNext}
                    >
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PublishWizardPaymentMethod;
