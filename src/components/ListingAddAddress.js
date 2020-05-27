import React from 'react';
import {
    Row,
    Col,
    Modal,
    Button,
    Form
} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import listingService from '../services/listings';

const AddressSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string(),
    zip: Yup.number().integer().typeError("Must be a valid zip code")
});

class ListingAddAddress extends React.Component{
    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.state = {
            states: null
        };
    }
    handleNext(initialValues, values){
        var listing = this.props.listing;
        if (values.address !== initialValues.address) listing.address = values.address;
        if (values.city !== initialValues.city) listing.city = values.city;
        if (values.state !== initialValues.state) listing.state = values.state;
        if (values.zip !== initialValues.zip) listing.zip = values.zip;
        if (values.displayAddress !== initialValues.displayAddress) listing.displayAddress = values.displayAddress;
        
        this.props.onNext(listing);
    }
    componentDidMount(){
        var that = this;
        var enumPromise = listingService.getEnumsPromise();
        enumPromise.then(function(data){
            that.setState({
                states: data.states
            });
        }).catch(function(err){
            console.log("err: "+err);
        });
    }
    render()
    {
        var states = null;
        if (this.state.states){
            states = this.state.states.map((item,key) =>
                <option key={key}>{item}</option>
            );
        }

       var initialValues = {
           address: "",
           city: "",
           state: "",
           zip: "",
           displayAddress: ""
       };

       if (this.props.show){
       return(
       <Formik
            initialValues={initialValues}
            validationSchema={AddressSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.handleNext(initialValues, values);
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
          aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Enter Listing Address 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="mt-2">
                    <Col>
                        <Form>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label className="font-weight-bold">Address</Form.Label>
                                    <Form.Control
                                        id="header_edit_address_input" 
                                        name="address"
                                        type="text"
                                        value={values.address} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.address}
                                        isValid={touched.address && !errors.address && values.address !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={6}>
                                    <Form.Label className="font-weight-bold">City</Form.Label>
                                    <Form.Control 
                                        id="header_edit_city_input"
                                        name="city"
                                        type="text"
                                        value={values.city} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.city && !!errors.city}
                                        isValid={touched.city && !errors.city && values.city !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city}
                                    </Form.Control.Feedback>
                                </Col>
                                <Col md={6}>
                                    <Form.Label className="font-weight-bold">State</Form.Label>
                                    <Form.Control 
                                        id="header_edit_state_select"
                                        as="select" 
                                        name="state"
                                        value={values.state} 
                                        onChange={handleChange} 
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.state}
                                        isValid={touched.state && !errors.state && values.state !== ""}
                                        disabled={isSubmitting}
                                    >
                                    {states}
                                    </Form.Control>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={6}>
                                    <Form.Label className="font-weight-bold">Zip</Form.Label>
                                    <Form.Control
                                        id="header_edit_zip_input"
                                        name="zip"
                                        type="text"
                                        value={values.zip}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.zip && !!errors.zip}
                                        isValid={touched.zip && !errors.zip && values.zip !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.zip}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col md={12}>
                                    <Form.Label className="font-weight-bold">Display Address <span className="font-weight-light">(optional)</span></Form.Label>
                                    <Form.Control 
                                        id="header_edit_display_address_edit"
                                        name="displayAddress"
                                        type="text"
                                        value={values.displayAddress} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.displayAddress}
                                        isValid={touched.displayAddress && !errors.displayAddress && values.displayAddress !== ""}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.displayAddress}
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
                    Cancel
                </Button>
                <Button 
                    disabled={!(isValid && dirty) || isSubmitting}
                    id="overview_edit_next_button"
                    onClick={handleSubmit}
                >
                    Next 
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
export default ListingAddAddress;
