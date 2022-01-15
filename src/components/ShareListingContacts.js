import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import StepperShareListing from '../components/StepperShareListing';

class ShareListingContacts extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleContactsSelected = this.handleContactsSelected.bind(this);
    }
    handleContactsSelected(rows){
        this.props.onContactsSelected(rows);
    }
    handleNext(){
        this.props.onNext();
    };
    render(){
        var disableButton = true;

        if (this.props.contactsSelected.length > 0){
            disableButton = false;
        }

        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onCancel}
            animation={false}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>
                        Select Contacts 
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepperShareListing
                    selectShareMethodComplete={true}
                    selectShareContactsActive={true}
                    methodType={this.props.methodType}
                />
                <Row>
                    <Col>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="button-add-listing-type-cancel"
                    onClick={this.props.onCancel}
                >
                    <span>Cancel</span> 
                </Button>
                <Button 
                    disabled={disableButton}
                    id="button-add-listing-type-next"
                    onClick={this.handleNext}
                >
                    Next 
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}
export default ShareListingContacts;
