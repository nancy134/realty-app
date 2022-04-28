import React from 'react';
import {
    Modal,
    Button,
    Form,
    Row,
    Col
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import authenticationService from '../helpers/authentication';
import {formatNameList} from '../helpers/utilities';
import {abbrState} from '../helpers/utilities';

const ContactSchema = Yup.object().shape({
    client: Yup.string(),
    message: Yup.string()
});

class ContactModal extends React.Component {
    constructor(props){
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
    }

    componentDidMount(){
    }
    handleSendMessage(initialValues, values){
        var to = [];
        var users = this.props.listing.users;
        for (var i=0; i<users.length; i++){
            to.push(users[i].email);
        }
        values.to = to;
        this.props.onSendMessage(values);
    }
    render(){
        var listing = this.props.listing;
        var nameList = "";
        if (this.props.toUserName){
            nameList = this.props.toUserName;
        } else {
            nameList = formatNameList(listing.users);
        }
        var email = authenticationService.getUserEmail();
        var client = "";
        if (email) client = email;

        var stateAbbr = abbrState(listing.state, 'abbr');
        var subject = "Regarding " + listing.address + ", " + listing.city + ", "+stateAbbr;
        var initialValues = {
            subject: subject,
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
                        Contact Broker
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                        <Form.Group as={Col}>
                            <Form.Label className="font-weight-bold">To</Form.Label>
                            <Form.Control
                                name="to"
                                type="text"
                                value={nameList}
                                disabled={true}
                            />
                        </Form.Group>
                        </Row>
                        <Row>
                        <Form.Group as={Col}>
                            <Form.Label className="font-weight-bold">Subject</Form.Label>
                            <Form.Control
                                name="subject"
                                type="text"
                                value={values.subject}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.subject}
                                isValid={touched.subject && !errors.subject && values.subject !== ""}
                            />
                        </Form.Group>
                        </Row>
                        <Row>
                        <Form.Group as={Col}>
                            <Form.Label className="font-weight-bold">Your email address</Form.Label>
                            <Form.Control
                                name="client"
                                type="text"
                                value={values.client}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.client}
                                isValid={touched.client && !errors.client && values.client !== ""}
                            />
                        </Form.Group>
                        </Row>
                        <Row>
                        <Form.Group as={Col}>
                            <Form.Label className="font-weight-bold">Your message</Form.Label>
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
                        </Form.Group>
                        </Row>
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
