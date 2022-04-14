import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import StepperShareListing from '../components/StepperShareListing';
import mailService from '../services/mail';

class ShareListingConfirm extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.state = {
        };
    }

    handleNext(){
        this.props.onNext();
    }

    componentDidMount(){
        var body = this.props.body;
        body.preview = false;
        var that = this;
        mailService.sendListing(body).then(function(result){
            that.setState({
                result: "Success" 
            }); 
        }).catch(function(err){
            if (err.message){
                that.setState({
                    result: err.message 
                });
            } else {
                that.setState({
                    result: "An error occurred while trying to send the email"
                });
            }
        });
    }
    render(){
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
                        Preview 
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepperShareListing
                    selectShareMethodComplete={true}
                    selectShareContactsComplete={true}
                    selectShareImageComplete={true}
                    selectSharePreviewComplete={true}
                    selectShareConfirmActive={true}
                    methodType={this.props.methodType}
                />
                <Row>
                    <Col>
                        {this.state.result}
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="button-add-listing-type-next"
                    onClick={this.handleNext}
                >
                    Done 
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}
export default ShareListingConfirm;
