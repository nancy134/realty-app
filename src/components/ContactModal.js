import React from 'react';
import {
    Modal,
    Button,
    Form
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import authenticationService from '../helpers/authentication';

const ContactSchema = Yup.object().shape({
    client: Yup.string(),
    message: Yup.string()
});

class ContactModal extends React.Component {
    constructor(props){
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    handleSendMessage(initialValues, values){
        this.props.onSendMessage(values);
    }
    render(){
        var email = authenticationService.getUserEmail();
        var client = "";
        if (email) client = email;
        var initialValues = {
            client: client,
            message: ""
        };
        return(
        <Formik
            initialValues={initialValues}
            validationSchema={ContactSchema}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true);
                this.handleSendMessage(initialValues, values);
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
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Contact 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Form.Label>Your email</Form.Label>
                            <Form.Control
                                name="client"
                                type="text"
                                value={values.client}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.client}
                                isValid={touched.client && !errors.client && values.client !== ""}
                            />
                        </Form.Row>
                        <Form.Row>
                            <Form.Label>Your message</Form.Label>
                            <Form.Control
                                name="message"
                                as="textarea"
                                rows="5"
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.message}
                                isValid={touched.message && !errors.message && values.message !== ""}
                            />
                        </Form.Row>
                     </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                    <Button 
                        id="delete_button"
                        onClick={handleSubmit}
                    >
                        Send Message 
                    </Button>
                </Modal.Footer>
            </Modal>
        )}
        </Formik>
        );
    }
}

export default ContactModal;
