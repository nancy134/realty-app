import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import StepperShareListing from '../components/StepperShareListing';
import SearchContacts from '../components/SearchContacts';

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

        if (this.props.groupContacts.length > 0){
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
                        <SearchContacts
                            onContactsSelected={this.handleContactsSelected}
                            contactsSelected={this.props.contactsSelected}
                            onSelectGroup={this.props.onSelectGroup}
                            user={this.props.user}
                            selectedGroup={this.props.selectedGroup}
                            groups={this.props.groups}
                            showAddGroup={this.props.showAddGroup}
                            onShowAddGroup={this.props.onShowAddGroup}
                            onHideAddGroup={this.props.onHideAddGroup}
                            onAddGroup={this.props.onAddGroup}
                            getContacts={this.props.getContacts}
                        />
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
