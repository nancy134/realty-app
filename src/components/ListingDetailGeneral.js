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
import ListingEditGeneral from './ListingEditGeneral';

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
                <ListingEditGeneral />
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

function isEmpty(listing){
    if (
        !listing.propertyType &&
        !listing.totalBuildingSize &&
        !listing.lotSize &&
        !listing.taxes &&
        !listing.parking &&
        !listing.floors &&
        !listing.totalNumberOfUnits &&
        !listing.buildingClass &&
        !listing.ceilingHeight &&
        !listing.driveInDoors &&
        !listing.loadingDocks &&
        !listing.yearBuilt &&
        !listing.zone &&
        !listing.totalAvailableSpace &&
        !listing.nets)
        return true;
    else
        return false;
}

class ListingDetailGeneral extends React.Component {
    render() {
        var propertyType = "---";
        var totalBuildingSize = "---";
        var lotSize = "---"; 
        var taxes = "---";
        var parking = "---";
        var floors = "---";
        var totalNumberOfUnits = "---";
        var buildingClass = "---";
        var ceilingHeight = "---";
        var driveInDoors = "---";
        var loadingDocks = "---";
        var yearBuilt = "---";
        var zone = "---";
        var totalAvailableSpace = "---";
        var nets = "---"; 

        const editMode = this.props.editMode;
        const listing = this.props.listing;

        if (listing){
            propertyType = listing.propertType;
            totalBuildingSize = listing.totalBuildingSize;

            lotSize = listing.lotSize;
            if (listing.lotSize){
                lotSize = listing.lotSize+" Acre";
            }
            taxes = listing.taxes; 
            if (listing.taxes){
                taxes = "$"+listing.taxes;
            }
            parking = listing.parking; 
            if (listing.parking){
                parking = listing.parking+" spaces";
            }
            floors = listing.floors;
            totalNumberOfUnits = listing.totalNumberOfUnits;
            buildingClass = listing.buildingClass;
            ceilingHeight = listing.ceilingHeight;
            driveInDoors = listing.driveInDoors;
            loadingDocks = listing.loadingDocks;
            yearBuilt = listing.yearBuilt;
            zone = listing.zone;
            totalAvailableSpace = listing.totalAvailableSpace;
            if (listing.totalAvailableSpace){
                totalAvailableSpace = listing.totalAvailableSpace+" sf";
            }
            nets = listing.nets;
            if (listing.nets){
                nets = "$"+listing.nets+" / sq ft";
            }
        } 
        return (
            <React.Fragment>
                <h2 className="border-bottom border-warning">Building Detail {editMode === "edit" ? <EditButton /> : null}</h2>
                <Row>
                    <Col>
                        {editMode === "edit" || (editMode === "view" && propertyType) ?
                        <Row>
                        <Col>Property Type</Col>
                        <Col className="font-weight-bold">{propertyType}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && totalBuildingSize) ?
                        <Row>
                        <Col>Total Building Size</Col>
                        <Col className="font-weight-bold">{totalBuildingSize}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && lotSize) ?
                        <Row>
                        <Col>Lot Size</Col>
                        <Col className="font-weight-bold">{lotSize}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && taxes) ?
                        <Row>
                        <Col>Taxes</Col>
                        <Col className="font-weight-bold">{taxes}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && parking) ?
                        <Row>
                        <Col>Parking</Col>
                        <Col className="font-weight-bold">{parking}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && floors) ?
                        <Row>
                        <Col>Floors</Col>
                        <Col className="font-weight-bold">{floors}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && totalNumberOfUnits) ?
                        <Row>
                        <Col>Total Number of Units</Col>
                        <Col className="font-weight-bold">{totalNumberOfUnits}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && buildingClass) ?
                        <Row>
                        <Col>Building Class</Col>
                        <Col className="font-weight-bold">{buildingClass}</Col>
                        </Row>
                        : null}
                    </Col>
                    <Col>
                        {editMode === "edit" || (editMode === "view" && ceilingHeight) ?
                        <Row>
                        <Col>Ceiling Height</Col>
                        <Col className="font-weight-bold">{ceilingHeight}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && driveInDoors) ?
                        <Row>
                        <Col>Drive In Doors</Col>
                        <Col className="font-weight-bold">{driveInDoors}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && loadingDocks) ?
                        <Row>
                        <Col>Loading Docks</Col>
                        <Col className="font-weight-bold">{loadingDocks}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && yearBuilt) ?
                        <Row>
                        <Col>Year Built</Col>
                        <Col className="font-weight-bold">{yearBuilt}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && zone) ?
                        <Row>
                        <Col>Zone</Col>
                        <Col className="font-weight-bold">{zone}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && totalAvailableSpace) ?
                        <Row>
                        <Col>Total Available Space</Col>
                        <Col className="font-weight-bold">{totalAvailableSpace}</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && nets) ?
                        <Row>
                        <Col>Nets</Col>
                        <Col className="font-weight-bold">{nets}</Col>
                        </Row>
                        : null}

                    </Col>
                </Row>
             </React.Fragment>

        );
    }
}

export default ListingDetailGeneral;
