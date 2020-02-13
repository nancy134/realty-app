import React from 'react';
import {
    Col,
    Form,
    InputGroup
} from 'react-bootstrap';

class ListingEditUnit extends React.Component {

    render(){
        var description = "";
        var noOfUnits = "";
        var area = "";
        var income = "";
        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Decription</Form.Label>
                        <Form.Control value={description}/> 
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>No. of Units</Form.Label>
                        <Form.Control value={noOfUnits}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Square feet</Form.Label>
                        <Form.Control value={area}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Income</Form.Label>
                        <Form.Control value={income}/>
                    </Form.Group>
                </Form.Row>

            </Form>
        );
    }
}

export default ListingEditUnit;
