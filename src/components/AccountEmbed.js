import React from 'react';
import {
    Row,
    Col,
    Form,
    Button
} from 'react-bootstrap';
import userService from '../services/users';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClipboard
} from '@fortawesome/free-solid-svg-icons';
import PolicyModal from '../components/PolicyModal';
import parse from 'html-react-parser';

class AccountEmbed extends React.Component {
    constructor(props){
        super(props);

        this.copyCodeToClipboard = this.copyCodeToClipboard.bind(this);
        this.preRef = React.createRef();

        this.state = {
            iframe: ""
        };
        this.handleTerms = this.handleTerms.bind(this);
        this.handlePrivacy = this.handlePrivacy.bind(this);
        this.handlePolicyModalHide = this.handlePolicyModalHide.bind(this);
    }
    copyCodeToClipboard() {
        const el = this.preRef
        var innerHTML = el.current.innerText;
        console.log(innerHTML);
        copy(innerHTML);
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
                '></iframe></center><p style="color:blue; font-size:9px; margin-left:5%;">Listings Provided by <a href="https://www.findingcre.com/" target="_blank">FindingCRE</a></p>';

            that.setState({
                iframe: iframe,
                showPolicyModal: false,
policyType: "",
            });
        }).catch(function(err){
        });
    }
    handleTerms(){
        this.setState({
            showPolicyModal: true,
            policyType: "terms"
        });
    }
    handlePrivacy(){
        this.setState({
            showPolicyModal: true,
            policyType: "privacy"
        });
    }
    handlePolicyModalHide(){
        this.setState({
            showPolicyModal: false,
            policyType: ""
        });
    }
    render(){
        return(
            <div className="profile-view"> 
            <Form className="p-5 profile">
            <Row>
                <Col xs={2}></Col>
                <Col xs={8} className="mb-1">
                    <h3>Embed</h3>
                    Copy the following HTML and place into your website
                </Col>
                <Col xs={2}></Col>
                </Row>
                <Row>
                <Col xs={2}></Col>
            <Col xs={8}>
                <pre className="no-wrap-pre"
                    ref={this.preRef}
                >
                    {this.state.iframe}
                </pre>
            </Col>
            <Col xs={2}>                    
                    <FontAwesomeIcon 
                        onClick={() => this.copyCodeToClipboard()}
                        icon={faClipboard}
                        size="lg"
                        title="Copy to Clipboard"
                        alt="Copy to Clipboard"
                    />
            </Col>    
            </Row>
            <Row><Col xs={12}></Col></Row>
            <Row><Col xs={12}></Col></Row>
            <Row>
                <Col xs={2}></Col>
                <Col xs={8}><h3>Preview</h3></Col>
                <Col xs={2}></Col>
            </Row>
            <Row><Col xs={12}></Col></Row>
            <Row>
                <Col xs={2}></Col>
                <Col xs={8}>{parse(this.state.iframe)}</Col>
                <Col xs={2}></Col>
            </Row>
                
            </Form>
            <div style={{ fontSize:"10pt"}} align="center">
            <PolicyModal
              show={this.state.showPolicyModal}
              type={this.state.policyType}
              onHide={this.handlePolicyModalHide}
          />
                By embedding FindingCRE listings on your site, you are agreeing to the FindingCRE
                <Button
           variant="link"
           size="sm"
           onClick={() => this.handleTerms("terms")}
       >
           <span>Terms & Conditions</span>
       </Button>
                
       { this.state.showPolicyModal ?
            <PolicyModal
                show={this.state.showPolicyModal}
                type={this.state.policyType}
                onHide={this.handlePolicyModalHide}
            />
            : null}

                </div>

            </div>

        );
    }
} 

export default AccountEmbed;

