import React from 'react';
import {
    Modal,
    Button,
    Form,
    Row,
    Col
} from 'react-bootstrap';
import StepperShareListing from '../components/StepperShareListing';
import {shareMethodTypes} from '../constants/shareMethodTypes';

class ShareListingMethod extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleMethodChange = this.handleMethodChange.bind(this);
    }

    handleMethodChange(methodType){

        this.props.onShareMethodChange(methodType);
    }

    handleNext(){
        this.props.onNext();
    };
    render(){
        var shareListingMethodActive=true;
        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onCancel}
            animation={false}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>Select Share Method</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepperShareListing
                    selectShareMethodActive={shareListingMethodActive}
                    methodType={this.props.methodType}
                />
                    <Form className="pl-5 pr-5">
                    <h3>Email</h3>
                    <Row>
                        <Col>
                            <Form.Check>
                                <Form.Check.Input
                                    type="radio"
                                    checked={this.props.methodType === shareMethodTypes.EMAILFC}
                                    onChange={() => this.handleMethodChange(shareMethodTypes.EMAILFC)}
                                    onClick={() => this.handleMethodChange(shareMethodTypes.EMAILFC)}
                                />
                                <Form.Check.Label
                                    onClick={() => this.handleMethodChange(shareMethodTypes.EMAILFC)}
                                >
                                    <span>{shareMethodTypes.EMAILFC}</span>
                                </Form.Check.Label>
                            </Form.Check>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Check>
                                <Form.Check.Input
                                    type="radio"
                                    checked={this.props.methodType === shareMethodTypes.EMAILCC}
                                    onChange={() => this.handleMethodChange(shareMethodTypes.EMAILCC)}
                                    onClick={() => this.handleMethodChange(shareMethodTypes.EMAILCC)}
                                />
                                <Form.Check.Label
                                    onClick={() => this.handleMethodChange(shareMethodTypes.EMAILCC)}
                                >
                                    <span>{shareMethodTypes.EMAILCC}</span>
                                </Form.Check.Label>
                            </Form.Check>

                        </Col>
                    </Row>
                    <h3 className="pt-3">Social Media</h3>

                    <Row>
                        <Col>
                            <Form.Check>
                                <Form.Check.Input
                                    type="radio"
                                    checked={this.props.methodType === shareMethodTypes.FACEBOOK}
                                    onChange={() => this.handleMethodChange(shareMethodTypes.FACEBOOK)}
                                    onClick={() => this.handleMethodChange(shareMethodTypes.FACEBOOK)}
                                />
                                <Form.Check.Label
                                    onClick={() => this.handleMethodChange(shareMethodTypes.FACEBOOK)}
                                >
                                    <span>{shareMethodTypes.FACEBOOK}</span>
                                </Form.Check.Label>
                            </Form.Check>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Check>
                                <Form.Check.Input
                                    type="radio"
                                    checked={this.props.methodType === shareMethodTypes.LINKEDIN}
                                    onChange={() => this.handleMethodChange(shareMethodTypes.LINKEDIN)}
                                    onClick={() => this.handleMethodChange(shareMethodTypes.LINKEDIN)}
                                />
                                <Form.Check.Label
                                    onClick={() => this.handleMethodChange(shareMethodTypes.LINKEDIN)}
                                >
                                    <span>{shareMethodTypes.LINKEDIN}</span>
                                </Form.Check.Label>
                            </Form.Check>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Check>
                                <Form.Check.Input
                                    type="radio"
                                    checked={this.props.methodType === shareMethodTypes.TWITTER}
                                    onChange={() => this.handleMethodChange(shareMethodTypes.TWITTER)}
                                    onClick={() => this.handleMethodChange(shareMethodTypes.TWITTER)}
                                />
                                <Form.Check.Label
                                    onClick={() => this.handleMethodChange(shareMethodTypes.TWITTER)}
                                >
                                    <span>{shareMethodTypes.TWITTER}</span>
                                </Form.Check.Label>
                            </Form.Check>

                        </Col>
                    </Row>

                    <h3 className="pt-3">Text</h3>
                    <Row>
                        <Col>
                            <Form.Check>
                                <Form.Check.Input
                                    type="radio"
                                    checked={this.props.methodType === shareMethodTypes.TEXT}
                                    onChange={() => this.handleMethodChange(shareMethodTypes.TEXT)}
                                    onClick={() => this.handleMethodChange(shareMethodTypes.TEXT)}
                                />
                                <Form.Check.Label
                                    onClick={() => this.handleMethodChange(shareMethodTypes.TEXT)}
                                >
                                    <span>{shareMethodTypes.TEXT}</span>
                                </Form.Check.Label>
                            </Form.Check>

                        </Col>
                    </Row>
                    </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="button-add-listing-type-cancel"
                    onClick={this.props.onCancel}
                >
                    <span>Cancel</span> 
                </Button>
                <Button 
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
export default ShareListingMethod;
