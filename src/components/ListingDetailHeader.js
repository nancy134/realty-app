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

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      //size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      //centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Address Edit 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
          <ListingEditHeader content={props.content}/>
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

      <MyVerticallyCenteredModal
        show={modalShow}
        content={props.content}
        onHide={() => setModalShow(false)}
      />
      </span>
  );
}

class ListingDetailHeader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            viewType: this.props.viewType
        }
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }

    render() {
        const viewType = this.state.viewType;
        const content = this.props.content;
        var address = "240-246 Moody St (Waltham, MA)";
        if (this.props.content === "new") {
            address = "<Address> (<City>, <State>)";
        }

        var closeButton = "Close";
        if (content === "new") closeButton = "Cancel";
        return(
            <Row className="align-items-center bg-info">
	        <Col md={6}className="text-white"><h4>{address} {viewType === "owner" ? <EditButton content={content}/> : null}</h4></Col>
                <Col md={6} className="text-right">
                    {content === "new" ?
                    <Button variant="info">Save Draft</Button>
                    : null}
                    { content === "new" ?
                    <Button variant="info">Publish</Button>
                    : null}
                    { content !== "new" ? 
                    <Button variant="info"><FontAwesomeIcon icon={faExpand} /> Expand</Button>
                    : null}
                    <Button variant="info" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes}/> {closeButton}</Button>
                </Col>
            </Row>
        );
    }
}

export default ListingDetailHeader;
