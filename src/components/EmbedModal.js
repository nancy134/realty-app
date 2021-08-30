import React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import userService from '../services/users';

class EmbedModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            iframe: ""
        };
    }

    componentDidMount(){
        var that = this;
        var iframe =
            '<iframe src="https://' +
            window.location.hostname +
            '/listing?' +
            'embed=true&' +
            'user=';
        
        userService.getUser().then(function(user){
            iframe +=
                user.cognitoId +
                '" ' +
                'title="FindingCRE Listings" width="90%" height="600px" ' +
                '></iframe>';
            that.setState({
                iframe: iframe
            });
        }).catch(function(err){
        });
    }
    render(){
        return(
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-90w"
                centered
                show={this.props.show}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Embed 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Copy the following HTML and place into your website</div>
                    <pre>{this.state.iframe}</pre>
                    <div>By embedding FindingCRE listings on your site, you are agreeing to the FindingCRE Terms & Conditions</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EmbedModal;
