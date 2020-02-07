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

        var totalBuildingSize = "---";
        var lotSize = "---"
        var totalAvailableSpace = "---";
        var zone = "---";
        var parking = "---";
        var nets = "---"

        const editMode = this.props.editMode;
        const listing = this.props.listing;

        if (listing){
            totalBuildingSize = listing.totalBuildingSize;

            if (listing.lotSize){
                lotSize = listing.lotSize+" Acre";
            }
            if (listing.totalAvailableSpace){
                totalAvailableSpace = "5,200 sf";
            }
            zone = listing.zone;

            if (listing.parking){
                parking = listing.parking+" spaces";
            }

            if (listing.nets){
                nets = "$"+listing.nets+" / sq ft";
            }
        } 
        return (
            <div>
                <h2 className="border-bottom border-warning">General {editMode === "edit" ? <EditButton /> : null}</h2>
                {totalBuildingSize &&
                <Row>
                    <Col>Total Building Size</Col>
                    <Col className="font-weight-bold">{totalBuildingSize}</Col>
                </Row>
                }
                {lotSize &&
                <Row>
                    <Col>Lot Size</Col>
                    <Col className="font-weight-bold">{lotSize}</Col>
                </Row>
                }
                {totalAvailableSpace &&
                <Row>
                    <Col>Total Available Space</Col>
                    <Col className="font-weight-bold">{totalAvailableSpace}</Col>
                </Row>
                }
                {zone &&
                <Row>
                    <Col>Zone</Col>
                    <Col className="font-weight-bold">{zone}</Col>
                </Row>
                }
                {parking &&
                <Row>
                    <Col>Parking</Col>
                    <Col className="font-weight-bold">{parking}</Col>
                </Row>
                }
                {nets &&
                <Row>
                    <Col>Nets</Col>
                    <Col className="font-weight-bold">{nets}</Col>
                </Row>
                }
             </div>
        );
    }
}

export default ListingDetailGeneral;
