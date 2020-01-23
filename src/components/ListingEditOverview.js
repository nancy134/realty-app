import React from 'react';
import {
    Row,
    Col,
    Form
} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';

class ListingEdit extends React.Component {
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
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control value="Street Retail and Office Space for Lease on High Ridge Road in Stamford, CT" /> 
                        <Form.Label>Long Description</Form.Label>
                        <Form.Control value="Street Retail in Ridge Plaza on heavily traveled High Ridge Road. The Plaza contains multiple retailers and has ample parking on site. Pylon signage is available." as="textarea" />
                    </Form>
                </Col>
                <Col>
                <p>Images</p>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg','.gif','.png','.gif']}
                        maxFileSize={5242880}
                        withPreview={true}
                        defaultImages={['https://sabre.phowma.com/image1.jpg']}
                    />
                </Col>
            </Row>

            </div>
        );
    }
}

export default ListingEdit;
