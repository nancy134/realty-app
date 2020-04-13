import React from 'react';
import {
    Col,
    Form,
    Modal,
    Button
} from 'react-bootstrap';

class ListingEditGeneral extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.onPropertyTypeChange = this.onPropertyTypeChange.bind(this);
        this.onTotalBuildingSizeChange = this.onTotalBuildingSizeChange.bind(this);
        this.onLotSizeChange = this.onLotSizeChange.bind(this);
        this.onTaxesChange = this.onTaxesChange.bind(this);
        this.onParkingChange = this.onParkingChange.bind(this);
        this.onFloorsChange = this.onFloorsChange.bind(this);
        this.onTotalNumberOfUnitsChange = this.onTotalNumberOfUnitsChange.bind(this);
        this.onBuildingClassChange = this.onBuildingClassChange.bind(this);
        this.onCeilingHeightChange = this.onCeilingHeightChange.bind(this);
        this.onDriveInDoorsChange = this.onDriveInDoorsChange.bind(this);
        this.onLoadingDocksChange = this.onLoadingDocksChange.bind(this);
        this.onYearBuiltChange = this.onYearBuiltChange.bind(this);
        this.onZoneChange = this.onZoneChange.bind(this);
        this.onTotalAvailableSpaceChange = this.onTotalAvailableSpaceChange.bind(this);
        this.onNetsChange = this.onNetsChange.bind(this);
        if (this.props.listing){
            this.state = {
                id: this.props.listing.id,
                ListingId: this.props.listing.ListingId,
                propertyType: this.props.listing.propertyType ? this.props.listing.propertyType : "",
                totalBuildingSize: this.props.listing.totalBuildingSize ? this.props.listing.totalBuildingSize : "",
                lotSize : this.props.listing.lotSize ? this.props.listing.lotSize : "",
                taxes : this.props.listing.taxes ? this.props.listing.taxes : "",
                parking: this.props.listing.parking ? this.props.listing.parking : "",
                floors: this.props.listing.floors ? this.props.listing.floors : "",
                totalNumberOfUnits : this.props.listing.totalNumberOfUnits ? this.props.listing.totalNumberOfUnits : "",
                buildingClass : this.props.listing.buildingClass ? this.props.listing.buildingClass : "",
                ceilingHeight : this.props.listing.ceilingHeight ? this.props.listing.ceilingHeight : "",
                driveInDoors : this.props.listing.driveInDoors ? this.props.listing.driveInDoors : "",
                loadingDocks : this.props.listing.loadinDocks ? this.props.listing.loadingDocks : "",
                yearBuilt : this.props.listing.yearBuilt ? this.props.listing.yearBuild : "",
                zone : this.props.listing.zone ? this.props.listing.zone : "",
                totalAvailableSpace : this.props.listing.totalAvailableSpace ? this.props.listing.totalAvailableSpace : "",
                nets : this.props.listing.nets ? this.props.listing.nets : ""

            };
        } else {
            this.state = {
                id: null,
                ListingId: null,
                propertyType: "",
                totalBuildingSize : "",
                lotSize : "",
                taxes : "",
                parking : "",
                floors : "",
                totalNumberOfUnits : "",
                buildingClass : "",
                ceilingHeight : "",
                driveInDoors : "",
                loadingDocks : "",
                yearBuilt : "",
                zone : "",
                totalAvailableSpace : "",
                nets : ""
            };
        }
    }
    onPropertyTypeChange(event){
        this.setState({
            propertyType: event.target.value
        });
    }
    onTotalBuildingSizeChange(event){
        this.setState({
            totalBuildingSize: event.target.value
        });
    }
    onLotSizeChange(event){
        this.setState({
            lotSize: event.target.value
        });
    }
    onTaxesChange(event){
        this.setState({
            taxes: event.target.value
        });
    }
    onParkingChange(event){
        this.setState({
            parking: event.target.value
        });
    }
    onFloorsChange(event){
        this.setState({
            floors: event.target.value
        });
    }
    onTotalNumberOfUnitsChange(event){
        this.setState({
            totalNumberOfUnit: event.target.value
        });
    }
    onBuildingClassChange(event){
        this.setState({
            buildingClass: event.target.value
        });
    }
    onCeilingHeightChange(event){
        this.setState({
            ceilingHeight: event.target.value
        });
    }
    onDriveInDoorsChange(event){
        this.setState({
            driveInDoors: event.target.value
        });
    }
    onLoadingDocksChange(event){
        this.setState({
            loadingDocks: event.target.value
        });
    }
    onYearBuiltChange(event){
        this.setState({
            yearBuilt: event.target.value
        });
    }
    onZoneChange(event){
        this.setState({
            zone: event.target.value
        });
    }
    onTotalAvailableSpaceChange(event){
        this.setState({
            totalAvailableSpace: event.target.value
        });
    }
    onNetsChange(event){
        this.setState({
            nets: event.target.value
        });
    }
    handleSave(){
        var listing = {};
        if (this.props.listing){
            listing.ListingId = this.props.listing.ListingId;
        } else {
            listing.ListingId = this.state.ListingId;
        }
        if (this.state.propertyType) listing.propertyType = this.state.propertyType;
        if (this.state.totalBuildingSize) listing.totalBuildingSize = this.state.totalBuildingSize;
        if (this.state.lotSize) listing.lotSize = this.state.lotSize;
        if (this.state.taxes) listing.taxes = this.state.taxes;
        if (this.state.parking) listing.parking = this.state.parking;
        if (this.state.floors) listing.floors = this.state.floors;
        if (this.state.totalNumberOfUnit) listing.totalNumberOfUnits = this.state.totalNumberOfUnits;
        if (this.state.buildingClass) listing.buildingClass = this.state.buildingClass;
        if (this.state.ceilingHeight) listing.ceilingHeight = this.state.ceilingHeight;
        if (this.state.driveInDoors) listing.driveInDoors = this.state.driveInDoors;
        if (this.state.loadingDocks) listing.loadingDocks = this.state.loadingDocks;
        if (this.state.yearBuilt) listing.yearBuilt = this.state.yearBuilt;
        if (this.state.zone) listing.zone = this.state.zone;
        if (this.state.totalAvailableSpace) listing.totalAvailableSpace = this.state.totalAvailableSpace;
        if (this.state.nets) listing.nets = this.state.nets;
        this.props.onSave(listing);
        this.props.onHide();
    }
    render()
    {
    return(
    <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Edit Building Details
            </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <Form>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Property Type</Form.Label>
                    <Form.Control as="select" value={this.state.propertyType} onChange={this.onPropertyTypeChange}>
                        <option>Office</option>
                        <option>Coworking</option>
                        <option>Industrial</option>
                        <option>Retail</option>
                        <option>Restaurant</option>
                        <option>Flex</option>
                        <option>Medical</option>
                        <option>Land</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Ceiling Height</Form.Label>
                    <Form.Control value={this.state.ceilingHeight} onChange={this.onCeilingHeightChange}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Total Building Size</Form.Label>
                    <Form.Control value={this.state.totalBuildingSize} onChange={this.onTotalBuildingSizeChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Drive In Doors</Form.Label>
                    <Form.Control value={this.state.driveInDoors} onChange={this.onDriveInDoorsChange}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Lot Size</Form.Label>
                    <Form.Control value={this.state.lotSize} onChange={this.onLotSizeChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Loading Docks</Form.Label>
                    <Form.Control value={this.state.loadingDocks} onChange={this.onLoadingDocksChange}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Taxes</Form.Label>
                    <Form.Control value={this.state.taxes} onChange={this.onTaxesChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Year Built</Form.Label>
                    <Form.Control value={this.state.yearBuilt} onChange={this.onYearBuiltChange}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Parking</Form.Label>
                    <Form.Control value={this.state.parking} onChange={this.onParkingChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Zone</Form.Label>
                    <Form.Control value={this.state.zone} onChange={this.onZoneChange}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Floors</Form.Label>
                    <Form.Control value={this.state.floors} onChange={this.onFloorsChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Total Available Space</Form.Label>
                    <Form.Control value={this.state.totalAvailableSpace} onChange={this.onTotalAvailableSpaceChange}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Total Number of Units</Form.Label>
                    <Form.Control value={this.state.totalNumberOfUnits} onChange={this.onTotalNumberOfUnitsChange}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Nets</Form.Label>
                    <Form.Control value={this.state.nets} onChange={this.onNetsChange}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Building Class</Form.Label>
                    <Form.Control value={this.state.buildingClass} onChange={this.onBuildingClassChange}></Form.Control>
                </Form.Group>
            </Form.Row>

        </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={this.props.onHide}>Cancel</Button>
            <Button onClick={this.handleSave}>Save</Button>
        </Modal.Footer>
    </Modal>
    );
    }

}

export default ListingEditGeneral;
