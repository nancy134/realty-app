import React from 'react';
import {
    Row,
    Col,
    Tabs,
    Tab,
    Button
} from 'react-bootstrap';
import TransitionModal from './TransitionModal';

function TransitionButton(props) {
  return (
      <span>
          { props.type === "button" ?
          <Button
              id="header_transition_button"
              className="m-1"
              variant="warning"
              onClick={() => {props.onShow()}}
          >
              {props.buttonText}
          </Button>
          : null}
          { props.type === "link" ?
              <span
                  className="text-info addPointer"
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

class ListingDetailToolbar extends React.Component {
    constructor(props){
        super(props);
        this.handleEditModeChange = this.handleEditModeChange.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleUnpublish = this.handleUnpublish.bind(this);
        this.handleDeleteDraft = this.handleDeleteDraft.bind(this);
    }

    handleEditModeChange(editMode){
        this.props.onEditModeChange(editMode);
    }
    handlePublish(){
        this.props.onPublish(this.props.listing.ListingId);
    }
    handleUnpublish(){
        this.props.onUnpublish(this.props.listing.ListingId);
    }
    handleGoToListingByIndex(index, publishStatus){
        this.props.onGoToListingByIndex(index, publishStatus);
    }
    handleDeleteDraft(){
        this.props.onDeleteDraft(this.props.listing.id);
    }

    render(){
        var editMode = this.props.editMode;
        var listingMode = this.props.listingMode;
        var listing = this.props.listing;

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
            }
        }

        var hasLiveVersion = false;
        var hasDraftVersion = false;
        var onlyDraft = false;
        var onlyLive = false;

        if (listing.publishStatus === "Draft" && listing.listing.latestApprovedId){
            hasLiveVersion = true;
        }
        if (listing.publishStatus === "On Market" && listing.listing.latestDraftId){
            hasDraftVersion = true;
        }
        if (listing.publishStatus === "Draft" && !listing.listing.latestApprovedId){
            onlyDraft = true;
        }
        if (listing.publishStatus === "On Market" && !listing.listing.latestDraftId){
            onlyLive = true;
        }

       if (listingMode === "myListings" ){
       return(
           <div className="mb-2 shadow border">
               <Row className="pt-2 ml-0 mr-0 bg-white">
                   <Col>
                       <Tabs
                           className="listing-tabs pb-1"
                           variant="pills"
                           activeKey={editMode}
                           onSelect={editMode => this.handleEditModeChange(editMode)}
                       >
                           <Tab eventKey="edit" title="Edit"></Tab>
                           <Tab eventKey="view" title="Preview"></Tab>
                       </Tabs>
                   </Col>
                   <Col
                       className="text-right"
                   >
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

                   </Col>
               </Row>


            {hasLiveVersion ?
            <Row className="pr-2 small bg-white">
                <Col className="text-right">
                These are unpublished updates to a Live version of the listing. <span
                    onClick={() => this.handleGoToListingByIndex(listing.listing.latestApprovedId,"On Market")}
                    className="text-danger addPointer">Click here</span> to view the live version.
                </Col>
            </Row>
            : null}
            {hasDraftVersion ?
            <Row className="pr-2 small bg-white">
                <Col className="text-right">
                You have unpublished updates for this listing.  <span
                    onClick={() => this.handleGoToListingByIndex(listing.listing.latestDraftId,"Draft")}
                    className="text-danger addPointer">Click here</span> to view the updates
                </Col>
            </Row>
            : null}
            {onlyDraft ?
            <Row className="pr-2 small bg-white">
                <Col className="text-right">
                This is a Draft Listing and not available to the public.  Select&nbsp;
                <span
                    onClick={this.handleDeleteDraft}
                    className="text-danger addPointer"
                 >Delete</span> to delete this draft.
                </Col>
            </Row>
            : null}
            {onlyLive ?
            <Row className="pr-2 small bg-white">
                <Col className="text-right">
                This listing is Live.  Select Edit if you would like to update this listing.
                </Col>
            </Row>
            : null}

           </div>
        );
        } else {
            return null;
        } 
    }
}

export default ListingDetailToolbar;
