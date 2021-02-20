import React from 'react';
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';

class PublishWizardIntro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            termsAgreed: false
        };
        this.handleViewTerms = this.handleViewTerms.bind(this);
        this.handleTermsChanged = this.handleTermsChanged.bind(this);
    }
    handleViewTerms(){
        this.props.onShowPolicyModal("terms");
    }
    handleTermsChanged(){
        var termsAgreed = true;
        if (this.state.termsAgreed)
            termsAgreed = false;
        this.setState({
            termsAgreed: termsAgreed 
        });
    }
    render(){
        return(
        <React.Fragment>
            <Modal
                show={this.props.show}
                backdrop='static'
                dialogClassName="modal-60w"
            >
                <Modal.Header>
                    <Modal.Title
                    >
                       Publish a Listing
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Publishing a listing will make the listing visible to all visitors of FindingCRE.</p>
                    <p>By publishing a listing, you agree to our terms and conditions</p>
                    <Button
                        variant="outline-primary"
                        onClick={this.handleViewTerms}
                    >
                        <span>View Terms & Conditions</span>
                    </Button>
                    
                    <Form.Check
                        className="pt-2"
                    >
                        <Form.Check.Input
                            type="checkbox"
                            checked={this.state.termsAgreed}
                            onChange={this.handleTermsChanged}
                        />
                        <Form.Check.Label>
                            <span>I agree to Terms & Conditions</span>
                        </Form.Check.Label>
                    </Form.Check> 
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={!this.state.termsAgreed}
                        onClick={this.props.onNext}
                    >
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
        );
    }
}

export default PublishWizardIntro;
