import React from 'react';
import {
    Row,
    Col,
    Button,
    Modal,
    ToggleButtonGroup,
    ToggleButton
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faExpand,
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import ListingEditHeader from './ListingEditHeader';

function EditModal(props) {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Address Edit 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
          <ListingEditHeader listing={props.listing}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditButton(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
      <span>
      <Button variant="info" onClick={() => setModalShow(true)}>
      <FontAwesomeIcon className="text-danger" icon={faPencilAlt} /> 
      </Button>

      <EditModal
        show={modalShow}
        listing={props.listing}
        onHide={() => setModalShow(false)}
      />
      </span>
  );
}

class ListingDetailHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.state = {
            editMode: this.props.editMode,
            owner: this.props.owner
        };
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }
    handleEditToggle(value){
        console.log("handleEditToggle value: "+value);
        this.setState({editMode: value});
        this.props.onEditToggle(value);
    }
    render() {
        const editMode = this.state.editMode;
        const listing = this.props.listing;
        const owner = this.props.owner;
        const edit = "edit";
        const view = "view";
        var title = "<Address> (<State>)";
        if (listing){
            title = listing.address + " (" + listing.city + ")";
        }

        var closeButton = "Close";
        console.log("owner: "+owner);

        if (!listing) closeButton = "Cancel";
        return(
            <Row className="align-items-center bg-info">
	        <Col md={6}className="text-white">
                    <div>{title} {editMode === "edit" ? <EditButton listing={listing}/> : null}</div>
                </Col>
                <Col md={6} className="text-right">
                    { owner === "true" ?
                    <ToggleButtonGroup type="radio" name="options" defaultValue={view} onChange={this.handleEditToggle}>
                        <ToggleButton variant="info" value={edit}>Edit</ToggleButton>
                        <ToggleButton variant="info" value={view}>View</ToggleButton>
                    </ToggleButtonGroup>
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
