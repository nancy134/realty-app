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
import ListingEditCondo from './ListingEditCondo';

function CondoItem(props){
    var condo = props.condo;

    var unit = "";
    if (condo.unit){
        unit = condo.unit;
    }
    var size = "";
    if (condo.size){
        size = condo.size+" sf";
    }
    var fees = "";
    if (condo.fees){
        fees = "$"+condo.fees+"/mo";
    }
    var taxes = "";
    if (condo.taxes){
        taxes = "$"+condo.taxes+"/yr";
    }
        
    return(
            <Row className="ml-0 mr-0" key={condo.id}>
                <Col md={3}>{unit}</Col>
                <Col md={2}>{size}</Col>
                <Col md={2}>{fees}</Col>
                <Col md={3}>{taxes}</Col>
                <Col md={2}>
                    <Row>
                        { props.editMode === "edit" ?
                        <Col>
                            <EditButton
                                listing={props.listing}
                                index={props.index}
                                condoUpdateIndex={props.condoUpdateIndex}
                                condo={props.condo}
                                onSave={props.onSave}
                                onShow={props.onShow}
                                onHide={props.onHide}
                                errorMessage={props.errorMessage}
                                show={props.show}
                                saving={props.saving}
                            />
                        </Col>
                        : null }
                        { props.editMode === "edit" ?
                        <Col>
                            <FontAwesomeIcon
                                className="edit-button text-danger"
                                size="xs"
                                onClick={() => {props.onDelete(props.condo.id)}}
                                icon={faTrash}
                            />
                        </Col>
                        : null }
                    </Row>
                </Col>
            </Row>
    );
}


function AddButton(props) {
    return (
        <span>
            <span
                id="condo_add_button"
                onClick={() => {props.onShow()}}
                className="edit-button text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />&nbsp;Edit Condo 
            </span>
            {props.show ?
            <ListingEditCondo
                title="Edit Condo"
                listing={props.listing}
                index={props.index}
                condo={props.condo}
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
    var condo = props.condo;
    if (props.listing){
        condo = props.listing.condos[props.condoUpdateIndex];
   }
    return(
        <span>
            <span
                id="condo_edit_button"
                onClick={() => {props.onShow(props.index)}}
                className="edit-button text-danger"
            >
                <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            { props.show ?
            <ListingEditCondo
                title="Edit Condo"
                listing={props.listing}
                condo={condo}
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
class ListingDetailCondos extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleCondoEdit = this.handleCondoEdit.bind(this);
    }
    handleSave(condo){
        this.props.onCondoUpdate(condo);
    }

    // Limit Condo to 1 per listing
    handleCondoEdit(){
        if (this.props.listing.condos.length > 0){
            this.props.onCondoModalUpdate(0);
        } else {
            this.props.onCondoModalNew();
        }
    }
    render(){
       var listing = this.props.listing;
       var editMode = this.props.editMode;
       var newCondo = {};
       
        return(
        <div className="m-4 shadow border">
            <Row className="mt-2 ml-0 mr-0">
                <Col>
                    <h3>Commercial Condo&nbsp; 
                        {editMode === "edit" ? 
                        <AddButton 
                            listing={listing} 
                            condo={newCondo} 
                            onSave={this.handleSave}
                            onShow={this.handleCondoEdit}
                            onHide={this.props.onCondoModalHide}
                            errorMessage={this.props.condoError}
                            show={this.props.condoNew}
                            saving={this.props.condoSaving}
                        /> 
                        : null}
                    </h3>
                </Col>
            </Row>
            <Row className="ml-0 mr-0 bg-light">
                <Col md={3} className="font-weight-bold">Unit</Col>
                <Col md={2} className="font-weight-bold">Size</Col>
                <Col md={2} className="font-weight-bold">Fees</Col>
                <Col md={3} className="font-weight-bold">Taxes</Col>
                <Col md={2}></Col>
            </Row>
            {!listing ? <div></div> :
            listing.condos.map((condo, index) => 
            (
            <CondoItem
                key={index}
                listing={listing}
                index={index}
                condoUpdateIndex={this.props.condoUpdateIndex}
                condo={condo}
                onSave={this.handleSave}
                onShow={this.props.onCondoModalUpdate}
                onHide={this.props.onCondoModalHide}
                errorMessage={this.props.condoError}
                show={this.props.condoUpdate}
                saving={this.props.condoSaving}
                editMode={editMode}
                onDelete={this.props.onDelete}
            />
            ))}
        </div>
        );
    }
}
export default ListingDetailCondos;
