import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import ListingEditGeneral from './ListingEditGeneral';

function EditButton(props) {

    return (
        <span>
            <span 
                id="general_edit_button"
                onClick={props.onShow} 
                className="edit-button text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPencilAlt} />&nbsp;Edit Building Detail
            </span>
            {props.show ?
            <ListingEditGeneral
                listing={props.listing}
                propertyTypes={props.propertyTypes}
                getListing={props.getListing}
                onSave={listing => props.onSave(listing)}
                saving={props.saving}

                show={props.show}
                onHide={props.onHide}
                errorMessage={props.errorMessage} 
            />
            : null}
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
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.getListing = this.getListing.bind(this);
    }
    handleSave(listing){
        this.props.onGeneralUpdate(listing);
    }
    getListing(){
        this.props.getListing();
    } 
    render() {
        //var propertyType = "";
        var totalBuildingSize = "";
        var lotSize = ""; 
        var taxes = "";
        var parking = "";
        var floors = "";
        var totalNumberOfUnits = "";
        var buildingClass = "";
        var ceilingHeight = "";
        var driveInDoors = "";
        var loadingDocks = "";
        var yearBuilt = "";
        var zone = "";
        var totalAvailableSpace = "";
        var nets = ""; 

        const editMode = this.props.editMode;
        const listing = this.props.listing;
        var propertyTypes = this.props.propertyTypes;

        if (editMode === "view" && listing && isEmpty(listing)) return null;
        if (listing){
            //propertyType = listing.propertyType;
            totalBuildingSize = listing.totalBuildingSize;

            lotSize = listing.lotSize;
            if (listing.lotSize){
                lotSize = listing.lotSize;
            }
            taxes = listing.taxes; 
            if (listing.taxes){
                taxes = listing.taxes;
            }
            parking = listing.parking; 
            if (listing.parking){
                parking = listing.parking;
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
                totalAvailableSpace = listing.totalAvailableSpace;
            }
            nets = listing.nets;
            if (listing.nets){
                nets = listing.nets;
            }
        }
        return (
            <div className="m-4 shadow border">
                <Row className="mt-2 ml-0 mr-0">
                    <Col>
                        <h3>Building Detail {editMode === "edit" ?
                            <EditButton 
                                listing={listing}
                                propertyTypes={propertyTypes}
                                onSave={this.handleSave}
                                getListing={this.props.getListing}

                                onShow={this.props.onGeneralModalUpdate}
                                onHide={this.props.onGeneralModalHide}
                                show={this.props.generalUpdate}
                                saving={this.props.generalSaving}
                                errorMessage={this.props.errorMessage}
                            /> : null}</h3>
                    </Col>
                </Row>
                <Row className="pt-2 ml-0 mr-0">
                    <Col>
                        {editMode === "edit" || (editMode === "view" && totalBuildingSize) ?
                        <Row>
                        <Col>Total Building Size</Col>
                        <Col className="font-weight-bold">{totalBuildingSize} sq ft</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && lotSize) ?
                        <Row>
                        <Col>Lot Size</Col>
                        <Col className="font-weight-bold">{lotSize} acres</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && taxes) ?
                        <Row>
                        <Col>Taxes</Col>
                        <Col className="font-weight-bold">${taxes} / yr</Col>
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
                        <Col className="font-weight-bold">{floors} floor(s)</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && totalNumberOfUnits) ?
                        <Row>
                        <Col>Total Number of Units</Col>
                        <Col className="font-weight-bold">{totalNumberOfUnits} unit(s)</Col>
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
                        <Col className="font-weight-bold">{ceilingHeight} ft</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && driveInDoors) ?
                        <Row>
                        <Col>Drive In Doors</Col>
                        <Col className="font-weight-bold">{driveInDoors} door(s)</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && loadingDocks) ?
                        <Row>
                        <Col>Loading Docks</Col>
                        <Col className="font-weight-bold">{loadingDocks} dock(s)</Col>
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
                        <Col className="font-weight-bold">{totalAvailableSpace} sq ft</Col>
                        </Row>
                        : null}
                        {editMode === "edit" || (editMode === "view" && nets) ?
                        <Row>
                        <Col>Nets</Col>
                        <Col className="font-weight-bold">${nets} / mo</Col>
                        </Row>
                        : null}

                    </Col>
                </Row>
             </div>

        );
    }
}

export default ListingDetailGeneral;
