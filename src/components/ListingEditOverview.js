import React from 'react';
import {
    Row,
    Col,
    Form
} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';

class ListingEditOverview extends React.Component {
    constructor(props){
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles)
        });
    }
    render(){
        var shortDescription = "Street Retail and Office Space for Lease on High Ridge Road in Stamford, CT";
        var longDescription = "Street Retail in Ridge Plaza on heavily traveled High Ridge Road. The Plaza contains multiple retailers and has ample parking on site. Pylon signage is available.";
        var image1 = process.env.REACT_APP_WEB_SERVER+"image1.jpg";
        var defaultImage = [image1];
        if (this.props.content === "new"){
            shortDescription = "";
            longDescription = "";
            defaultImage = [];
        } 
        return (
            <div>
            <Row className="mt-2">
                <Col>
                    <Form>
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control value={shortDescription} /> 
                        <Form.Label>Long Description</Form.Label>
                        <Form.Control value={longDescription} rows="5" as="textarea" />
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
                        defaultImages={defaultImage}
                    />
                </Col>
            </Row>

            </div>
        );
    }
}

export default ListingEditOverview;
