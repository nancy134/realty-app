import React from 'react';
import {
    Row,
    Col,
    Form,
    Modal,
    Button,
    Image
} from 'react-bootstrap';
import ImageUpload from './ImageUpload';
import {Formik} from 'formik';
import * as Yup from 'yup';

const OverviewSchema = Yup.object().shape({
    shortDescription: Yup.string().required('Short Description is required'),
    longDescription: Yup.string(),
    listingPrice: Yup.number(),
    listingType: Yup.string()
});

class ListingEditOverview extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        if (this.props.listing){
            this.state = {
                images: this.props.listing.images ? this.props.listing.images : []
            };
        } else {
           this.state = {
                images: [],
                imagesAdded: false
           };
        }
    }

    handleSave(initialValues, values){
        var listing = {};
        if (this.props.listing){
            listing.ListingId = this.props.listing.ListingId;
        } else {
            listing.ListingId = this.state.ListingId;
        }
        
        if (initialValues.shortDescription !== values.shortDescription){
            listing.shortDescription = values.shortDescription;
        }
        if (initialValues.longDescription !== values.longDescription){
            listing.longDescription = values.longDescription;
        }
        if (initialValues.listingPrice !== values.listingPrice){
            listing.listingPrice = values.listingPrice;
        }
        if (initialValues.listingType !== values.listingType){
            listing.listingType = values.listingType;
        }  
        this.props.onSave(listing);
        this.props.onHide();
    }
    handleFilesAdded(files){
        console.log("handleFilesAdded");
        this.setState({imagesAdded: true});
        this.props.onFilesAdded(files);
    }
    render(){
        /*
        var listingTypes = null;
        if (this.props.listingTypes){
            listingTypes = this.props.listingTypes.map((item,key) =>
                <option key={key}>{item}</option>
            );
        }
        */
        var images = [];
        if (this.props.listing){
            for (var i=0; i<this.props.listing.images.length; i++){
                images.push(this.props.listing.images[i].url);
            }
        }
        var imgs = [];
        if (this.props.listing && this.props.listing.images){
            imgs = this.props.listing.images.map((item,key) =>
                <Image key={key} src={item.url} className="edit-image p-2"/>
            );
        }
        var listing = this.props.listing;
        var initialValues = {
            shortDescription: "",
            longDescription: "",
            listingPrice: "",
            listingType: ""
        };
        if (listing){
            if (listing.shortDescription) initialValues.shortDescription = listing.shortDescription;
            if (listing.longDescription) initialValues.longDescription = listing.longDescription;
            if (listing.listingPrice) initialValues.listingPrice = listing.listingPrice;
            if (listing.listingType) initialValues.listingType = listing.listingType;
        }
        
        return (
        <Formik
            initialValues={initialValues}
            validationSchema={OverviewSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.handleSave(initialValues, values);
                setSubmitting(false);
            }}
        >
            {({ 
                values, 
                errors, 
                touched, 
                handleChange, 
                handleBlur, 
                handleSubmit, 
                isSubmitting, 
                isValid, 
                dirty, 
                setFieldValue 
            }) => (       
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Overview
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row className="mt-2">
                <Col xs={5}>
                    <Form>
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control 
                            id="overview_edit_short_description"
                            name="shortDescription"
                            type="text"
                            value={values.shortDescription} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.shortDescription}
                            isValid={touched.shortDescription && !errors.shortDescription && values.shortDescription !== ""}
                            disabled={isSubmitting} 
                        /> 
                        <Form.Label>Long Description</Form.Label>
                        <Form.Control 
                            id="overview_edit_long_description"
                            name="longDescription"
                            value={values.longDescription} 
                            rows="8" 
                            as="textarea" 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.longDescription}
                            isValid={touched.longDescription && !errors.longDescription && values.longDescription !== ""}
                            disabled={isSubmitting}
                        />
                        { listing.listingType === "For Sale" ?
                        <div>
                        <Form.Label>Listing Price</Form.Label>
                        <Form.Control
                            id="overview_edit_listing_price"
                            name="listingPrice"
                            type="text"
                            value={values.listingPrice}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.listingPrice && !!errors.listingPrice}
                            isValid={touched.listingPrice && !errors.listingPrice && values.listingPrice !== ""}
                            disabled={isSubmitting}
                        />
                        </div>
                        : null}

                    </Form>
                </Col>
                <Col xs={7}>
                    <Row>
                    <ImageUpload 
                        id="overview_edit_image_upload"
                        images={images} 
                        listing={this.props.listing} 
                        onImageUploadFinished={this.onImageUploadFinished}
                        onFilesAdded={this.handleFilesAdded}
                        files={this.props.files}
                        uploading={this.props.uploading}
                        uploadProgress={this.props.uploadProgress}
                        successfullUploaded={this.props.successfullUploaded}
                    />
                    </Row>
                    <Row>
                        {imgs}
                    </Row>
                </Col>
            </Row>
         
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="overview_edit_cancel_button"
                    onClick={this.props.onHide}
                >
                    Cancel
                </Button>
                <Button
                    disabled={(!(isValid && dirty) || isSubmitting) && !this.state.imagesAdded}
                    id="overview_edit_save_button"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        )}
        </Formik> 
        );
    }
}

export default ListingEditOverview;
