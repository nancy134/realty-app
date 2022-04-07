import React from 'react';
import {
    Form,
    Modal,
    Button
} from 'react-bootstrap';
import GroupAddModal from '../components/GroupAddModal';

class GroupSelectModal extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.handleShowGroupAddModal = this.handleShowGroupAddModal.bind(this);

        console.log(this.props.groups);
        var checkedGroups = [];
        for (var i=0; i<this.props.groups.length; i++){
            var checkedGroup = false;
            if (this.props.contactGroups){
                for (var j=0; j<this.props.contactGroups.length; j++){
                    if (this.props.contactGroups[j] === this.props.groups[i])
                        checkedGroup = true;
                }
            }
            checkedGroups.push(checkedGroup);
        }
        this.state = {
            checkedGroups: checkedGroups
        };

    }

    toggleCheckbox(index) {
        const { checkedGroups } = this.state;
        checkedGroups[index] = !checkedGroups[index];
    }

    handleSave(){
        var groups = [];
        for (var i=0; i<this.state.checkedGroups.length; i++){
            if (this.state.checkedGroups[i] === true){
                groups.push(this.props.groups[i]);
            }
        }
        this.props.onSaveSelectedGroups(groups);
    }

    handleShowGroupAddModal(){
        this.props.onShowGroupModal();
    }

    render(){
    return(
    <React.Fragment>
    { this.props.showGroupModal ?
    <GroupAddModal
        show={this.props.showGroupModal}
        onHide={this.props.onHideGroupModal}
        onSave={this.props.onSaveGroup}
    />
    : null }
    <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Select Groups 
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {this.props.groups.map((group, index) =>
                <div key={index}>
                    <Form.Check
                        type="checkbox"
                        label={group.name}
                        defaultChecked={this.state.checkedGroups[index]}
                        onChange={() => this.toggleCheckbox(index)}
                    />
                </div>
                )}
                <Button
                    onClick={this.handleShowGroupAddModal}
                >
                    Add New Group
                </Button>
 
            </Form>
 
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.onHide}>Cancel</Button>
            <Button onClick={this.handleSave}>Save</Button>
        </Modal.Footer>
    </Modal>
    </React.Fragment>
    );
    } 
}

export default GroupSelectModal;
