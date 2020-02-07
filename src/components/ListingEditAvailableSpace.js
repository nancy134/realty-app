import React from 'react';
import {
    Col,
    Form,
    InputGroup
} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';

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
        var unit = "";
        var size = "";
        var price = "";
        var type = "";
        var use = ""; 
        var description = "";

        var image1 = process.env.REACT_APP_WEB_SERVER+'image1.jpg';
        var image2 = process.env.REACT_APP_WEB_SERVER+'image2.jpg';
        var image3 = process.env.REACT_APP_WEB_SERVER+'image3.jpg';
        var images = [];

        const space = this.props.space;
        if (space){
            unit = space.unit;
            size = space.size;
            price = space.price;
            description = space.description;
            use = space.use;
            type = space.type;
            images = [image1, image2, image3];
        }
        return (
            <Form>
                <Form.Row>

                    <Form.Group as={Col} >
                        <Form.Label>Unit Name</Form.Label>
                        <Form.Control value ={unit}/> 
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Size</Form.Label>
                        <InputGroup>
                            <Form.Control value={size}/>
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">sq ft</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Price</Form.Label>
                        <InputGroup>
                            <Form.Control value={price}/>
                            <InputGroup.Append>
                                <InputGroup.Text>$/sf/mo</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" value={type}>
                            <option>Full Gross</option>
                            <option>Modified Gross</option>
                            <option>NNN</option>
                        </Form.Control> 
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Use</Form.Label>
                        <Form.Control as="select" value={use} >
                            <option>Office</option>
                            <option>Flex</option>
                            <option>Retail</option>
                            <option>Warehouse</option>
                            <option>Restaurant</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="5" value={description}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            withPreview={true}
                            defaultImages={images}
                        />
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

export default ListingEditAvailableSpace;
