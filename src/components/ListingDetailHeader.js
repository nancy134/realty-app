import React from 'react';
import {
    Row,
    Col,
    Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faExpand,
    faPencilAlt,
    faAddressBook,
    faFilePdf
} from '@fortawesome/free-solid-svg-icons';
import ListingEditHeader from './ListingEditHeader';

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
function ContactButton(props) {
  return (
      <span>
          <Button
              id="header_contact_button"
              variant="info"
              className="p-0 ml-3"
              onClick={() => {props.onContact()}}
          >
             <span><FontAwesomeIcon icon={faAddressBook} /> Contact</span>
          </Button>
      </span>
  );
}

function ReportButton(props){
    return(
        <span>
            <Button
                id="header_report_button"
                variant="info"
                className="p-0 ml-1"
                onClick={() => {props.onReport()}}
            >
                <span><FontAwesomeIcon icon={faFilePdf} /> Report</span>
            </Button>
        </span>
    );
}

class ListingDetailHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleReport = this.handleReport.bind(this);
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }
    handleSave(listing){
        this.props.onListingUpdate(listing);
    }
    handleExpand(){
        var url = window.location.protocol + "//" + window.location.hostname + "/listing/"+this.props.listing.id;
        window.location.href = url;
    }
    handleReport(){
        var id = this.props.listing.id;
        var url =
            window.location.protocol +
            "//" +
            window.location.hostname +
            "/report/" +
            id;
        window.open(url, "_blank");
    }
    render() {
        const editMode = this.props.editMode;
        const listing = this.props.listing;
        const states = this.props.states;
        const enableAddressEdit = false;
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

        var fullscreen = this.props.fullscreen;
        return(
            <div className="pb-1">
            <Row className="align-items-center bg-info m-0">
	        <Col md={8}className="text-white">
                    <div className=" address-title font-weight-bold">{title} {enableAddressEdit && editMode === "edit" ? 
                        <EditButton 
                            listing={listing} 
                            states={states} 
                            onSave={this.handleSave}
                        /> : null}
                        <ContactButton
                            onContact={this.props.onContact}
                        />
                        <ReportButton
                            onReport={this.handleReport}
                        />
                    </div>
                </Col>
                <Col md={4} className="text-right">
                    { listing && !fullscreen ? 
                    <Button
                        onClick={this.handleExpand} 
                        className="expandButton p-0" 
                        variant="info"
                    >
                        <FontAwesomeIcon icon={faExpand} /> Expand
                    </Button>
                    : null}
                    {!fullscreen ?
                    <Button
                        id="header_close_detail"
                        className="closeButton p-0 ml-3" 
                        variant="info" 
                        onClick={this.handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes}/> Close
                    </Button>
                    : null }
                </Col>
            </Row>
            </div>
        );
    }
}

export default ListingDetailHeader;
