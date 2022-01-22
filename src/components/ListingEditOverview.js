import React from 'react';
import {
    Row,
    Col,
    Form,
    Modal,
    Button,
    Alert,
    Spinner,
    InputGroup
} from 'react-bootstrap';
import ImageUpload from './ImageUpload';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {listingTypes} from '../constants/listingTypes';

const OverviewSchema = Yup.object().shape({
    shortDescription: Yup.string().required('Short Description is required'),
    longDescription: Yup.string(),
    listingPrice: Yup.number().transform((_value, originalValue) => Number(originalValue.replace(/,/g, ''))),
    listingType: Yup.string()
});

function ErrorAlert(props) {
    const [show, setShow] = React.useState(true);

    if (show) {
        return (
        <div className="w-100">
            <Alert 
                variant="danger" 
                onClose={() => setShow(false)} 
                dismissible
            >
                <Alert.Heading>Oh no! You got an error!</Alert.Heading>
                <p>{props.errorMessage}</p>
            </Alert>
        </div>
        );
    }
}

class ListingEditOverview extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        this.handleImagesChanged = this.handleImagesChanged.bind(this);
        this.handleFilterChange = this.handleFilterChanged.bind(this);
        this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);

        var checkedPropertyTypes = [];
        for (var i=0; i<this.props.propertyTypes.length; i++){
            var checkedPropertyType = false;
            if (this.props.listing && this.props.listing.propertyTypes){
                for (var j=0; j<this.props.listing.propertyTypes.length; j++){
                    if (this.props.listing.propertyTypes[j] === this.props.propertyTypes[i]){
                        checkedPropertyType = true;
                    }
                }
            }
            checkedPropertyTypes.push(checkedPropertyType);
        }
        if (this.props.listing){
            this.state = {
                images: this.props.listing.images ? this.props.listing.images : [],
                imagesToDelete: [],
                checkedPropertyTypes: checkedPropertyTypes,
                propertyTypesChanged: false
            };
        } else {
           this.state = {
                images: [],
                imagesAdded: false,
                imagesToDelete: [],
                checkedPropertyTypes: checkedPropertyTypes,
                propertyTypesChanged: false
           };
        }
    }

    handleToggleCheckbox(index){
        //const { checkedPropertyTypes } = this.state;
        //checkedPropertyTypes[index] = !checkedPropertyTypes[index];

        var checkedPropertyTypes = this.state.checkedPropertyTypes;
        checkedPropertyTypes[index] = !checkedPropertyTypes[index];
        this.setState({
            checkedPropertyTypes: checkedPropertyTypes,
            propertyTypesChanged: true
        });
    }
    handleFilterChanged(filters){
        console.log(filters);
    }
    handleSave(initialValues, values){
        var listing = {};
        var propertyTypes = [];
        for (var i=0; i<this.state.checkedPropertyTypes.length; i++){
            if (this.state.checkedPropertyTypes[i] === true){
                propertyTypes.push(this.props.propertyTypes[i]);
            }
        }
        listing.propertyTypes = propertyTypes;

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
            listing.listingPrice = parseFloat(values.listingPrice.replace(/,/g, ''));
        }
        if (initialValues.listingType !== values.listingType){
            listing.listingType = values.listingType;
        }  
        this.props.onSave(listing);
    }
    handleFilesAdded(files){
        this.setState({imagesAdded: true});
        this.props.onFilesAdded(files);
    }
    handleImagesChanged(cards,values,dirty){
        this.setState({imagesAdded: true});
        this.props.onImagesChanged(cards);
    } 
    render(){
        var images = [];
        if (this.props.listing){
            for (var i=0; i<this.props.listing.images.length; i++){
                images.push(this.props.listing.images[i].url);
            }
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
            if (listing.listingPrice){
                initialValues.listingPrice = listing.listingPrice;
                var hasDecimal = listing.listingPrice % 1;
                var listingPrice = listing.listingPrice;
                var floatPrice = parseFloat(listingPrice)
                if (!hasDecimal){
                    listingPrice = floatPrice.toLocaleString(undefined, {maximumFractionDigits:0});
                } else {
                    listingPrice = floatPrice.toLocaleString(undefined, {maximumFractionDigits:2});
                }
                initialValues.listingPrice = listingPrice;

            }
            if (listing.listingType) initialValues.listingType = listing.listingType;
        }
        
        return (
        <Formik
            initialValues={initialValues}
            validationSchema={OverviewSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.handleSave(initialValues, values);
                //setSubmitting(false);
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
          backdrop='static'
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Overview
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
            <Row className="mt-2">
                <Col xs={4}>
                        <Form>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Short Description</Form.Label>
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
                            </Form.Group>
                        </Row>
                        </Form>
                        { listing.listingType === listingTypes.FORSALE ?
                        <Form>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Listing Price</Form.Label>

                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
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
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        </Form>
                        : null}

                        <Form>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Long Description <span className="font-weight-light">(optional)</span>
                                </Form.Label>
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
                            </Form.Group>
                        </Row>
                        </Form>
                </Col>
                <Col xs={2}>
                    <Form.Label
                        className="font-weight-bold"
                    >Property Uses</Form.Label>
                    <div>
                        {this.props.propertyTypes.map((propertyType, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={propertyType}
                                defaultChecked={this.state.checkedPropertyTypes[index]}
                                onChange={() => this.handleToggleCheckbox(index)}
                            />
                        ))}
                    </div>
                </Col>
                <Col xs={6}>
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
                        successfullyUploaded={this.props.successfullyUploaded}
                        onImagesChanged={(e) => this.handleImagesChanged(e, values, dirty)}
                    />
                    </Row>
                </Col>
            </Row>
            </Form> 
            </Modal.Body>
            <Modal.Footer>
                {this.props.errorMessage ?
                <ErrorAlert errorMessage={this.props.errorMessage}/>
                : null}
                { dirty ?
                <Button 
                    id="overview_edit_cancel_button"
                    onClick={this.props.onHide}
                >
                    Discard Changes
                </Button>
                :
                <Button
                    id="overview_edit_cancel_button"
                    onClick={this.props.onHide}
                >
                    Cancel
                </Button>
                }
                <Button
                    disabled={
                        (!(isValid && dirty) || isSubmitting) && 
                        !this.state.imagesAdded && 
                        !this.state.propertyTypesChanged
                    }
                    id="overview_edit_save_button"
                    onClick={handleSubmit}
                >
                    { this.props.saving ?
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    :
                    <span>Save</span>
                    }
                </Button>
            </Modal.Footer>
        </Modal>
        )}
        </Formik> 
        );
    }
}

export default ListingEditOverview;
