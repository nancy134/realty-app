import React from 'react';
import {
    Row,
    Col,
    Form,
    Button,
    Image,
    Spinner
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import userService from '../services/users';

const UserSchema = Yup.object().shape({
    first: Yup.string(),
    last: Yup.string(),
    middle: Yup.string(),
    company: Yup.string(),
    title: Yup.string(),
    address1: Yup.string(),
    address2: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.number().integer(),
    bio: Yup.string(),
    officePhone: Yup.string(),
    mobilePhone: Yup.string()
});

class AccountProfile extends React.Component{

    constructor(props){
        super(props);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.state = {
            profile: null,
            states: null,
            updateProgress: false
        };
    }

    componentDidMount(){
        var that = this;
        this.setState({
            updateProgress: true
        });
        userService.getUserEnums().then(function(enums){
            userService.getUser().then(function(result){
                that.setState({
                    updateProgress: false
                });
                that.setState({
                    profile: result,
                    states: enums.states 
                });
            }).catch(function(err){
                that.setState({
                    updateProgress: false
                });
                console.log(err);
            }); 
        }).catch(function(err){
            that.setState({
                updateProgress: false
            });
            console.log(err);
        });
    };

    handleUpdate(initialValues, values){
        var profile = {};

        if (initialValues.first !== values.first){
            profile.first = values.first;
        }
        if (initialValues.last !== values.last){
            profile.last = values.last;
        }
        if (initialValues.middle !== values.middle){
            profile.middle = values.middle;
        }
        if (initialValues.company !== values.company){
            profile.company = values.company;
        }
        if (initialValues.title !== values.title){
            profile.title = values.title;
        }
        if (initialValues.address1 !== values.address1){
            profile.address1 = values.address1;
        }
        if (initialValues.address2 !== values.address2){
            profile.address2 = values.address2;
        }
        if (initialValues.city !== values.city){
            profile.city = values.city;
        }
        if (initialValues.state !== values.state){
            profile.state = values.state;
        }
        if (initialValues.zip !== values.zip){
            profile.zip = values.zip;
        }
        if (initialValues.bio !== values.bio){
            profile.bio = values.bio;
        }
        if (initialValues.officePhone !== values.officePhone){
            profile.officePhone = values.officePhone;
        }
        if (initialValues.mobilePhone !== values.mobilePhone){
            profile.mobilePhone = values.mobilePhone;
        }

        var that = this;
        this.setState({
            updateProgress: true
        });

        userService.updateUser(this.state.profile.id, profile).then(function(response){
            that.setState({
                updateProgress: false
            });
        }).catch(function(err){
            that.setState({
                updateProgress: false,
            });
            console.log(err);
        });
    }
    render(){
        var states = null;
        if (this.state.states){
            states = this.state.states.map((item, key) =>
                <option key={key}>{item}</option>
            );
        }
        var initialValues = {
            email: "",
            first: "",
            last: "",
            middle: "",
            company: "",
            title: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            bio: "",
            officePhone: "",
            mobilePhone: ""
        };
        var profile = this.state.profile;
        if (profile){
            if (profile.email) initialValues.email = profile.email;
            if (profile.first) initialValues.first = profile.first;
            if (profile.last) initialValues.last = profile.last;
            if (profile.middle) initialValues.middle = profile.middle;
            if (profile.company) initialValues.company = profile.company;
            if (profile.title) initialValues.title = profile.title;
            if (profile.address1) initialValues.address1 = profile.address1;
            if (profile.address2) initialValues.address2 = profile.address2;
            if (profile.city) initialValues.city = profile.city;
            if (profile.state) initialValues.state = profile.state;
            if (profile.zip) initialValues.zip = profile.zip;
            if (profile.bio) initialValues.bio = profile.bio;
            if (profile.officePhone) initialValues.officePhone = profile.officePhone;
            if (profile.mobilePhone) initialValues.mobilePhone = profile.mobilePhone;
        }
        return(
        <div className="profile-view">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={UserSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    this.handleUpdate(initialValues, values);
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
                    <Form className="p-5 profile">
                    <Row><Col>
                        <Form.Row>
                            <Form.Group as={Col} xs={4}>
                                <Form.Label
                                    className="font-weight-bold"
                                >First Name</Form.Label>
                                <Form.Control
                                    name="first"
                                    type="text"
                                    value={values.first}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.first}
                                    isValid={touched.first && !errors.first && values.first !== ""}
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs={2}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Middle</Form.Label>
                                <Form.Control
                                    name="middle"
                                    type="text"
                                    value={values.middle}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.middle}
                                    isValid={touched.middle && !errors.middle && values.middle !== ""}
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs={4}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Last Name</Form.Label>
                                <Form.Control
                                    name="last"
                                    type="text"
                                    value={values.last}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.last}
                                    isValid={touched.last && !errors.last && values.last !== ""}
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs={10}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Title</Form.Label>
                                <Form.Control
                                    name="title"
                                    type="text"
                                    value={values.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.title}
                                    isValid={touched.title && !errors.title && values.title !== ""}
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs={10}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Company</Form.Label>
                                <Form.Control
                                    name="company"
                                    type="text"
                                    value={values.company}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.company}
                                    isValid={touched.company && !errors.company && values.company !== ""}
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs={10}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Address</Form.Label>
                                <Form.Control
                                    name="address1"
                                    type="text"
                                    value={values.address1}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.address1}
                                    isValid={touched.address1 && !errors.address1 && values.address1 !== ""}
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs={10}>
                                <Form.Control
                                    name="address2"
                                    type="text"
                                    value={values.address2}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.address2}
                                    isValid={touched.address2 && !errors.address2 && values.address2 !== ""}
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs={4}>
                                <Form.Label
                                    className="font-weight-bold"
                                >City</Form.Label>
                                <Form.Control
                                    name="city"
                                    type="text"
                                    value={values.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.city}
                                    isValid={touched.city && !errors.city && values.city !== ""}
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs={4}>
                                <Form.Label
                                    className="font-weight-bold"
                                >State</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.state}
                                    //isValid={touched.state && !errors.state && values.state !== ""}
                                    disabled={isSubmitting}
                                >{states}</Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} xs={2}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Zip</Form.Label>
                                <Form.Control
                                    name="zip"
                                    type="text"
                                    value={values.zip}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.zip}
                                    isValid={touched.zip && !errors.zip && values.zip !== ""}
                                    disabled={isSubmitting}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Col>
                    <Col>
                        <Form.Row>
                            <Form.Group as={Col} xs={4}>
                                <Image src="/broker.jpg" roundedCircle/>
                            </Form.Group>
                            <Form.Group as={Col} xs={8}>
                                
                                <Form.Label
                                    className="font-weight-bold"
                                >Office Phone</Form.Label>
                                <Form.Control
                                    name="officePhone"
                                    type="text"
                                    value={values.officePhone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.officePhone}
                                    isValid={touched.officePhone && !errors.officePhone && values.officePhone !== ""}
                                    disabled={isSubmitting}
                                />
                                <Form.Label
                                    className="font-weight-bold"
                                >Mobile Phone</Form.Label>
                                <Form.Control
                                    name="mobilePhone"
                                    type="text"
                                    value={values.mobilePhone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.mobilePhone}
                                    isValid={touched.mobilePhone && !errors.mobilePhone && values.mobilePhone !== ""}
                                    disabled={isSubmitting}
                                />


                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs={12}>
                            <Form.Label
                                className="font-weight-bold"
                            >Bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="6"
                                name="bio"
                                value={values.bio}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.bio}
                                isValid={touched.bio && !errors.bio && values.bio !== ""}
                                disabled={isSubmitting}
                            />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} xs={5}>
                                <Form.Label
                                    className="font-weight-bold"
                                >Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="text"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.email}
                                    isValid={touched.email && !errors.email && values.email !== ""}
                                    disabled
                                />
                            </Form.Group>

                        </Form.Row>
                    </Col></Row>
                    <Row>
                        <Col xs={4}></Col>
                        <Col xs={4}>
                            <Button
                                disabled={!(isValid && dirty) || isSubmitting}
                                variant="success"
                                block
                                onClick={handleSubmit}
                            >
                                { this.state.updateProgress ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                />
                                :
                                <span>Update Profile</span>
                                }
                            </Button>
                        </Col>
                        <Col xs={4}></Col>
                    </Row>
                    </Form>
                )}
            </Formik>
        </div>
        );
   }
}

export default AccountProfile;
