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
        var shortDescription = "";
        var longDescription = "";
        var defaultImage = [];
        if (this.props.listing){
            shortDescription = this.props.listing.shortDescription;
            longDescription = this.props.listing.longDescription;
            for (var i=0; i<this.props.listing.images.length; i++){
                defaultImage.push(this.props.listing.images[i].url);
            }
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
