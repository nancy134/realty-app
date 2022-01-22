import React from 'react';
import {
    Row,
    Col,
    Form,
    Modal,
    Button
} from 'react-bootstrap';

import {Formik} from 'formik';
import * as Yup from 'yup';

const AddressSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string(),
    zip: Yup.number().integer().typeError("Must be a valid zip code")
});

class ListingEditHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(initialValues, values){
        var listing = {};
        if (this.props.listing){
            listing.ListingId = this.props.listing.ListingId;
        } else {
            listing.ListingId = this.state.ListingId;
        }

        if (initialValues.address !== values.address){
            listing.address = values.address;
        }
        if (initialValues.city !== values.city){
            listing.city = values.city;
        }
        if (initialValues.state !== values.state){
            listing.state = values.state;
        }
        if (initialValues.zip !== values.zip){
            listing.zip = values.zip;
        }
        if (initialValues.displayAddress !== values.displayAddres){
            listing.displayAddress = values.displayAddress;
        }
        this.props.onSave(listing);
        this.props.onHide();
    }
    render(){
        var listing = this.props.listing;
        var initialValues = {
            address: "",
            city: "",
            state: "",
            zip: "",
            displayAddress: ""
        };
        if (listing){
            if (listing.address) initialValues.address = listing.address;
            if (listing.city) initialValues.city = listing.city;
            if (listing.state) initialValues.state = listing.state;
            if (listing.zip) initialValues.zip = listing.zip;
            if (listing.displayAddress) initialValues.displayAddress = listing.displayAddress;
        }
        var states = null;
        if (this.props.states){
            states = this.props.states.map((item,key) =>
                <option key={key}>{item}</option>
            );
        }
        return (
        <Formik
            initialValues={initialValues}
            validationSchema={AddressSchema}
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
            backdrop='static'
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Address Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Row className="mt-2">
                    <Col>
                        <Form>
                            <Form>
                            <Row>
                                <Col md={12}>
                                    <Form.Label>Address</Form.Label>
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
                                </Col>
                            </Row>
                            </Form>
                            <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                        id="header_edit_city_input"
                                        name="city"
                                        type="text"
                                        value={values.city} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.city}
                                        isValid={touched.city && !errors.city && values.city !== ""}
                                        disabled={isSubmitting}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Form.Label>State</Form.Label>
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
                            </Row>
                            </Form>
                            <Form>
                            <Row>
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
                            </Row>
                            </Form>
                            <Form>
                            <Row>
                                <Col md={12}>
                                    <Form.Label>Display Address</Form.Label>
                                    <Form.Control 
                                        id="header_edit_display_address_edit"
                                        name="displayAddress"
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
                                </Row>
                            </Form>
                        </Form>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                {dirty ?
                <Button onClick={this.props.onHide}>Discard Changes</Button>
                :
                <Button onClick={this.props.onHide}>Cancel</Button>
                }
                <Button
                    disabled={!(isValid && dirty) || isSubmitting} 
                    id="header_edit_save_button"
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

export default ListingEditHeader;

