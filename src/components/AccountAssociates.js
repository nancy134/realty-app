import React from 'react';
import {
    Row,
    Col,
    Button,
    Container,
    Jumbotron,
    Form,
    Dropdown,
    DropdownButton,
    Spinner,
    Alert
} from 'react-bootstrap';
import userService from '../services/users';
import authenticationService from '../helpers/authentication';

function Associate(props){
    if (props.associate.email === authenticationService.getUserEmail()){
        return null;
    } else {
    var hostName = window.location.hostname;
    var inviteLink = "https://" + hostName + "/account?token=" + props.associate.associationToken;
    return(
    <Row className="pt-2">
        <Col xs={3}>{props.associate.email}</Col>
        <Col xs={3}>{props.associate.associationStatus}</Col>
        <Col xs={5}>{inviteLink}</Col>
        <Col xs={1}>
            <DropdownButton
               title="Actions"
            >
                <Dropdown.Item
                    onClick={() => props.handleRemoveAssociate(props.associate.id, props.associate.AssociationId)}
                >Remove Associate</Dropdown.Item>
                { props.associate.associationStatus === "Invite sent" ?
                <Dropdown.Item
                    onClick={() => props.handleResendInvite(props.associate.AssociationId, props.associate.id)}
                >Resend Invite</Dropdown.Item>
                : null} 
            </DropdownButton>
        </Col>
    </Row>
    );
    }
}

class AccountAssociates extends React.Component {
    constructor(props){
        super(props);

        this.handleSendInvite = this.handleSendInvite.bind(this);
        this.handleAssociationChange = this.handleAssociatonChange.bind(this);
        this.handleInviteeEmailChange = this.handleInviteeEmailChange.bind(this);
        this.handleRemoveAssociate = this.handleRemoveAssociate.bind(this);
        this.handleResendInvite = this.handleResendInvite.bind(this);

        this.state = {
            associates: [],
            associationName: "",
            inviteeEmail: "",
            sendInviteProgress: false,
            errorMessage: null
        };
    }

    handleSendInvite(){
        var inviteeEmail = this.state.inviteeEmail.toLowerCase().trim();
        var cognitoId = authenticationService.getUserCognitoId();
        var associationName = "Created by "+cognitoId;
        var that = this;
        var body = {
            associationName: associationName,
            inviteeEmail: inviteeEmail 
        };
        this.setState({
            sendInviteProgress: true,
            errorMessage: null
        });
        userService.inviteAssociate(body).then(function(result){
            userService.getAssociatesMe().then(function(associates){
                that.setState({
                    associates: associates.associates,
                    associationName: associates.association.name,
                    sendInviteProgress: false
                }); 
            }).catch(function(err){
                that.setState({
                    errorMessage: err.message,
                    sendInviteProgress: false
                });
            });
        }).catch(function(err){
            that.setState({
                errorMessage: err.message,
                sendInviteProgress: false
            });
        });
    }
    handleInviteeEmailChange(event){
        this.setState({
            inviteeEmail: event.target.value
        });
    }
    handleAssociatonChange(event){
        this.setState({
            associationName: event.target.value
        });
    }
    handleRemoveAssociate(userId, associationId){
        var that = this;
        userService.removeAssociate(userId, associationId).then(function(associate){
            userService.getAssociatesMe().then(function(associates){
                console.log(associates);
                that.setState({
                    associates: associates.associates
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    handleResendInvite(associationId, userId){
        userService.resendInvite(associationId, userId).then(function(result){
        }).catch(function(err){
            console.log(err);
        });
    }

    componentDidMount(){
        var that = this;
        userService.getAssociatesMe().then(function(associates){
            var associationName = "";
            if (associates.association){
                associationName = associates.association.name;
            }
            that.setState({
                associates: associates.associates,
                associationName: associationName 
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    render(){

        var disableButton = true;
        if (this.state.inviteeEmail.length > 0)
            disableButton = false;

        var showName = false;

        return(
        <React.Fragment>
            <Container>
                <Row className="pt-5">
                </Row>
                <Jumbotron className="pt-2">
                    <Row>
                        <Col>
                            <h1 className="text-center">Account Asssociates</h1>
                        </Col>
                    </Row> 
                    <Row className="mt-5"></Row>
                    {showName ?                    
                    <Form.Group
                        as={Row}
                    >
                        <Form.Label
                            className="pl-0"
                            column
                            sm="2"
                        >
                            <span>Association Name</span>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                placeholder="Enter name for your association"
                                value={this.state.associationName}
                                onChange={this.handleAssociationChange}
                            />
                        </Col>
                    </Form.Group>
                    : null }
                    <Form.Group as={Row} controlId="invite-associate-input">
                        <Form.Label
                            className="pl-0" 
                            column 
                            sm="2"
                        >
                            <span>Associate Email</span>
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                placeholder="Enter email of associate"
                                value={this.state.inviteeEmail}
                                onChange={this.handleInviteeEmailChange}
                            />
                        </Col>
                        <Col sm="1">
                           <Button
                                id="invite-associate-button"
                                variant="success"
                                onClick={this.handleSendInvite}
                                disabled={disableButton}
                            >
                                { !this.state.sendInviteProgress ?
                                <span>Send Invite</span>
                                :
                                <span>
                                    <span>Send Invite&nbsp;</span>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </span>
                                }
                            </Button>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <h3>Associate Status</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}><h5>Email</h5></Col>
                        <Col xs={3}><h5>Status</h5></Col>
                        <Col xs={5}><h5>Invite Link</h5></Col>
                        <Col xs={1}><h5>Actions</h5></Col>
                    </Row>
                    { this.state.associates.map((associate, index) => 
                    (
                    <Associate
                        key={index}
                        associate={associate}
                        handleRemoveAssociate={this.handleRemoveAssociate}
                        handleResendInvite={this.handleResendInvite}
                    />
                    ))}
                    <Row
                        className="pt-2"
                    >
                    <Col>
                    {this.state.errorMessage ?
                    <Alert
                        variant="danger"
                    >
                        <span>Error:&nbsp;{this.state.errorMessage}</span>
                    </Alert>
                    : null}
                    </Col>
                    </Row>
                </Jumbotron> 
            </Container>
        </React.Fragment>
        );
    }
}

export default AccountAssociates;
