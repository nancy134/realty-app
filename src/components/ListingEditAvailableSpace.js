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
        var unit = "Suite 1A";
        var size = "3,080 sq ft";
        var price = "$45/sq ft";
        var type = "NNN";
        var use = "Office"; 
        var description = "For lease is approximately 3,032 square feet of retail space in Ridge Plaza on High Ridge Road. This end cap location has large frontage and is currently a real estate office configured with perimeter offices and a large bullpen area, but can be easily redesigned into an open layout. There are 2 baths located within the space. The Plaza contains multiple retailers and abundant parking is available. As a main artery from the Merritt Parkway to the downtown business district, High Ridge Road is one of the most heavily traveled roads in Stamford with a traffic count of 26,900 cars per day. Ridge Plaza is conveniently located less than 1 mile from the Merritt Parkway Yet easily accessible from downtown Stamford. Prominent pylon signage is available.";

        var image1 = process.env.REACT_APP_WEB_SERVER+'image1.jpg';
        var image2 = process.env.REACT_APP_WEB_SERVER+'image2.jpg';
        var image3 = process.env.REACT_APP_WEB_SERVER+'image3.jpg';
        var images = [image1,image2,image3];
        if (this.props.content === "new"){
            unit = "";
            size = "";
            price = "";
            description = "";
            images = [];
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
                            <option>Mod Gross</option>
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
