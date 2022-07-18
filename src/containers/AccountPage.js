import React, { Component } from 'react';
import './AccountPage.css';
import {
    Container,
    Alert,
} from 'react-bootstrap';
import withRouter from '../helpers/withRouter';
import AccountToolbar from '../components/AccountToolbar';
import AccountProfile from '../components/AccountProfile';
import AccountPaymentMethodStripe from '../components/AccountPaymentMethodStripe';
import AccountAssociates from '../components/AccountAssociates';
import AccountBilling from '../components/AccountBilling';
import AccountSettings from '../components/AccountSettings';
import AccountButton from '../components/AccountButton';
import AccountEmbed from '../components/AccountEmbed';
import AccountLogos from '../components/AccountLogos';
import WizardAddListing from '../components/WizardAddListing';
import userService from '../services/users';
import listingService from '../services/listings';
import authenticationService from '../helpers/authentication';
import { Helmet } from 'react-helmet';
import { getTitlePrefix } from '../helpers/utilities';

export class AccountPage extends Component {
    constructor(props){
        super(props);
        this.handleSwitchTab = this.handleSwitchTab.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleAddListingFinish = this.handleAddListingFinish.bind(this);
        this.handleAddListingCancel = this.handleAddListingCancel.bind(this);

        var token  = this.props.router.params.token;
        this.state = {
            tab: "profile",
            token: token,
            accountStatus: null,
            association: null,
            loading: true
        };
    }

    handleSwitchTab(key){
        this.setState({
            tab: key
        });
    }

    handleLogin(result){
        var that = this;
        if (this.state.token){
            var body = {
                token: this.state.token,
                email: result.email
            };
            userService.acceptInvite(body).then(function(user){
                that.setState({
                    token: null,
                    accountStatus: null,
                    association: null,
                    tab: "profile"
                });
            }).catch(function(err){
            });
        }
        this.props.onLogin(result);
    }

    handleRegister(result){
        var body = {
            token: this.state.token,
            email: result.email
        };
        userService.acceptInvite(body).then(function(user){
        }).catch(function(err){
            console.log(err);
        });
    }

