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

function EditButton(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
      <span>
      <Button variant="info" onClick={() => setModalShow(true)}>
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

class ListingDetailHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
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
    render() {
        const editMode = this.props.editMode;
        const listing = this.props.listing;
        const states = this.props.states;
        const owner = this.props.owner;
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

        var closeButton = "Close";
        if (!listing) closeButton = "Cancel";

        var editStatus = "";
        var viewStatus = "";
        if (editMode === "edit") editStatus = "active";
        if (editMode === "view") viewStatus = "active"

        return(
            <Row className="align-items-center bg-info">
	        <Col md={6}className="text-white">
                    <div>{title} {editMode === "edit" ? <EditButton listing={listing} states={states} onSave={this.handleSave}/> : null}</div>
                </Col>
                <Col md={6} className="text-right">
                    { owner ?
                    <ButtonGroup>
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
                    { !listing ?
                    <Button variant="info">Save</Button>
                    : null}
                    { listing ? 
                    <Button variant="info"><FontAwesomeIcon icon={faExpand} /> Expand</Button>
                    : null}
                    <Button variant="info" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes}/> {closeButton}</Button>
                </Col>
            </Row>
        );
    }
}

export default ListingDetailHeader;
