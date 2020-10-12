import React from 'react';
import {
    Row,
    Col,
    Modal,
    Button,
    Form,
    InputGroup
} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';

const OverviewSchemaForSale = Yup.object().shape({
    shortDescription: Yup.string().required('Short Description is required'),
    longDescription: Yup.string(),
    listingPrice: Yup.number().required('Listing Price is required').positive().integer()
});

const OverviewSchemaForLease = Yup.object().shape({
    shortDescription: Yup.string().required('Short Description is required'),
    longDescription: Yup.string()
});


class ListingAddOverview extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);

        this.shortDescriptionRef = React.createRef();
        this.listingPriceRef = React.createRef();
    }
    handleNext(initialValues, values){
        var listing = this.props.listing;
        if (values.shortDescription !== initialValues.shortDescription) listing.shortDescription = values.shortDescription;
        if (values.longDescription !== initialValues.longDescription) listing.longDescription = values.longDescription;
        if (values.listingPrice !== initialValues.listingPrice) listing.listingPrice = values.listingPrice;
        
        this.props.onNext(listing);
    }
    componentDidMount(){
        if (this.props.show){
        setTimeout(() => {
            if (this.props.listing.listingType === "For Lease"){
                console.log("set focus to short description");
                this.shortDescriptionRef.current.focus();
            }else{
                console.log("set focus to listing price");
                this.listingPriceRef.current.focus();
            }
        }, 1);
        }
    }
    render()
    {

       var initialValues = {
           shortDescription: "",
           longDescription: "",
           listingPrice: ""
       };

       var schema = OverviewSchemaForLease;
       if (this.props.listing.listingType === "For Sale"){
           schema = OverviewSchemaForSale;
       }

       if (this.props.show){
       return(
       <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.handleNext(initialValues, values);
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
          aria-labelledby="contained-modal-title-vcenter"
          backdrop='static'
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Enter Overview 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mt-2">
                    <Col>
                        <Form>
                            <Form.Row>
                                { this.props.listing.listingType === "For Sale" ?
                                <Col md={6}>
                                    <Form.Label className="font-weight-bold">Listing Price</Form.Label>
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
                                            ref={this.listingPriceRef}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.listingPrice}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                : null}
                            </Form.Row>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label className="font-weight-bold">Short Description</Form.Label>
                                    <Form.Control
                                        id="overview_edit_short_description_input" 
                                        name="shortDescription"
                                        type="text"
                                        value={values.shortDescription} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.shortDescription && !!errors.shortDescription}
                                        isValid={touched.shortDescription && !errors.shortDescription && values.shortDescription !== ""}
                                        disabled={isSubmitting}
                                        ref={this.shortDescriptionRef}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.shortDescription}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label className="font-weight-bold">Long Description <span className="font-weight-light">(optional}</span></Form.Label>
                                    <Form.Control 
                                        id="header_edit_long_decription_input"
                                        name="longDescription"
                                        type="text"
                                        as="textarea"
                                        rows="5"
                                        value={values.longDescription} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.longDescription && !!errors.longDescription}
                                        isValid={touched.longDescription && !errors.longDescription && values.longDescription !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.longDescription}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    id="overview_edit_cancel_button"
                    onClick={this.props.onCancel}
                >
                    Discard Changes 
                </Button>
                <Button 
                    disabled={!(isValid && dirty) || isSubmitting}
                    id="overview_create_listing_button"
                    onClick={handleSubmit}
                >
                    Create New Listing 
                </Button>
            </Modal.Footer>
       </Modal>
       )}
       </Formik>
       );
       } else {
       return(null);
       } 
    }
}
export default ListingAddOverview;
