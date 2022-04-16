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
    faCompress,
    faAddressBook,
    faFilePdf,
    faShare
} from '@fortawesome/free-solid-svg-icons';
import WizardShareListing from '../components/WizardShareListing';

function ShareButton(props){
    return(
    <span>
        <Button
            id="header_share_button"
            variant="info"
            onClick={props.onShare}
        >
            <span style={{fontSize: "0.8rem"}}><FontAwesomeIcon icon={faShare} /> Share Listing</span>
        </Button>
    </span>
    );
}
function ContactButton(props) {
  return (
      <span>
          <Button
              id="header_contact_button"
              variant="info"
              className=""
              onClick={() => {props.onContact()}}
          >
             <span style={{fontSize: "0.8rem"}}><FontAwesomeIcon icon={faAddressBook} /> Contact Broker</span>
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
                className="ml-1"
                onClick={() => {props.onReport()}}
            >
                <span style={{fontSize: "0.8rem"}}><FontAwesomeIcon icon={faFilePdf} /> View Brochure</span>
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
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleReport = this.handleReport.bind(this);
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }
    handleSave(listing){
        this.props.onListingUpdate(listing);
    }
    handleExpand(){
        this.props.onExpand(true);
        /*
        var url = window.location.protocol + "//" + window.location.hostname + "/listing/"+this.props.listing.id;
        window.location.href = url;
        */
    }
    handleCollapse(){
        this.props.onExpand(false);
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
        var showShareListing = false;
        if (this.props.isAdmin) showShareListing = true;
        const listing = this.props.listing;

        // Fullscreen
        var fullscreen = this.props.fullscreen;
        var expandButtonText = "Expand";
        var expandButtonIcon = faExpand;
        var expandButtonFunction = this.handleExpand;
        if (fullscreen){
            expandButtonText = "Collapse";
            expandButtonIcon = faCompress;
            expandButtonFunction = this.handleCollapse;
        }
        return(
            <div className="pb-1">
            { this.props.showShareListingWizard ?
            <WizardShareListing
                listing={listing}
                start={this.props.showShareListingWizard}
                onCancel={this.props.onCancelShareWizard}
                onFinish={this.props.onFinishShareWizard}
            />
            : null }
            <Row className="align-items-center bg-info m-0">
	        <Col md={6}className="text-white">
                        <ContactButton
                            onContact={this.props.onContact}
                        />
                        { showShareListing ?
                        <ShareButton
                            onShare={this.props.onShare}
                        />
                        : null }
                        <ReportButton
                            onReport={this.handleReport}
                        />
                </Col>
                <Col md={6} className="text-right">
                    { listing ? 
                    <Button
                        onClick={expandButtonFunction} 
                        className="expandButton" 
                        variant="info"
                    >
                        <FontAwesomeIcon icon={expandButtonIcon} /> {expandButtonText} 
                    </Button>
                    : null}
                    <Button
                        id="header_close_detail"
                        className="closeButton ml-3" 
                        variant="info" 
                        onClick={this.handleClose}
                    >
                        <FontAwesomeIcon icon={faTimes}/> Close
                    </Button>
                </Col>
            </Row>
            </div>
        );
    }
}

export default ListingDetailHeader;
