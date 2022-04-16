import React from 'react';
import {
    Row,
    Col,
    Form,
    Button,
    Spinner
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import mailService from '../services/mail';

const ContactScheme = Yup.object().shape({
    client: Yup.string(),
    message: Yup.string()
});

class PolicyContact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sending: false,
            message: null
        }
        this.handleSendMessage=this.handleSendMessage.bind(this);
    }

    handleSendMessage(initalValues, values){
        console.log(values);
        var that = this;
        that.setState({
            sending: true
        });
        mailService.contactUs(values).then(function(result){
            console.log(result);
            that.setState({
                sending: false,
                message: "Mail sent successfully!"
            });
        }).catch(function(err){
            that.setState({
                sending: false,
                message: "Error sending email" 
            });
        });
    }
    render(){
        var initialValues = {
            subject: "",
            client: "",
            message: ""
        }; 
        return(
        <Row>
            <Col xs={3}>
                <div>
                    <h3>Address</h3>
                    FindingCRE, LLC<br/>
                    28 Rapids Road<br/>
                    Stamford, CT 06905<br/>
                    <h3 className="pt-2">Email</h3>
                    <a href="mailto:support@findingCRE.com">support@findingCRE.com</a>
                </div>
            </Col>
            <Col xs={9}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={ContactScheme}
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
                <Form>
     
                    <Row>
                        <Form.Group as={Col}>
                        <h3>We would love to hear from you!</h3>
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
                    <Row>
                        <Form.Group as={Col}>
                            <Button
                                onClick={handleSubmit}
                            >
                                { !this.state.sending ?
                                <span>Send Message</span>
                                :
                                <span><span>Send Message&nbsp;</span><Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /></span>
                                }
                            </Button>
                            { this.state.message ?
                            <span>&nbsp;{this.state.message}</span>
                            : null }
                        </Form.Group>
                    </Row>
                </Form>
                )}
                </Formik>
            </Col>
        </Row>
        );
    }
}

export default PolicyContact;

