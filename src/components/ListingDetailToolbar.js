import React from 'react';
import {
    Row,
    Col,
    Tabs,
    Tab,
    Button
} from 'react-bootstrap';
import authenticationService from '../helpers/authentication';
import { publishTypes } from '../constants/publishTypes';
import { getPublishType } from '../helpers/utilities';
import { transitionTypes } from '../constants/transitionTypes';

function TransitionButton(props) {
  return (
      <span>
          { props.type === "button" ?
          <Button
              id="header_transition_button"
              className="m-1"
              onClick={() => {props.onShow(props.transitionType)}}
          >
              {props.buttonText}
          </Button>
          : null}
          { props.type === "link" ?
              <span
                  className="text-info addPointer"
                  onClick={() => props.onShow(props.transitionType)}
              >{props.buttonText}</span>
          : null}
          
      </span>
  );
}

function InformationalText(props){
    var listing = props.listing;
    var publishType = getPublishType(listing);

    if (publishType === publishTypes.DRAFT_WITH_LIVE){
        return(
        <Row className="pr-2 small bg-white">
            <Col className="text-center">
                <p className="m-0">These are unpublished updates to a Live version of the listing.</p>
                <p className="m-0"><span
                    onClick={() => props.onGoToListingByIndex(listing.listing.latestApprovedId,"On Market")}
                    className="text-danger addPointer">Click here</span> to view the live version.</p>
            </Col>
        </Row>
        );
    } else if (publishType === publishTypes.LIVE_WITH_DRAFT){
        return(
        <Row className="pr-2 small bg-white">
            <Col className="text-center">
                <p className="m-0">This listing has unpublished updates.</p>
                <p className="m-0"><span
                    onClick={() => props.onGoToListingByIndex(listing.listing.latestDraftId,"Draft")}
                    className="text-danger addPointer">Click here</span> to view the updates</p>
            </Col>
        </Row>
        );
    } else if (publishType === publishTypes.ONLY_DRAFT){
        return(
        <Row className="pr-2 small bg-white">
            <Col className="text-center">
                <p className="m-0">This is a Draft Listing and not available to the public.</p>
                <p className="m-0">Select&nbsp;
                    <span
                        onClick={props.onDeleteDraft}
                        className="text-danger addPointer"
                    >Delete</span> to delete this draft.</p>
            </Col>
        </Row>
        );
    } else if (publishType === publishTypes.ONLY_LIVE){
        return(
        <Row className="pr-2 small bg-white">
            <Col className="text-center">
                <p className="m-0">This listing is Live.</p>
                <p className="m-0">Select Edit if you would like to update this listing.</p>
            </Col>
        </Row>
        );
    }
}
class ListingDetailToolbar extends React.Component {
    constructor(props){
        super(props);
        this.handleEditModeChange = this.handleEditModeChange.bind(this);
        this.handleDeleteDraft = this.handleDeleteDraft.bind(this);
        this.handleGoToListingByIndex = this.handleGoToListingByIndex.bind(this);
    }

    handleEditModeChange(editMode){
        this.props.onEditModeChange(editMode);
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
        var transitionType = "";
        var publishType = getPublishType(listing);

        if (listing) {
            if (listing.publishStatus === "Draft"){
               transitionButton = "Publish";
               transitionType = transitionTypes.PUBLISH;
               if (publishType === publishTypes.DRAFT_WITH_LIVE){
                   transitionType = transitionTypes.PUBLISH_UPDATES;
                   transitionButton = "Publish Updates";
               }
            } else if (listing.publishStatus === "Approved" || listing.publishStatus === "Off Market"){
                transitionType = transitionTypes.PUT_ON_MARKET;
                transitionButton = "Put on Market";
            } else if (listing.publishStatus === "On Market"){
                transitionType = transitionTypes.TAKE_OFF_MARKET;
                transitionButton = "Take off Market";
            }
        }
        var isOwner = authenticationService.isOwner(listing.owner.cognitoId);

       if (listingMode === "myListings" ){
       return(
           <div className="mb-2 shadow border">
               <Row className="pt-2 ml-0 mr-0 bg-white">
                   <Col xs={3}>
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
                   <Col xs={6}>
                       <InformationalText
                           listing={listing}
                            onGoToListingByIndex={this.handleGoToListingByIndex}
                            onDeleteDraft={this.handleDeleteDraft}
                       />
                   </Col>
                   <Col
                       className="text-right"
                       xs={3}
                   >
                      <TransitionButton
                          type="button"
                          buttonText={transitionButton}
                          transitionType={transitionType}
                          onShow={this.props.onTransitionStart}
                      />

                   </Col>
               </Row>
           </div>
        );
        } else if (listingMode === "allListings" && isOwner && listing.publishStatus === "On Market" && listing.listing.latestDraftId) {
           return(
           <div className="mb-2 shadow border">
               <Row className="pt-2 ml-0 mr-0 bg-white">
                   <Col xs={12}>
                       <InformationalText
                           listing={listing}
                            onGoToListingByIndex={this.handleGoToListingByIndex}
                            onDeleteDraft={this.handleDeleteDraft}
                       />
                   </Col>
               </Row>
           </div>
           );
        } else {
            return null;
        }
    }
}

export default ListingDetailToolbar;
