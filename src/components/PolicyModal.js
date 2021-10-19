import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import PolicyTerms from '../components/PolicyTerms';
import PolicyPrivacy from '../components/PolicyPrivacy';
import PolicyAbout from '../components/PolicyAbout';

class PolicyModal extends React.Component {
    constructor(props){
        super(props);
        this.handleOpenInNewWindow = this.handleOpenInNewWindow.bind(this);
    }

    handleOpenInNewWindow(){
        var url =
            window.location.protocol +
            "//" + window.location.hostname +
            "/terms";
        window.open(url, "_blank");
    }
    render(){
        var title = "";
        if (this.props.type === "terms"){
            title = "Terms & Conditions";
        } else if (this.props.type === "privacy"){
            title = "Privacy Policy";
        } else if (this.props.type === "about"){
            title = "About";
        }
        
        return(
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modal-80w"
            centered
            show={this.props.show}
            onHide={this.props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title} 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                { this.props.type === "terms" ?
                <PolicyTerms />
                : null }
                { this.props.type === "privacy" ?
                <PolicyPrivacy />
                : null }
                { this.props.type === "about" ?
                <PolicyAbout />
                : null }
            </Modal.Body>
            <Modal.Footer>
                { this.props.type === "terms" ?
                <Button variant="link" onClick={this.handleOpenInNewWindow}>Open in New Window</Button>
                : null }
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default PolicyModal;
