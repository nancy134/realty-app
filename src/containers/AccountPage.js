import React, { Component } from 'react';
import './AccountPage.css';
import {
    Container,
    Alert,
} from 'react-bootstrap';
import AccountToolbar from '../components/AccountToolbar';
import AccountProfile from '../components/AccountProfile';
import AccountPaymentMethod from '../components/AccountPaymentMethod';
import AccountAssociates from '../components/AccountAssociates';
import AccountBilling from '../components/AccountBilling';
import AccountSettings from '../components/AccountSettings';
import AccountButton from '../components/AccountButton';
import WizardAddListing from '../components/WizardAddListing';
import userService from '../services/users';
import listingService from '../services/listings';
import authenticationService from '../helpers/authentication';
import { GoogleApiWrapper } from 'google-maps-react';

export class AccountPage extends Component {
    constructor(props){
        super(props);
        this.handleSwitchTab = this.handleSwitchTab.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleAddListingFinish = this.handleAddListingFinish.bind(this);
        this.handleAddListingCancel = this.handleAddListingCancel.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        const params = new URLSearchParams(props.location.search);
        var token  = params.get('token');
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
                token: this.state.token
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
        console.log("handleRegister()");
        console.log("body:");
        console.log(body);
        userService.acceptInvite(body).then(function(user){
            console.log("user:");
            console.log(user);
        }).catch(function(err){
            console.log(err);
        });
    }

  handleAddListingFinish(listing){
      var that = this;
      listing.owner = authenticationService.getUserEmail();
      listingService.create(listing).then(function(data){
          that.props.onAddListingCancel();
          that.props.history.push({
              pathname: '/listing',
              data: {
                  listingId: data.listing.id,
                  showDetail: true,
                  listingMode: "myListings",
                  createListing: true,
                  editMode: "edit"
              }
          });
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
                userService.getInvite(that.state.token).then(function(result){
                    console.log(result);
                    if (result.operation === "accepted"){
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
                            propertyTypes: enums.propertyTypes
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
        var tab = this.state.tab;
        if (this.state.loading || this.props.loading){
            return(
            <Container>
                <Alert variant="primary">Initializing Page...</Alert>
            </Container>
            );
        } else {
        if (this.props.loggedIn){
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
                <AccountToolbar onSwitchTab={this.handleSwitchTab}/>
                {tab === "profile" ? (
                <AccountProfile />
                ): null}
                {tab === "billing" ? (
                <AccountPaymentMethod /> 
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
                    >

                        { this.state.accountStatus === "login" ?
                        <div className="d-flex flex-column">
                            <p className="d-flex justify-content-center">You have been invited to become an associate of <b>&nbsp;{this.state.association}</b></p>
                            <p className="d-flex justify-content-center">Please login with to confirm.</p>
                            <div className="d-flex justify-content-center">
                                <AccountButton
                                    initialState="login"
                                    onLogin={this.handleLogin}
                                    onRegister={this.handleRegister}
                                />
                            </div>
                        </div>
                        : null }

                        { this.state.accountStatus === "register" ?
                        <div className="d-flex flex-column">
                            <p className="d-flex justify-content-center">You have been invited to become an associate of <b>&nbsp;{this.state.association}</b></p>
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
                    </Alert>
                </Container>
                :
                <Container>
                <Alert variant="primary">Login to see your Account information</Alert>
                </Container>
                }
            </React.Fragment>
            );
            }
        }
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(AccountPage);
