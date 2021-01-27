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
    return (
        <span>
            <span
                id="unit_add_button"
                onClick={() => {props.onShow()}}
                className="edit-button text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />&nbsp;Add Unit
            </span>
            {props.show ?
            <ListingEditUnit
                title="Add New Unit"
                listing={props.listing}
                index={props.index}
                unit={props.unit}
                show={props.show}
                onHide={props.onHide}
                onSave={listing => props.onSave(listing)}
                errorMessage={props.errorMessage}
                saving={props.saving}
            />
            : null}
        </span>
  );
}

function EditButton(props){
    var unit = props.unit;
    if (props.listing){
        unit = props.listing.units[props.unitUpdateIndex];
    }
    return(
        <span>
            <span
                id="unit_edit_button"
                onClick={() => {props.onShow(props.index)}}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            { props.show ?
            <ListingEditUnit
                title="Edit Unit"
                listing={props.listing}
                unit={unit}
                show={props.show}
                onHide={props.onHide}
                onSave={listing => props.onSave(listing)}
                errorMessage={props.errorMessage}
                saving={props.saving}
            />
            : null }
        </span>
    );
}
class ListingDetailUnits extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(unit){
        this.props.onUnitUpdate(unit);
    }
    render(){
        var listing = this.props.listing;
        var editMode = this.props.editMode;
        var newUnit = [];
        return(
        <div className="mb-2 shadow border">
            <Row className="mt-2 ml-0 mr-0 border-bottom border-warning">
                <Col>
                    <h3>Units&nbsp;
                    {editMode === "edit" ?
                    <AddButton 
                        listing={listing}
                        unit={newUnit}
                        onSave={this.handleSave}
                        onShow={this.props.onUnitModalNew}
                        onHide={this.props.onUnitModalHide}
                        errorMessage={this.props.unitError}
                        show={this.props.unitNew}
                        saving={this.props.unitSaving}
                    /> 
                    : null}</h3>
                </Col>
            </Row>
            <Row className="ml-0 mr-0 bg-light">
                <Col md={3} className="font-weight-bold">Description</Col>
                <Col md={2} className="font-weight-bold">No. of Units</Col>
                <Col md={2} className="font-weight-bold">Square feet</Col>
                <Col md={2} className="font-weight-bold">Income</Col>
                <Col md={3}></Col>
            </Row>
            {!listing ? <div></div> :
            listing.units.map((unit,index) =>
            (
            <Row className="ml-0 mr-0" key={unit.id}>
                <Col md={3}>{unit.description}</Col>
                <Col md={2}>{unit.numUnits}</Col>
                <Col md={2}>{unit.space} sf</Col>
                <Col md={2}>${unit.income}/mo</Col>
                <Col md={3}>
                           <Row>
                               { editMode === "edit" ?
                               <Col>
                                   <EditButton
                                       title="Add New Unit"
                                       listing={listing}
                                       index={index}
                                       unitUpdateIndex={this.props.unitUpdateIndex}
                                       unit={unit}
                                       onSave={this.handleSave}
                                       onShow={this.props.onUnitModalUpdate}
                                       onHide={this.props.onUnitModalHide}
                                       errorMessage={this.props.unitError}
                                       show={this.props.unitUpdate}
                                       saving={this.props.unitSaving}
                                   />
                               </Col>
                               : null }
                               { editMode === "edit" ?
                               <Col><FontAwesomeIcon className="text-danger" size="xs" icon={faTrash} /></Col>
                                : null }
                           </Row>
                </Col>
            </Row>
            ))}
        </div>
        );
    }
}
export default ListingDetailUnits;
