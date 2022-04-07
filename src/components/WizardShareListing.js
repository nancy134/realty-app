import React, { Component } from 'react';
import ShareListingMethod from '../components/ShareListingMethod';
import ShareListingContacts from '../components/ShareListingContacts';
import ShareListingAuth from '../components/ShareListingAuth';
import ShareListingImages from '../components/ShareListingImages';
import ShareListingPreview from '../components/ShareListingPreview';
import ShareListingsPreview from '../components/ShareListingsPreview';
import ShareListingPreviewConstant from '../components/ShareListingPreviewConstant';
import ShareListingFacebook from '../components/ShareListingFacebook';
import ShareListingConfirm from '../components/ShareListingConfirm';
import {shareMethodTypes} from '../constants/shareMethodTypes';
import userService from '../services/users';
import {shade} from '../helpers/color';
import contactService from '../services/contacts';

export class WizardShareListing extends Component {
    constructor(props){
        super(props);

        this.handleShareMethodNext = this.handleShareMethodNext.bind(this);
        this.handleShareMethodCancel = this.handleShareMethodCancel.bind(this);
        this.handleShareMethodChange = this.handleShareMethodChange.bind(this);

        this.handleShareContactsNext = this.handleShareContactsNext.bind(this);
        this.handleShareContactsCancel = this.handleShareContactsCancel.bind(this);
        this.handleShareContactsSelected = this.handleShareContactsSelected.bind(this);
        this.handleSelectGroup = this.handleSelectGroup.bind(this);
        this.handleShowAddGroup = this.handleShowAddGroup.bind(this);
        this.handleHideAddGroup = this.handleHideAddGroup.bind(this);
        this.handleAddGroup = this.handleAddGroup.bind(this);
        this.getContacts = this.getContacts.bind(this);

        this.handleShareAuthNext = this.handleShareAuthNext.bind(this);
        this.handleShareAuthCancel = this.handleShareAuthCancel.bind(this);

        this.handleShareImageNext = this.handleShareImageNext.bind(this);
        this.handleShareImageCancel = this.handleShareImageCancel.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.handleSelectColor = this.handleSelectColor.bind(this);

        this.handleSharePreviewNext = this.handleSharePreviewNext.bind(this);
        this.handleSharePreviewCancel = this.handleSharePreviewCancel.bind(this);
        this.handleShareSubjectChanged = this.handleShareSubjectChanged.bind(this);

        this.handleSharePreviewConstantNext = this.handleSharePreviewConstantNext.bind(this);
        this.handleSharePreviewConstantCancel = this.handleSharePreviewConstantCancel.bind(this);

        this.handleShareFacebookNext = this.handleShareFacebookNext.bind(this);
        this.handleShareFacebookCancel = this.handleShareFacebookCancel.bind(this);

        this.handleShareConfirmNext = this.handleShareConfirmNext.bind(this);

        var subject = "Exclusive Listing";
        if (this.props.listing){
            subject = this.props.listing.shortDescription;
        }
        this.state = {
            showShareListingMethod: true,
            showShareListingContacts: false,
            showShareListingAuth: false,
            showShareListingImage: false,
            showShareListingPreview: false,
            showShareListingsPreview: false,
            showShareListingPreviewConstant: false,
            showShareListingFacebook: false,
            showSHareListingConfirm: false,
            contactsSelected: [],
            methodType: shareMethodTypes.EMAILFC,
            user: null,
            subject: subject,
            body: null,
            selectedImage: null,
            selectedImageUrl: null,
            selectedColor: '#38761d',
            selectedColorLight: '#d9ead3',
            selectedGroup: -1,
            groups: [],
            groupContacts: [],
            showAddGroup: false
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

    handleSelectGroup(group){
        this.setState({
            selectedGroup: group
        });
    }

    handleShowAddGroup(){
        this.setState({
            showAddGroup: true
        });
    }
    handleHideAddGroup(){
        this.setState({
            showAddGroup: false
        });
    }
    handleAddGroup(group){
        var that = this;
        contactService.createGroup(group).then(function(result){
            contactService.getGroups().then(function(groups){
                that.setState({
                    selectedGroup: result.id,
                    groups: groups.groups.rows,
                    showAddGroup: false
                });
            }).catch(function(err){
                that.setState({
                    showAddGroup: false
                });
                console.log(err);
            });
        }).catch(function(err){
            that.setState({
                showAddGroup: false
            });
            console.log(err);
        });
    }

    getContacts(query){
        var that = this;
        return new Promise(function(resolve, reject){
            var page = query.page + 1;
            var queryStr = 'perPage='+query.pageSize+'&page='+page;

            contactService.getGroupClients(that.state.selectedGroup, queryStr).then(function(groupClients){
                that.setState({
                    groupContacts: groupClients.clientGroups.rows
                });
                var ret = {
                    data: groupClients.clientGroups.rows,
                    page: groupClients.page-1,
                    totalCount: groupClients.clientGroups.count
                };
                resolve(ret);
            }).catch(function(err){
                reject(err);
            });
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

    handleSelectColor(color){
        var light = shade(color, 0.85);
        this.setState({
            selectedColor: color,
            selectedColorLight: light
        });
    }

    handleShareImageCancel(){
        this.setState({
            showShareListingImage: false
        });
        this.props.onCancel();
    }

    handleSharePreviewNext(body){
        body.subject = this.state.subject;
        body.contacts = [];
        for (var i=0; i<this.state.groupContacts.length; i++){
            var contact = this.state.groupContacts[i];
            body.contacts.push(contact.email); 
        }
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
            contactService.getGroups().then(function(groups){
                var selectedColor = '#38761d';
                var selectedColorLight = '#d9ead3';

                var selectedImageUrl = null;

                if (user.emailColor){
                    selectedColor = user.emailColor;
                    selectedColorLight = shade(selectedColor, 0.85);
                }
                if (user.emailImage) selectedImageUrl = user.emailImage;

                var selectedGroup = -1;
                var allGroups = [];
                if (groups.groups.rows.length > 0){
                    selectedGroup = groups.groups.rows[0].id;
                    allGroups = groups.groups.rows 
                }
                that.setState({
                    user: user,
                    selectedImageUrl: selectedImageUrl,
                    selectedColor: selectedColor,
                    selectedColorLight: selectedColorLight,
                    selectedGroup: selectedGroup,
                    groups: allGroups
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
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
                onSelectGroup={this.handleSelectGroup}
                selectedGroup={this.state.selectedGroup}
                groups={this.state.groups}
                showAddGroup={this.state.showAddGroup}
                onShowAddGroup={this.handleShowAddGroup}
                onHideAddGroup={this.handleHideAddGroup}
                onAddGroup={this.handleAddGroup}
                getContacts={this.getContacts}
                groupContacts={this.state.groupContacts}
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
                selectedImageUrl={this.state.selectedImageUrl}
                onSelectImage={this.handleSelectImage}
                onSelectColor={this.handleSelectColor}
                selectedColor={this.state.selectedColor}
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
                selectedImageUrl={this.state.selectedImageUrl}
                selectedColor={this.state.selectedColor}
                selectedColorLight={this.state.selectedColorLight}
                groupContacts={this.state.groupContacts}
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
                selectedColor={this.state.selectedColor}
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
                groupContacts={this.state.groupContacts}
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
