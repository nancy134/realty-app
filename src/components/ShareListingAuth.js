import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import StepperShareListing from '../components/StepperShareListing';
import authService from '../services/auth';
import LocalStorage from '../services/localStorage';
import constantService from '../services/constant';

const localStorageService = LocalStorage.getService();

let windowObjectReference = null;
let previousUrl = null;

class ShareListingAuth extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
        this.openSignInWindow = this.openSignInWindow.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.updateAccessToken = this.updateAccessToken.bind(this);
        this.state = {
            authUrl: null,
            authorizationCode: null,
            loading: false,
            accessToken: null,
            resfreshToken: null,
            loggedIn: false
        };
    }

    handleNext(){
        this.props.onNext(this.state.accessToken, this.state.refreshToken);
    }

    handleSignin(){
         this.openSignInWindow(this.state.authUrl, "Constant Contact Signin");
    }
    updateAccessToken(accessToken, refreshToken){
        localStorageService.setCCAccessToken(accessToken);
        localStorageService.setCCRefreshToken(refreshToken);

        this.setState({
            loggedIn: true,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
}

    receiveMessage (event){
        var that = this;
        window.removeEventListener('message', this.receiveMessage);

        var code = event.data.substring(6);
        this.setState({
            authorizationCode: event.data.substring(6)
        });
       
        authService.getCCAuthToken(code,this.state.redirect_uri).then(function(result){
            console.log(result);
            that.updateAccessToken(result.access_token, result.refresh_token);
        }).catch(function(err){
            console.log(err);
        });
    }

    openSignInWindow (url, name) {
        // remove any existing event listeners
        window.removeEventListener('message', this.receiveMessage);

        // window features
        const strWindowFeatures =
        'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

        if (windowObjectReference === null || windowObjectReference.closed) {
            /* if the pointer to the window object in memory does not exist
            or if such pointer exists but the window was closed */
            windowObjectReference = window.open(url, name, strWindowFeatures);
        } else if (previousUrl !== url) {
            /* if the resource to load is different,
            then we load it in the already opened secondary window and then
            we bring such window back on top/in front of its parent window. */
            windowObjectReference = window.open(url, name, strWindowFeatures);
            windowObjectReference.focus();
        } else {
            /* else the window reference must exist and the window
            is not closed; therefore, we can bring it back on top of any other
            window with the focus() method. There would be no need to re-create
            the window or to reload the referenced resource. */
            windowObjectReference.focus();
        }

        // add the listener for receiving a message from the popup
        window.addEventListener('message', this.receiveMessage, false);
        // assign the previous URL
        previousUrl = url;
   }

    componentDidMount(){
        // Get authorization url
        var that = this;
        var accessToken = localStorageService.ccAccessToken();
        var refreshToken = localStorageService.ccRefreshToken();
        var tokenInfoBody = {
            token: accessToken
        };
        console.log(tokenInfoBody);
        constantService.tokenInfo(tokenInfoBody).then(function(tokenInfo){
            that.updateAccessToken(accessToken, refreshToken);
            console.log(tokenInfo);
        }).catch(function(err){
            console.log(err);
            authService.ccRefreshToken(refreshToken).then(function(result){
                that.updateAccessToken(result.access_token, result.refresh_token);
            }).catch(function(err){
                console.log(err);
                authService.getCCAuthUrl().then(function(result){
                    var hostname = window.location.hostname;
                    var protocol = window.location.protocol;
                    var redirect_uri =
                        protocol +
                        "//" +
                        hostname +
                        "/constantcontact";

                    var url =
                        result +
                        redirect_uri;

                    that.setState({
                        authUrl: url,
                        redirect_uri: redirect_uri
                    });
                    console.log(url);
                }).catch(function(err){
                    console.log(err);
                });
            });
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
                        Authentication 
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <StepperShareListing
                    selectShareMethodComplete={true}
                    selectShareContactsComplete={true}
                    methodType={this.props.methodType}
                />
                <Row>
                    <Col>
                        { !this.state.loggedIn ?
                        <Button
                            onClick={this.handleSignin}
                        >
                            Login Constant Contact
                        </Button>
                        : null }
                    </Col>
                </Row>
                <Row>
                    { this.state.loggedIn ?
                    <p><span>You're logged into Constant Contact</span></p>
                    : null }
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onCancel}
                >
                    Cancel
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
export default ShareListingAuth;
