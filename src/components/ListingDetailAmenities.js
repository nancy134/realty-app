import React from 'react';
import {
    Row,
    Col,
    Modal,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';

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
                   Edit Amenities 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
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
            <span 
                onClick={() => setModalShow(true)} 
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPencilAlt} />
            </span>
            <ListingEditModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </span>
  );
}

class ListingDetailAmenities extends React.Component {
    render() {
        const viewType = this.props.viewType
        return (
            <div>
                <h2 className="border-bottom border-warning">Amenities {viewType === "owner" ? <EditButton /> : null}</h2>
                <Row><Col>Fitness Center</Col></Row>
                <Row><Col>Air Conditioning</Col></Row>
            </div>
        );
    }
}

export default ListingDetailAmenities;
