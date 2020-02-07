import React from 'react';
import {
    Row,
    Col,
    Button,
    Modal,
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
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }

    render() {
        const editMode = this.props.editMode;
        const listing = this.props.listing;
        var title = "<Address> (<City>, <State>)";
        if (listing){
            title = listing.address + " (" + listing.city + ", "+listing.state + ")";
        }

        var closeButton = "Close";
        if (editMode === "new") closeButton = "Cancel";
        return(
            <Row className="align-items-center bg-info">
	        <Col md={6}className="text-white"><h4>{title} {editMode === "edit" ? <EditButton listing={listing}/> : null}</h4></Col>
                <Col md={6} className="text-right">
                    {editMode === "new" ?
                    <Button variant="info">Save Draft</Button>
                    : null}
                    { editMode === "new" ?
                    <Button variant="info">Publish</Button>
                    : null}
                    { editMode !== "new" ? 
                    <Button variant="info"><FontAwesomeIcon icon={faExpand} /> Expand</Button>
                    : null}
                    <Button variant="info" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes}/> {closeButton}</Button>
                </Col>
            </Row>
        );
    }
}

export default ListingDetailHeader;
