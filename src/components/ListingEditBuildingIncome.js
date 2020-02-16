import React from 'react';
import {
    Col,
    Form
} from 'react-bootstrap';

class ListingEditBuildingIncome extends React.Component {

    render()
    {
    const listing = this.props.listing;
    var grossIncome = "";
    var netIncome = "";
    var capRate = "";
    var taxes = "";
    var pricePerFoot = "";
    var maintenance = "";
    var utilities = "";
    var hvac = "";
    var security = "";
    var hoaFees = "";
    if (listing){
        grossIncome = listing.grossIncome;
        netIncome = listing.netIncome;
        capRate = listing.capRate;
        taxes = listing.taxe;
        pricePerFoot = listing.pricePerFoot;
        maintenance = listing.maintenance;
        utilities = listing.utilities;
        hvac = listing.hvac;
        security = listing.security;
        hoaFees = listing.hoaFees;
    }
    
    return(
        <Form>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Gross Income</Form.Label>
                    <Form.Control value={grossIncome}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Maintenant</Form.Label>
                    <Form.Control value={maintenance}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Net Income</Form.Label>
                    <Form.Control value={netIncome}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Utilities</Form.Label>
                    <Form.Control value={utilities}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Cap Rate</Form.Label>
                    <Form.Control value={capRate}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>HVAC</Form.Label>
                    <Form.Control value={hvac}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Taxes</Form.Label>
                    <Form.Control value={taxes}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Security</Form.Label>
                    <Form.Control value={security}></Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Price Per Foot</Form.Label>
                    <Form.Control value={pricePerFoot}></Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>HOA Fees</Form.Label>
                    <Form.Control value={hoaFees}></Form.Control>
                </Form.Group>
            </Form.Row>

        </Form>
    );
    }

}

export default ListingEditBuildingIncome;