  handleAddListingFinish(listing){
      var that = this;
      listing.owner = authenticationService.getUserEmail();
      listingService.create(listing).then(function(data){
          that.props.onAddListingCancel();
          that.props.navigate(
              '/listing',
              { state: {
                  listingId: data.listing.id,
                  showDetail: true,
                  listingMode: "myListings",
                  createListing: true,
                  editMode: "edit"
              }}
          );
      }).catch(function(err){
          console.log(err);
      });
  }
  handleWizardLogin(){
      this.props.onLogin();
  }
  handleAddListingCancel(){
      this.props.onAddListingCancel();
  }
    componentDidMount(){
        var that = this;
        listingService.getEnumsPromise().then(function(enums){
            if (that.state.token){
                userService.getInvite(that.state.token, that.props.email).then(function(result){
                    if (result.operation === "accepted" && result.emailMatch === true){
                        that.setState({
                            loading: false,
                            token: null,
                            propertyTypes: enums.propertyTypes
                        });
                    } else {
                        that.setState({
                            accountStatus: result.operation,
                            association: result.association,
                            loading: false,
                            propertyTypes: enums.propertyTypes,
                            emailMatch: result.emailMatch
                        });
                    }
                }).catch(function(err){
                    console.log(err);
                    that.setState({
                        loading: false,
                        token: null,
                        propertyTypes: enums.propertyTypes
                    });
                });
            } else {
                that.setState({
                    loading: false,
                    propertyTypes: enums.propertyTypes
                });
            }
        }).catch(function(err){
            console.log(err);
        });
    }
    render(){
        // title
        var title  = getTitlePrefix(window.location.hostname);
        title += " - Account";

        var tab = this.state.tab;
        if (this.state.loading || this.props.loading){
            return(
            <Container>
                <Alert variant="primary">Initializing Page...</Alert>
            </Container>
            );
        } else {
        if (this.props.loggedIn && !this.state.token){
            return(
            <React.Fragment>
                <Helmet>
                    <title>{title}</title>
                </Helmet>
                { this.props.showAddListingWizard ?
                <WizardAddListing
                    loggedIn={this.props.loggedIn}
                    start={this.props.showAddListingWizard}
                    onFinish={this.handleAddListingFinish}
                    onCancel={this.handleAddListingCancel}
                    onLogin={this.handleWizardLogin}
                    propertyTypes={this.state.propertyTypes}
                />
                : null }
                <AccountToolbar onSwitchTab={this.handleSwitchTab}/>
                {tab === "profile" ? (
                <AccountProfile />
                ): null}
                {tab === "billing" ? (
                <AccountPaymentMethodStripe /> 
                ): null}
                {tab === "associates" ? (
                <AccountAssociates />
                ): null}
                {tab === "settings" ? (
                <AccountSettings />
                ): null}
                {tab === "payment" ? (
                <AccountBilling />
                ): null}
                {tab === "embed" ? (
                <AccountEmbed />
                ): null}
                {tab === "logos" ? (
                <AccountLogos />
                ): null}                
            </React.Fragment>
            );
        } else {
            return(
            <React.Fragment>
                { this.props.showAddListingWizard ?
                <WizardAddListing
                    loggedIn={this.props.loggedIn}
                    start={this.props.showAddListingWizard}
                    onFinish={this.handleAddListingFinish}
                    onCancel={this.handleAddListingCancel}
                    onLogin={this.handleWizardLogin}
                    propertyTypes={this.state.propertyTypes}
                />
                : null }

                { this.state.token ?
                <Container>
                    <Alert
                        variant="primary"
                    >   { !this.state.emailMatch ?
                        <div className="d-flex flex-column">
                            <p className="d-flex justify-content-center">Your association invite was for a different email address.</p>
                            <p className="d-flex justify-content-center">Logout of this account to register or login with the email you received the invitation.</p>
                        </div>
                        : null }
                        { this.state.accountStatus === "login" && !this.props.loggedIn && this.state.emailMatch?
                        <div className="d-flex flex-column">
                            <p className="d-flex justify-content-center">You have been invited to become an associate.</p>
                            <p className="d-flex justify-content-center">Please login to confirm.</p>
                            <div className="d-flex justify-content-center">
                                <AccountButton
                                    initialState="login"
                                    onLogin={this.handleLogin}
                                    onRegister={this.handleRegister}
                                />
                            </div>
                        </div>
                        : null }

                        { this.state.accountStatus === "register" && !this.props.loggedIn && this.state.emailMatch ?
                        <div className="d-flex flex-column">
                            <p className="d-flex justify-content-center">You have been invited to become an associate</p>
                            <p className="d-flex justify-content-center">Please register with FindingCRE to join!</p>
                            <div className="d-flex justify-content-center">
                                <AccountButton
                                    initialState="register"
                                    onRegister={this.handleRegister}
                                    onLogin={this.handleLogin}
                                />
                            </div>
                        </div>
                        : null }
                        { this.state.accountStatus === "register" && this.props.loggedIn && this.state.emailMatch ?
                        <div className="d-flex flex-column">
                            <p className="d-flex justify-content-center">You have been invited to become an associate under a different account.</p>
                            <p className="d-flex justify-content-center">You will need to logout of this account and register with the email where you received the invitation.</p>
                        </div>
                        : null }
                        { this.props.loggedIn && this.state.accountStatus === "login" && this.state.emailMatch?
                        <div className="d-flex flex-column">
                            <p className="d-flex justify-content-center">Your invitation to become an associate has been accepted!</p>
                        </div>

                        : null }
                    </Alert>
                </Container>
                :
                <Container>
                <Alert variant="primary">
                    <div className="d-flex flex-column"> 
                        <p className="d-flex justify-content-center">Login to see your Account information</p>
                    </div>
                </Alert>
                </Container>
                }
            </React.Fragment>
            );
            }
        }
    }
}
export default withRouter(AccountPage);
