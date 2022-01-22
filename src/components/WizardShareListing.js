import React, { Component } from 'react';
import ShareListingMethod from '../components/ShareListingMethod';
import ShareListingContacts from '../components/ShareListingContacts';
import ShareListingAuth from '../components/ShareListingAuth';
import ShareListingImages from '../components/ShareListingImages';
import ShareListingPreview from '../components/ShareListingPreview';
import ShareListingsPreview from '../components/ShareListingsPreview';
import ShareListingPreviewConstant from '../components/ShareListingPreviewConstant';
import ShareListingFacebook from '../components/ShareListingFacebook';
import ShareListingTwitter from '../components/ShareListingTwitter';
import ShareListingLinkedIn from '../components/ShareListingLinkedIn';
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

        this.handleShareAuthNext = this.handleShareAuthNext.bind(this);
        this.handleShareAuthCancel = this.handleShareAuthCancel.bind(this);

        this.handleShareImageNext = this.handleShareImageNext.bind(this);
        this.handleShareImageCancel = this.handleShareImageCancel.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);

        this.handleSharePreviewNext = this.handleSharePreviewNext.bind(this);
        this.handleSharePreviewCancel = this.handleSharePreviewCancel.bind(this);
        this.handleShareSubjectChanged = this.handleShareSubjectChanged.bind(this);

        this.handleSharePreviewConstantNext = this.handleSharePreviewConstantNext.bind(this);
        this.handleSharePreviewConstantCancel = this.handleSharePreviewConstantCancel.bind(this);

        this.handleShareFacebookNext = this.handleShareFacebookNext.bind(this);
        this.handleShareFacebookCancel = this.handleShareFacebookCancel.bind(this);

        this.handleShareTwitterNext = this.handleShareTwitterNext.bind(this);
        this.handleShareTwitterCancel = this.handleShareTwitterCancel.bind(this);

        this.handleShareLinkedInNext = this.handleShareLinkedInNext.bind(this);
        this.handleShareLinkedInCancel = this.handleShareLinkedInCancel.bind(this);

        this.handleShareConfirmNext = this.handleShareConfirmNext.bind(this);

        this.state = {
            showShareListingMethod: true,
            showShareListingContacts: false,
            showShareListingAuth: false,
            showShareListingImage: false,
            showShareListingPreview: false,
            showShareListingsPreview: false,
            showShareListingPreviewConstant: false,
            showShareListingFacebook: false,
            showShareListingTwitter: false,
            showShareListingLinkedIn: false,
            showSHareListingConfirm: false,
            contactsSelected: [],
            methodType: shareMethodTypes.EMAILFC,
            user: null,
            subject: "Exclusive Listing",
            body: null,
            selectedImage: null,
            selectedImageUrl: null
        };
    }

    handleShareMethodNext(){
        if (this.state.methodType === shareMethodTypes.EMAILFC){
            this.setState({
                showShareListingMethod: false,
                showShareListingContacts: true
            });
        } else if (this.state.methodType === shareMethodTypes.FACEBOOK){
            this.setState({
                showShareListingMethod: false,
                showShareListingFacebook: true
            });
        } else if (this.state.methodType === shareMethodTypes.TWITTER){
            this.setState({
                showShareListingMethod: false,
                showShareListingTwitter: true
            });
        } else if (this.state.methodType === shareMethodTypes.LINKEDIN){
            this.setState({
                showShareListingMethod: false,
                showShareListingLinkedIn: true
            });
        } else {
            this.setState({
                showShareListingMethod: false,
                showShareListingAuth: true
            });
        }
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
            showShareListingImage: true,
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

    handleShareAuthNext(accessToken, refreshToken){
        this.setState({
            showShareListingImage: true,
            showShareListingAuth: false,
            accessToken: accessToken,
            refreshToken: refreshToken
            
        });
    }

    handleShareAuthCancel(){
        this.setState({
            showShareListingAuth: false
        });
        this.props.onCancel();
    }

    handleShareImageNext(){
        if (this.props.listing){
            this.setState({
                showShareListingPreview: true,
                showShareListingImage: false
            });
        } else if (this.props.listings){
            this.setState({
                showShareListingsPreview: true,
                showShareListingImage: false
            });
        }
    }

    handleSelectImage(id, url){
        this.setState({
            selectedImage: id,
            selectedImageUrl: url
        });
    }
    handleShareImageCancel(){
        this.setState({
            showShareListingImage: false
        });
        this.props.onCancel();
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

    handleSharePreviewConstantNext(body){
        this.setState({
            showShareListingPreviewConstant: false,
            showShareListingConfirm: true,
            body: body
        });
    }

    handleSharePreviewConstantCancel(){
        this.setState({
            showShareListingPreviewConstant: false
        });
        this.props.onCancel();
    }

    handleShareFacebookNext(){
        this.setState({
            showShareFacebook: false,
            showShareListingConfirm: true
        });
    }

    handleShareFacebookCancel(){
        this.setState({
            showShareFacebok: false
        });
        this.props.onCancel();
    }

    handleShareTwitterNext(){
        this.setState({
            showShareTwitter: false,
            showShareListingConfirm: true
        });
    }

    handleShareTwitterCancel(){
        this.setState({
            showShareTwitter: false
        });
        this.props.onCancel();
    }

    handleShareLinkedInNext(){
        this.setState({
            showShareLinkedIn: false,
            showShareListingConfirm: true
        });
    }

    handleShareLinkedInCancel(){
        this.setState({
            showShareLinkedIn: false
        });
        this.props.onCancel();
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
            { this.state.showShareListingFacebook ?
            <ShareListingFacebook
                show={this.state.showShareListingFacebook}
                onNext={this.handleShareFacebookNext}
                onCancel={this.handleShareFacebookCancel}
            />
            : null }
            { this.state.showShareListingTwitter ?
            <ShareListingTwitter
                show={this.state.showShareListingTwitter}
                onNext={this.handleShareTwitterNext}
                onCancel={this.handleShareTwitterCancel}
            />
            : null }
            { this.state.showShareListingLinkedIn ?
            <ShareListingLinkedIn
                show={this.state.showShareListingLinkedIn}
                onNext={this.handleShareLinkedInNext}
                onCancel={this.handleShareLinkedInCancel}
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
            { this.state.showShareListingAuth ?
            <ShareListingAuth
                show={this.state.showShareListingAuth}
                onNext={this.handleShareAuthNext}
                onCancel={this.handleShareAuthCancel}
            />
            : null }
            { this.state.showShareListingImage ?
            <ShareListingImages
                show={this.state.showShareListingImage}
                onNext={this.handleShareImageNext}
                onCancel={this.handleShareImageCancel}
                selectedImage={this.state.selectedImage}
                onSelectImage={this.handleSelectImage}
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
                selectedImageUrl={this.state.selectedImageUrl}
            />
            : null }
            { this.state.showShareListingsPreview ?
            <ShareListingsPreview
                show={this.state.showShareListingsPreview}
                onNext={this.handleSharePreviewNext}
                onCancel={this.handleSharePreviewCancel}
                listings={this.props.listings}
                methodType={this.state.methodType}
                contactsSelected={this.state.contactsSelected}
                user={this.state.user}
                subject={this.state.subject}
                onSubjectChange={this.handleShareSubjectChanged}
                selectedImageUrl={this.state.selectedImageUrl}
            />
            : null }

            { this.state.showShareListingPreviewConstant ?
            <ShareListingPreviewConstant
                show={this.state.showShareListingPreviewConstant}
                onNext={this.handleSharePreviewConstantNext}
                onCancel={this.handleSharePreviewConstantCancel}
                listing={this.props.listing}
                methodType={this.state.methodType}
                contactsSelected={this.state.contactsSelected}
                user={this.state.user}
                subject={this.state.subject}
                onSubjectChange={this.handleShareSubjectChanged}
                accessToken={this.state.accessToken}
                refreshToken={this.state.refreshToken}
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
