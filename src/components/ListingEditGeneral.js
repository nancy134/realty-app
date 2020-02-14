import React from 'react';
import {
    Col,
    Form
} from 'react-bootstrap';

class ListingEditGeneral extends React.Component {

    render()
    {
    const listing = this.props.listing;
    var propertyType = "";
    var ceilingHeight = "";
    var totalBuildingSize = "";
    var driveInDoors = "";
    var lotSize = "";
    var loadingDocks = "";
    var taxes = "";
    var yearBuilt = "";
    var parking = "";
    var zone = "";
    var floors = "";
    var totalAvailableSpace = "";
    var totalNumberOfUnits = "";
    var nets = "";
    var buildingClass = "";
    if (listing){
        propertyType = listing.propertyType;
        ceilingHeight = listing.ceilingHeight;
        totalBuildingSize = listing.totalBuildingSize;
        driveInDoors = listing.driveInDoors;
        lotSize = listing.lotSize;
        loadingDocks = listing.loadingDocks;
        taxes = listing.taxes;
        yearBuilt = listing.yearBuilt;
        parking = listing.parking;
        zone = listing.zone;
        floors = listing.floors;
        totalAvailableSpace = listing.totalAvailableSpace;
        nets = listing.nets;
        buildingClass = listing.buildingClass;
    }
    
    return(
        <Form>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Property Type</Form.Label>
                    <Form.Control as="select" value={propertyType}>
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
                    <Form.Control value={ceilingHeight}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Total Building Size</Form.Label>
                    <Form.Control value={totalBuildingSize}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Drive In Doors</Form.Label>
                    <Form.Control value={driveInDoors}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Lot Size</Form.Label>
                    <Form.Control value={lotSize}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Loading Docks</Form.Label>
                    <Form.Control value={loadingDocks}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Taxes</Form.Label>
                    <Form.Control value={taxes}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Year Built</Form.Label>
                    <Form.Control value={yearBuilt}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Parking</Form.Label>
                    <Form.Control value={parking}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Zone</Form.Label>
                    <Form.Control value={zone}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Floors</Form.Label>
                    <Form.Control value={floors}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Total Available Space</Form.Label>
                    <Form.Control value={totalAvailableSpace}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Total Number of Units</Form.Label>
                    <Form.Control value={totalNumberOfUnits}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Nets</Form.Label>
                    <Form.Control value={nets}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Building Class</Form.Label>
                    <Form.Control value={buildingClass}></Form.Control>
                </Form.Group>
            </Form.Row>

        </Form>
    );
    }

}

export default ListingEditGeneral;
