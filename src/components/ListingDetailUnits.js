import React from 'react';

import {
    Row,
    Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus,
    faPencilAlt,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import ListingEditUnit from './ListingEditUnit';

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
            <ListingEditUnit
                listing={props.listing}
                unit={props.unit}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSave={listing => props.onSave(listing)}
            />
        </span>
  );
}

function EditButton(props){
    const [modalEditShow, setModalEditShow] = React.useState(false);
    return(
        <span>
            <span
                onClick={() => setModalEditShow(true)}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            <ListingEditUnit
                listing={props.listing}
                unit={props.unit}
                show={modalEditShow}
                onHide={() => setModalEditShow(false)}
                onSave={listing => props.onSave(listing)}
            />
        </span>
    );
}
class ListingDetailUnits extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(unit){
        console.log("ListingDetailUnits:handleSave");
        this.props.onUnitUpdate(unit);
    }
    render(){
        var listing = this.props.listing;
        var editMode = this.props.editMode;
        var newUnit = [];
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Unit Detail {editMode === "edit" ? <AddButton listing={listing}  unit={newUnit} onSave={this.handleSave}/> : null}</h2>
                </Col>
            </Row>
            <Row className="bg-light shadow">
                <Col md={3} className="font-weight-bold">Description</Col>
                <Col md={2} className="font-weight-bold">No. of Units</Col>
                <Col md={2} className="font-weight-bold">Square feet</Col>
                <Col md={2} className="font-weight-bold">Income</Col>
                <Col md={3}></Col>
            </Row>
            {!listing ? <div></div> :
            listing.units.map(unit =>
            (
            <Row key={unit.id}>
                <Col md={3}>{unit.description}</Col>
                <Col md={2}>{unit.numUnits}</Col>
                <Col md={2}>{unit.space}</Col>
                <Col md={2}>{unit.income}</Col>
                <Col md={3}>
                           <Row>
                               { editMode === "edit" ?
                               <Col><EditButton listing={listing} unit={unit} onSave={this.handleSave}/></Col>
                               : null }
                               { editMode === "edit" ?
                               <Col><FontAwesomeIcon className="text-danger" size="xs" icon={faTrash} /></Col>
                                : null }
                           </Row>
                </Col>
            </Row>
            ))}
        </React.Fragment>
        );
    }
}
export default ListingDetailUnits;
