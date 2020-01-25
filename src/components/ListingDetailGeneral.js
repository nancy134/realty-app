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
                   Edit General 
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
class ListingDetailGeneral extends React.Component {
    render() {
        const viewType = this.props.viewType;
        var totalBuildingSize = "45,000 sf";
        var lotSize = "1.27 Acre";
        var totalAvailableSpace = "5,200 sf";
        var zone = "CB";
        var parking = "3 / 1000";
        var nets = "$8.25 / sq ft";
        if (this.props.content === "new"){
            totalBuildingSize = "---";
            lotSize = "---"
            totalAvailableSpace = "---";
            zone = "---";
            parking = "---";
            nets = "---"
        } 
        return (
            <div>
                <h2 className="border-bottom border-warning">General {viewType === "owner" ? <EditButton /> : null}</h2>
                <Row>
                    <Col>Total Building Size</Col>
                    <Col className="font-weight-bold">{totalBuildingSize}</Col>
                </Row>
                <Row>
                    <Col>Lot Size</Col>
                    <Col className="font-weight-bold">{lotSize}</Col>
                </Row>
                <Row>
                    <Col>Total Available Space</Col>
                    <Col className="font-weight-bold">{totalAvailableSpace}</Col>
                </Row>
                <Row>
                    <Col>Zone</Col>
                    <Col className="font-weight-bold">{zone}</Col>
                </Row>
                <Row>
                    <Col>Parking</Col>
                    <Col className="font-weight-bold">{parking}</Col>
                </Row>
                <Row>
                    <Col>Nets</Col>
                    <Col className="font-weight-bold">{nets}</Col>
                </Row>
             </div>
        );
    }
}

export default ListingDetailGeneral;
