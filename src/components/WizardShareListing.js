import React, { Component } from 'react';
import ShareListingMethod from '../components/ShareListingMethod';
import ShareListingContacts from '../components/ShareListingContacts';
import ShareListingPreview from '../components/ShareListingPreview';
import ShareListingConfirm from '../components/ShareListingConfirm';
import {shareMethodTypes} from '../constants/shareMethodTypes';
import userService from '../services/users';

export class WizardShareListing extends Component {
    constructor(props){
        super(props);

        this.handleShareMethodNext = this.handleShareMethodNext.bind(this);
        this.handleShareMethodCancel = this.handleShareMethodCancel.bind(this);
        this.handleShareMethodChange = this.handleShareMethodChange.bind(this);

        this.handleShareContactsNext = this.handleShareContactsNext.bind(this);
        this.handleShareContactsCancel = this.handleShareContactsCancel.bind(this);
        this.handleShareContactsSelected = this.handleShareContactsSelected.bind(this);

        this.handleSharePreviewNext = this.handleSharePreviewNext.bind(this);
        this.handleSharePreviewCancel = this.handleSharePreviewCancel.bind(this);
        this.handleShareSubjectChanged = this.handleShareSubjectChanged.bind(this);

        this.handleShareConfirmNext = this.handleShareConfirmNext.bind(this);

        this.state = {
            showShareListingMethod: true,
            showShareListingContacts: false,
            showShareListingPreview: false,
            showSHareListingConfirm: false,
            contactsSelected: [],
            methodType: shareMethodTypes.EMAILFC,
            user: null,
            subject: "Exclusive Listing",
            body: null
        };
    }

    handleShareMethodNext(){
        this.setState({
            showShareListingMethod: false,
            showShareListingContacts: true
        });
    }

    handleShareMethodCancel(){
        this.setState({
            showShareListingContacts: false
        });
        this.props.onCancel();
    }

    handleShareMethodChange(methodType){
        this.setState({
            methodType: methodType
        });
    }

    handleShareContactsNext(){
        this.setState({
            showShareListingPreview: true,
            showShareListingContacts: false
        });
    }

    handleShareContactsCancel(){
        this.setState({
            showShareListingContacts: false
        });
        this.props.onCancel();
    }

    handleShareContactsSelected(rows){
        this.setState({
            contactsSelected: rows
        });
    }

    handleSharePreviewNext(body){
        this.setState({
            showShareListingPreview: false,
            showShareListingConfirm: true,
            body: body
        });
    }

    handleSharePreviewCancel(){
        this.setState({
            showShareListingPreview: false
        });
        this.props.onCancel();
    }

    handleShareSubjectChanged(subject){
        this.setState({
            subject: subject
        });
    }

    handleShareConfirmNext(){
        this.setState({
            showShareListingConfirm: false
        });
        this.props.onCancel();
    }

    componentDidMount(){
        var that = this;
        userService.getUser().then(function(user){
            that.setState({
                user: user
            });
        }).catch(function(err){
        });
    }
    render(){
        var startWizard = this.props.start && this.state.showShareListingMethod;
        return(
        <React.Fragment>
            { startWizard ?
            <ShareListingMethod
                show={this.props.start}
                onNext={this.handleShareMethodNext}
                onCancel={this.handleShareMethodCancel}
                onShareMethodChange={this.handleShareMethodChange}
                methodType={this.state.methodType}
            />
            : null }
            { this.state.showShareListingContacts ?
            <ShareListingContacts
                show={this.state.showShareListingContacts}
                onNext={this.handleShareContactsNext}
                onCancel={this.handleShareMethodCancel}
                onContactsSelected = {this.handleShareContactsSelected}
                methodType={this.state.methodType}
                contactsSelected={this.state.contactsSelected}
                user={this.state.user}
            />
            : null }
            { this.state.showShareListingPreview ?
            <ShareListingPreview
                show={this.state.showShareListingPreview}
                onNext={this.handleSharePreviewNext}
                onCancel={this.handleSharePreviewCancel}
                listing={this.props.listing}
                methodType={this.state.methodType}
                contactsSelected={this.state.contactsSelected}
                user={this.state.user}
                subject={this.state.subject}
                onSubjectChange={this.handleShareSubjectChanged}
            />
            : null }
            { this.state.showShareListingConfirm ?
            <ShareListingConfirm
                show={this.state.showShareListingConfirm}
                onNext={this.handleShareConfirmNext}
                listing={this.props.listing}
                methodType={this.state.methodType}
                contactsSelected={this.state.contactsSelected}
                user={this.state.user}
                subject={this.state.subject}
                body={this.state.body}
            />
            : null }
        </React.Fragment>
        );
    }
}

export default WizardShareListing;
