import React from 'react';
import {
    Row,
    Col,
    Button,
    OverlayTrigger,
    Popover,
    Accordion
} from 'react-bootstrap';
import userService from '../services/users';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClipboard
} from '@fortawesome/free-solid-svg-icons';
import PolicyModal from '../components/PolicyModal';
import parse from 'html-react-parser';

  const popover = (
    <Popover id="popover-basic">
      <div>
        HTML copied to clipboard.
      </div>
    </Popover>
  );

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
            '<center><iframe src="https://' +
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
            <div > 
            <Row>
            <Col xs={1}></Col>
            <Col xs={9}>
                <h1>Embed</h1>
                <p>Copy the following HTML into your website</p>
            </Col>
            <Col xs={2}></Col>
                </Row>
                <Row>
                <Col xs={1}></Col>
            <Col xs={9}>
                <pre className="no-wrap-pre"
                    ref={this.preRef}
                >
                    {this.state.iframe}
                </pre>
            </Col>
            <Col xs={2}>
                <OverlayTrigger trigger="click" placement="right" rootClose overlay={popover}>
                    <FontAwesomeIcon 
                        onClick={() => this.copyCodeToClipboard()}
                        icon={faClipboard}
                        size="lg"
                        title="Copy to Clipboard"
                        alt="Copy to Clipboard"
                    />
                </OverlayTrigger>
            </Col>    
            </Row>
            <Row><Col xs={12}></Col></Row>
            <Row><Col xs={12}></Col></Row>
            <Row><Col xs={12}></Col></Row>
                
<Row>
<Col xs={1}></Col>
<Col xs={9}>
<Accordion>
<Accordion.Item eventKey="0">
<Accordion.Header>More Instructions</Accordion.Header>
<Accordion.Body>
          <p>FindingCRE offers the ability to embed listings you have created on FindingCRE on your company website.  Simply cut and paste the HTML code below into your website and any listings you create or update will be automatically updated on your website.  This will save you time and your website will always be up to date without having to enter information in multiple locations.</p>
<p>Different web providers will have different ways to embed HTML.  If you have a web administrator, copy the code by clicking the CLIPBOARD icon, or highlighting the code and pressing CTRL-C.  Then paste the code into an e-mail to your web administrator using CTRL-V.</p>
<p>If you manage your own website, most drag and drop web creation sites will have a special section to allow HTML to be inserted (refer to your web provides help section for instructions.  A search for “embed HTML”, or “insert HTML” should bring up the correct options).  Open the page you wish the listings to appear and select the insert HTML option. Copy the code from FindingCRE by clicking the CLIPBOARD icon, or highlighting the code and pressing CTRL-C.  Then paste the code onto your website using CTRL-V.  If the listings do not appear right away, there should be a preview option available from you web provider to see the results.  When finished, save the page and you are good to go.  Now, anytime you update or add a listing on FindingCRE, it will appear on your website (no additional changes are required on your website).</p>
<p>If the listing window is too large or too small, you may also adjust the size of the window that the listings appear in.  FindingCRE defaults to 90% of the page’s width and a height of 600 pixels.  By changing the parameter ‘width=”90%”’ with a higher or lower number (between 10 and 100) you can adjust the width of the listing window (only change the number value, do not add additional spaces or remove any of the punctuation).  You may also change the height by changing the ‘height=”600px”’ to a higher or lower number (only change the number value, do not add additional spaces or remove any of the punctuation).</p>
</Accordion.Body>
</Accordion.Item>
</Accordion>
</Col>
<Col xs={2}></Col>
</Row>
<Row>
<Col xs={1}></Col>
<Col xs={9}>
<h1>Preview</h1>
</Col>
</Row>


            <Row>
                <Col xs={1}></Col>
                <Col xs={10}>{parse(this.state.iframe)}</Col>
                <Col xs={1}></Col>
            </Row>

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

