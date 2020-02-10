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
        console.log("onDrop");
        console.log("pictureFiles: "+pictureFiles);
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles)
        });
    }
    render(){
        var shortDescription = "";
        var longDescription = "";
        var propertyType="For Lease";
        var listingPrice="";
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
                        <Form.Label>Property Type</Form.Label>
                        <Form.Control as="select" value={propertyType}>
                            <option>For Sale</option>
                            <option>For Lease</option>
                        </Form.Control>
                        <Form.Label>Listing Price</Form.Label>
                        <Form.Control value={listingPrice} />
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
                        imgExtension={['.jpg','.gif','.png']}
                        maxFileSize={5242880}
                        withPreview={true}
                        defaultImages={defaultImage}
                        label="Max file size: 5mb, accepted: jpg, gif, png"
                    />
                </Col>
            </Row>

            </div>
        );
    }
}

export default ListingEditOverview;
