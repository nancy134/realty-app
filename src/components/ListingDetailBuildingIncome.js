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
import ListingEditBuildingIncome from './ListingEditBuildingIncome';

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
                <ListingEditBuildingIncome />
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
        !listing.grossIncome &&
        !listing.netIncome &&
        !listing.capRate &&
        !listing.taxes &&
        !listing.pricePerFoot &&
        !listing.maintenance &&
        !listing.utilities &&
        !listing.hvac &&
        !listing.security &&
        !listing.hoaFees)
        return true;
    else
        return false;

}

class ListingDetailBuildingIncome extends React.Component {
    render(){
        var grossIncome = "---";
        var netIncome = "---";
        var capRate = "---";
        var taxes = "---";
        var pricePerFoot = "---";
        var maintenance = "---";
        var utilities = "---";
        var hvac = "---";
        var security = "---";
        var hoaFees = "---";

        const editMode = this.props.editMode;
        const listing = this.props.listing;
        if (listing && isEmpty(listing)) return null;
        if (listing){
            grossIncome = listing.grossIncome;
            netIncome = listing.netIncome;
            capRate = listing.capRate;
            taxes = listing.taxes;
            pricePerFoot = listing.pricePerFoot;
            maintenance = listing.maintenance;
            utilities = listing.utilities;
            hvac = listing.hvac;
            security = listing.security;
            hoaFees = listing.hoaFees;
        }
        return(
        <React.Fragment>
            <h2 className="border-bottom border-warning">Building Income/Expense {editMode === "edit" ? <EditButton /> : null}</h2>
            <Row>
                <Col>
                    {editMode === "edit" || (editMode === "view" && grossIncome) ?
                     <Row>
                         <Col>Gross Income</Col>
                         <Col className="font-weight-bold">{grossIncome}</Col>
                     </Row>
                     : null}
                    {editMode === "edit" || (editMode === "view" && netIncome) ?
                     <Row>
                         <Col>Net Income</Col>
                         <Col className="font-weight-bold">{netIncome}</Col>
                     </Row>
                     : null}

                    {editMode === "edit" || (editMode === "view" && capRate) ?
                     <Row>
                         <Col>Cap Rate</Col>
                         <Col className="font-weight-bold">{capRate}</Col>
                     </Row>
                     : null}
                    {editMode === "edit" || (editMode === "view" && taxes) ?
                     <Row>
                         <Col>Taxes</Col>
                         <Col className="font-weight-bold">{taxes}</Col>
                     </Row>
                     : null}
                    {editMode === "edit" || (editMode === "view" && pricePerFoot) ?
                     <Row>
                         <Col>Price Per Foot</Col>
                         <Col className="font-weight-bold">{pricePerFoot}</Col>
                     </Row>
                     : null}


                </Col>
                <Col>
                    {editMode === "edit" || (editMode === "view" && maintenance) ?
                     <Row>
                         <Col>Maintenance</Col>
                         <Col className="font-weight-bold">{maintenance}</Col>
                     </Row>
                    : null}
                    {editMode === "edit" || (editMode === "view" && utilities) ?
                     <Row>
                         <Col>Utilities</Col>
                         <Col className="font-weight-bold">{utilities}</Col>
                     </Row>
                     : null}
                    {editMode === "edit" || (editMode === "view" && hvac) ?
                     <Row>
                         <Col>HVAC</Col>
                         <Col className="font-weight-bold">{hvac}</Col>
                     </Row>
                    : null}
                    {editMode === "edit" || (editMode === "view" && security) ?
                     <Row>
                         <Col>Security</Col>
                         <Col className="font-weight-bold">{security}</Col>
                     </Row>
                     : null}
                    {editMode === "edit" || (editMode === "view" && hoaFees) ?
                     <Row>
                         <Col>HOA Fees</Col>
                         <Col className="font-weight-bold">{hoaFees}</Col>
                     </Row>
                     : null}

                </Col>
            </Row>
        </React.Fragment>
        );
    }
}
export default ListingDetailBuildingIncome;
