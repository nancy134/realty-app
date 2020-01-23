import React from 'react';
import {
    Row,
    Col,
    Form
} from 'react-bootstrap';

class ListingEditAvailableSpace extends React.Component {
    constructor(props){
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(pictureFiles, pictureDataURLs) {
        console.log("pictureFiles: "+pictureFiles);
        console.log("pictureDataURLs: "+pictureDataURLs);
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles)
        });
    }
    render(){
        return (
            <div>
            <Row className="mt-2">
                <Col>
                    <Form>
                        <Form.Label>Unit</Form.Label>
                        <Form.Control /> 
                        <Form.Label>Size</Form.Label>
                        <Form.Control /> 
                        <Form.Label>Price</Form.Label>
                        <Form.Control />
                        <Form.Label>Type</Form.Label>
                        <Form.Control />
                        <Form.Label>Use</Form.Label>
                        <Form.Control />
                        <Form.Label>Description</Form.Label>
                        <Form.Control />
                    </Form>
                </Col>
            </Row>

            </div>
        );
    }
}

export default ListingEditAvailableSpace;
