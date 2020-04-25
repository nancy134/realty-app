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
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import ListingEditHeader from './ListingEditHeader';
import TransitionModal from './TransitionModal';

function EditButton(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
      <span>
      <Button 
          id="header_edit_button"
          variant="info" 
          onClick={() => setModalShow(true)}i
      >
          <FontAwesomeIcon className="text-danger" icon={faPencilAlt} /> 
      </Button>

      <ListingEditHeader
        show={modalShow}
        listing={props.listing}
        states={props.states}
        onHide={() => setModalShow(false)}
        onSave={listing => props.onSave(listing)}
      />
      </span>
  );
}
function TransitionButton(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
      <span>
      <Button variant="info" onClick={() => setModalShow(true)}>
      {props.buttonText}
      </Button>

      <TransitionModal
        show={modalShow}
        message={props.message}
        states={props.states}
        transition={props.buttonText}
        onHide={() => setModalShow(false)}
        onPublish={props.onPublish}
        onUnpublish={props.onUnpublish}
      />
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
    render() {
        const listingMode = this.props.listingMode;
        const editMode = this.props.editMode;
        const listing = this.props.listing;
        const states = this.props.states;
        var owner = this.props.owner;
        var address = "<Address>";
        var city = "<City>"; 
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
        }
        var title = address + " (" + city + ")";

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

        return(
            <Row className="align-items-center bg-info">
	        <Col md={4}className="text-white">
                    <div>{title} {editMode === "edit" ? 
                        <EditButton 
                            listing={listing} 
                            states={states} 
                            onSave={this.handleSave}
                        /> : null}
                    </div>
                </Col>
                <Col md={8} className="text-right">
                    {(owner && listingMode === "myListings") ?
                    <ButtonGroup className="border">
                        <Button 
                            type="radio" 
                            value="edit" 
                            onClick={() => this.handleEditToggle("edit")} 
                            className={editStatus}
                            variant="info">
                            Edit
                        </Button>
                        <Button 
                            type="radio" 
                            value="view" 
                            onClick={() => this.handleEditToggle("view")}
                            className={viewStatus} 
                            variant="info">
                            View
                        </Button>
                    </ButtonGroup>
                    : null }
                    { owner ?
                    <TransitionButton 
                        message={message} 
                        buttonText={transitionButton} 
                        onPublish={this.handlePublish}
                        onUnpublish={this.handleUnpublish}
                    />
                    : null }
                    { listing ? 
                    <Button className="expandButton p-0" variant="info"><FontAwesomeIcon icon={faExpand} /></Button>
                    : null}
                    <Button className="closeButton p-0" variant="info" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes}/></Button>
                </Col>
            </Row>
        );
    }
}

export default ListingDetailHeader;
