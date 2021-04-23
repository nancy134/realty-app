import React from 'react';
import {
    Row,
    Col,
    Form,
    Button,
    Spinner
} from 'react-bootstrap';
import userService from '../services/users';

class AccountSettings extends React.Component{

    constructor(props){
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleMarketingChange = this.handleMarketingChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            profile: null,
            updateProgress: false,
            optout: false 
        };
    }
    handleChange(){
    }
    handleMarketingChange(optout){
        this.setState({
            optout: optout 
        });
    }
    componentDidMount(){
        var that = this;
        this.setState({
            updateProgress: true
        });
        userService.getUser().then(function(result){
            that.setState({
                updateProgress: false
            });
            that.setState({
                profile: result,
                optout: result.optout
            });
        }).catch(function(err){
            that.setState({
                updateProgress: false
            });
        }); 
    };

    handleUpdate(){
        var profile = {};
        profile.optout = this.state.optout;

        var that = this;
        this.setState({
            updateProgress: true
        });

        userService.updateUser(this.state.profile.id, profile).then(function(response){
            that.setState({
                updateProgress: false
            });
        }).catch(function(err){
            that.setState({
                updateProgress: false,
            });
        });
    }
    render(){
        var initialValues = {
            mobilePhone: ""
        };
        var profile = this.state.profile;
        if (profile){
            if (profile.mobilePhone) initialValues.mobilePhone = profile.mobilePhone;
        }
        return(
        <div className="profile-view">
                    <Form className="p-5 profile">
                    <Row><Col>
                        <Form.Row>
                            <Col xs={6}>
                            <h3>Contact permission</h3>
                            <p>We'd love to send you exclusive offers and the latest info from FindingCRE by email and SMS.  We'll always treat your personal details with utmost care and will never sell them to other companies for marketing purposes.</p>
                            </Col>
                         </Form.Row>
                         <Form.Row>
                            <Form.Group >
<Form.Check
                    >
                        <Form.Check.Input
                            type="radio"
                            checked={this.state.optout === false}
                            onChange={this.handleChange}
                            onClick={() => this.handleMarketingChange(false)}
                        />
                        <Form.Check.Label
                            onClick={() => this.handleMarketingChange(false)}
                        >
                            Yes please, I'd like to hear about offers and services. 
                        </Form.Check.Label> 
                    </Form.Check>
                    <Form.Check
                    >
                        <Form.Check.Input
                            type="radio"
                            checked={this.state.optout === true }
                            onChange={this.handleChange}
                            onClick={() => this.handleMarketingChange(true)}
                        />
                        <Form.Check.Label
                            onClick={() => this.handleMarketingChange(true)}
                        >
                            No thanks, I don't want to hear about offers and services. 
                        </Form.Check.Label>
                    </Form.Check>
                            </Form.Group>
                        </Form.Row>
                    </Col></Row>
                    <Row>
                            <Button
                                variant="success"
                                onClick={this.handleUpdate}
                            >
                                { this.state.updateProgress ?
                                <Spinner
                                    animation="border"
                                    size="sm"
                                    role="status"
                                />
                                :
                                <span>Update Settings</span>
                                }
                            </Button>
                    </Row>
                    </Form>
        </div>
        );
   }
}

export default AccountSettings;
