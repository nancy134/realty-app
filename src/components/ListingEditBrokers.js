import React from 'react';
import {
    Modal
} from 'react-bootstrap';

class ListingEditBrokers extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(){
        console.log("handleSave");
    }

    render(){

        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Brokers 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body> 
            </Modal.Body>
        </Modal>
        );
    }
}

export default ListingEditBrokers;
