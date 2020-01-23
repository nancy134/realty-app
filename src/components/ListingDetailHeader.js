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
    faEdit,
    faExpand
} from '@fortawesome/free-solid-svg-icons';
import ListingEdit from './ListingEdit';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      //size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-90w"
      //centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
          <ListingEdit />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function EditButton() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
      <span>
      <Button variant="info" onClick={() => setModalShow(true)}>
      <FontAwesomeIcon icon={faEdit} />  Edit 
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
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
        return(
            <Row className="align-items-center bg-info">
	        <Col md={6}className="text-white"><h4>240-246 Moody St (Waltham, MA)</h4></Col>
                <Col md={6} className="text-right">
                    <Button variant="info"><FontAwesomeIcon icon={faExpand} /> Expand</Button>
                    <EditButton />
                    <Button variant="info" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes}/> Close</Button>
                </Col>
            </Row>
        );
    }
}

export default ListingDetailHeader;
