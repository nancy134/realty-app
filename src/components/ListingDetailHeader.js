import React from 'react';
import {
    Row,
    Col,
    Button,
    ButtonGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faExpand,
    faPencilAlt,
    faAddressBook
} from '@fortawesome/free-solid-svg-icons';
import ListingEditHeader from './ListingEditHeader';
import TransitionModal from './TransitionModal';
import {getUserEmail} from '../helpers/authentication';

function EditButton(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
      <span>
      <Button 
          id="header_edit_button"
          variant="info" 
          onClick={() => setModalShow(true)}
      >
          <FontAwesomeIcon className="text-danger" icon={faPencilAlt} /> 
      </Button>
      {modalShow ?
      <ListingEditHeader
        show={modalShow}
        listing={props.listing}
        states={props.states}
        onHide={() => setModalShow(false)}
        onSave={listing => props.onSave(listing)}
      />
      : null}
      </span>
  );
}
function TransitionButton(props) {
  return (
      <span>
          { props.type === "button" ?
          <Button 
              id="header_transition_button"
              variant="primary" 
              className="m-1"
              onClick={() => {props.onShow()}}
          >
              {props.buttonText}
          </Button>
          : null}
          { props.type === "link" ? 
              <span
                  className="text-danger addPointer"
                  onClick={() => props.onShow()}
              >{props.buttonText}</span>
          : null}
          <TransitionModal
              show={props.show}
              message={props.message}
              states={props.states}
              transition={props.buttonText}
              onCancel={props.onCancel}
              onPublish={props.onPublish}
              onUnpublish={props.onUnpublish}
              saving={props.saving}
              transitionMessage={props.TransitionMessage}
          />
      </span>
  );
}
function ContactButton(props) {
  return (
      <span>
          <Button
              id="header_transition_button"
              variant="primary"
              className="m-1"
              onClick={() => {props.onContact()}}
          >
             <span><FontAwesomeIcon icon={faAddressBook} /> Contact</span>
          </Button>
      </span>
  );
}

class ListingDetailHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleUnpublish = this.handleUnpublish.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleDeleteDraft = this.handleDeleteDraft.bind(this);
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }
    handleSave(listing){
        this.props.onListingUpdate(listing);
    }
    handleEditToggle(value){
        this.props.onEditToggle(value);
    }
    handlePublish(){
        this.props.onPublish(this.props.listing.ListingId);
    }
    handleUnpublish(){
        this.props.onUnpublish(this.props.listing.ListingId);
    }
    handleExpand(){
        var url = window.location.protocol + "//" + window.location.hostname + "/listing/"+this.props.listing.id;
        window.location.href = url;
    }
    handleGoToListingByIndex(index, publishStatus){
        this.props.onGoToListingByIndex(index, publishStatus);
    }
    handleDeleteDraft(){
        this.props.onDeleteDraft(this.props.listing.id);
    }
    render() {
        const listingMode = this.props.listingMode;
        const editMode = this.props.editMode;
        const listing = this.props.listing;
        const states = this.props.states;
        const enableAddressEdit = false;
        var owner = this.props.owner;
        var address = "<Address>";
        var city = "<City>"; 
        var zip = "<Zip>";
        if (listing){

            if (listing.address){
                address = listing.address;
            }
            if (listing.displayAddress){
                address = listing.displayAddress;
            }
            if (listing.city){
                city = listing.city;
            }
            if (listing.zip){
                zip = listing.zip;
            }
        }
        var title = address + ", " + city + ", "+zip;

        //var closeButton = "Close";
        //if (!listing) closeButton = "Cancel";

        var editStatus = "p-0";
        var viewStatus = "p-0";
        if (editMode === "edit") editStatus = "active p-0";
        if (editMode === "view") viewStatus = "active p-0"

        var transitionButton = "";
        var message = "";
        if (listing) {
            if (listing.publishStatus === "Draft"){
               transitionButton = "Publish";
               message = "Your listing will become available to the public and charges will be applied"; 
            } else if (listing.publishStatus === "Approved" || listing.publishStatus === "Off Market"){
                transitionButton = "Put on Market";
                message = "Your listing will become public and charges will be applied";
            } else if (listing.publishStatus === "On Market"){
                transitionButton = "Take off Market";
                message = "Your listing will be no longer be seen by the public";
            } else if (listing.publishStatus === "Under Review"){
                owner = null;
            }
        }

        var hasLiveVersion = false;
        var hasDraftVersion = false;
        var onlyDraft = false;
        var onlyLive = false; 
        if (listing && listing.listing &&  listing.owner === getUserEmail()){
            if (listing.publishStatus === "Draft" && listing.listing.latestApprovedId){
               hasLiveVersion = true;
            }
            if (listing.publishStatus === "On Market" && listing.listing.latestDraftId){
                hasDraftVersion = true;
            }
            if (listing.publishStatus === "Draft" && !listing.listing.latestApprovedId){
                onlyDraft = true;
            }
            if (listing.publishStatus === "On Market" && !listing.listing.latestDraftId && listingMode === "allListings"){
                onlyLive = true;
            } 
        }
        // View button
        var viewButton = "View";
        if (listing){
           if (listing.publishStatus === "Draft"){
               viewButton = "Preview";
           }
        }
        var fullscreen = this.props.fullscreen;
        return(
            <React.Fragment>
            <Row className="align-items-center bg-info">
	        <Col md={6}className="text-white">
                    <div className=" address-title font-weight-bold">{title} {enableAddressEdit && editMode === "edit" ? 
                        <EditButton 
                            listing={listing} 
                            states={states} 
                            onSave={this.handleSave}
                        /> : null}
                        <ContactButton
                            onContact={this.props.onContact} 
                        />
                    </div>
                </Col>
                <Col md={6} className="text-right">
                    {(owner && listingMode === "myListings") ?
                    <ButtonGroup className="border">
                        <Button
                            id="header_edit_toggle" 
                            type="radio" 
                            value="edit" 
                            onClick={() => this.handleEditToggle("edit")} 
                            className={editStatus}
                            variant="info">
                            Edit
                        </Button>
                        <Button 
                            id="header_view_toggle"
                            type="radio" 
                            value="view" 
                            onClick={() => this.handleEditToggle("view")}
                            className={viewStatus} 
                            variant="info">
                            {viewButton} 
                        </Button>
                    </ButtonGroup>
                    : null }
                    { owner ?
                    <TransitionButton 
                        type="button"
                        message={message} 
                        buttonText={transitionButton} 
                        onPublish={this.handlePublish}
                        onUnpublish={this.handleUnpublish}
                        onShow={this.props.onTransitionStart}
                        onCancel={this.props.onTransitionCancel}
                        show={this.props.transitionStart}
                        saving={this.props.transitionSaving}
                        transitionMessage={this.props.transitionMessage}
                    />
                    : null }
                    { listing && !fullscreen ? 
                    <Button
                        onClick={this.handleExpand} 
                        className="expandButton p-0" 
                        variant="info"
                    >
                        <FontAwesomeIcon icon={faExpand} />
                    </Button>
                    : null}
                    {!fullscreen ?
                    <Button
                        id="header_close_detail"
                        className="closeButton p-0" 
                        variant="info" 
                        onClick={this.handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
                    </Button>
                    : null }
                </Col>
            </Row>
            {hasLiveVersion ?
            <Row className="bg-light">
                <Col>
                These are unpublished updates to a Live version of the listing. <span 
                    onClick={() => this.handleGoToListingByIndex(listing.listing.latestApprovedId,"On Market")}
                    className="text-danger addPointer">Click here</span> to view the live version. 
                </Col>
            </Row>
            : null}
            {hasDraftVersion ?
            <Row className="bg-light">
                <Col>
                You have unpublished updates for this listing.  <span 
                    onClick={() => this.handleGoToListingByIndex(listing.listing.latestDraftId,"Draft")}
                    className="text-danger addPointer">Click here</span> to view the updates
                </Col>
            </Row>
            : null}
            {onlyDraft ?
            <Row className="bg-light">
                <Col>
                This is a Draft Listing and not available to the public.  Select&nbsp; 
                <TransitionButton
                    type="link"
                    message={message}
                    buttonText={transitionButton}
                    onPublish={this.handlePublish}
                    onUnpublish={this.handleUnpublish}
                    onShow={this.props.onTransitionStart}
                    onCancel={this.props.onTransitionCancel}
                    show={this.props.transitionStart}
                    saving={this.props.transitionSaving}
                    transitionMessage={this.props.transitionMessage}
                /> to make it public. Select&nbsp; 
                <span 
                    onClick={this.handleDeleteDraft}
                    className="text-danger addPointer"
                 >Delete</span> to delete this draft.
                </Col>
            </Row>
            : null}
            {onlyLive ?
            <Row className="bg-light">
                <Col>
                This listing is Live.  Select <span
                    onClick={() => this.props.onGoToMyListing(listing.id)} 
                    className="text-danger addPointer">My Listings </span> if you would lie to update this listing.
                </Col>
            </Row>
            : null}

            </React.Fragment>
        );
    }
}

export default ListingDetailHeader;
