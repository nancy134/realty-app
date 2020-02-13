import React from 'react';

import {
    Row,
    Col,
    Modal,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import ListingEditUnit from './ListingEditUnit';

function ListingEditModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Available Space Edit 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                <ListingEditUnit />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

function AddButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <span>
            <span
                onClick={() => setModalShow(true)}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />
            </span>
            <ListingEditModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                listing={props.listing} 
            />
        </span>
  );
}
class ListingDetailUnits extends React.Component {
    render(){
        var listing = this.props.listing;
        var editMode = this.props.editMode;
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Unit Detail {editMode === "edit" ? <AddButton listing={listing} /> : null}</h2>
                </Col>
            </Row>
            <Row className="bg-light shadow">
                <Col md={4} className="font-weight-bold">Description</Col>
                <Col md={2} className="font-weight-bold">No. of Units</Col>
                <Col md={2} className="font-weight-bold">Square feet</Col>
                <Col md={2} className="font-weight-bold">Income</Col>
            </Row>
        </React.Fragment>
        );
    }
}
export default ListingDetailUnits;
