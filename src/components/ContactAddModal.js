import React from 'react';
import {
    Modal,
    Button,
    Form,
    Row,
    Col
} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';

const ContactSchema = Yup.object().shape({
    first: Yup.string(),
    last: Yup.string(),
    email: Yup.string(),
    mobilePhone: Yup.string()
})
class ContactAddModal extends React.Component {
    constructor(props){
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(initialValues, values){
        var contact = {};

        if (this.props.contact) contact.id = this.props.contact.id;
        if (this.props.user) contact.UserId = this.props.user.id;

        if (initialValues.fisrt !== values.first){
            contact.first = values.first;
        }
        if (initialValues.last !== values.last){
            contact.last = values.last;
        }
        if (initialValues.email !== values.email){
            contact.email = values.email;
        }
        if (initialValues.mobilePhone !== values.mobilePhone){
            contact.mobilePhone = values.mobilePhone;
        }
        this.props.onSave(contact);
    }

    render(){
        const contact = this.props.contact;
        var initialValues = {
            first: "",
            last: "",
            email: "",
            mobilePhone: ""
        };
        if (contact){
            if (contact.first) initialValues.first = contact.first;
            if (contact.last) initialValues.last = contact.last;
            if (contact.email) initialValues.email = contact.email;
            if (contact.mobilePhone) initialValues.mobilePhone = contact.mobilePhone;
        }
        return(
       <Formik
            initialValues={initialValues}
            validationSchema={ContactSchema}
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
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.props.show}
            backdrop="static"
            onHide={this.props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span>Add Contact</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">First</Form.Label>
                        <Form.Control 
                            id="contact_edit_first"
                            name="first"
                            type="text"
                            value={values.first} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.first}
                            isValid={touched.first && !errors.first && values.first !== ""}
                            disabled={isSubmitting}
                        /> 
                        <Form.Control.Feedback type="invalid">
                            {errors.first}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                </Form>
                <Form>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Last</Form.Label>
                        <Form.Control
                            id="contact_edit_last"
                            name="last"
                            type="text"
                            value={values.last}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.last}
                            isValid={touched.last && !errors.last && values.last !== ""}
                            disabled={isSubmitting}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.last}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                </Form>
                <Form>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Email</Form.Label>
                        <Form.Control
                            id="contact_edit_email"
                            name="email"
                            type="text"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.email}
                            isValid={touched.email && !errors.email && values.email !== ""}
                            disabled={isSubmitting}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                </Form>
                <Form>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Mobile Phone</Form.Label>
                        <Form.Control
                            id="contact_edit_email"
                            name="mobilePhone"
                            type="text"
                            value={values.mobilePhone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.mobilePhone}
                            isValid={touched.mobilePhone && !errors.mobilePhone && values.mobilePhone !== ""}
                            disabled={isSubmitting}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.mobilePhone}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                </Form>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onHide}
                >
                    Cancel
                </Button>
                <Button
                    disabled={!(isValid && dirty) || isSubmitting}
                    id="contact_add_save_button"
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

export default ContactAddModal;
