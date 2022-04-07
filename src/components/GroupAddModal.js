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

const GroupSchema = Yup.object().shape({
    name: Yup.string()
})
class GroupAddModal extends React.Component {
    constructor(props){
        super(props);

        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
    }

    handleSave(initialValues, values){
        var group = {};

        if (this.props.group) group.id = this.props.group.id;
        if (this.props.user) group.UserId = this.props.user.id;

        if (initialValues.name !== values.name){
            group.name = values.name;
        }
        this.props.onSave(group);
    }

    render(){
        const group = this.props.group;
        var initialValues = {
            name: ""
        };
        if (group){
            if (group.name) initialValues.name = group.name;
        }
        return(
       <Formik
            initialValues={initialValues}
            validationSchema={GroupSchema}
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
                    <span>Add Group</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Name</Form.Label>
                        <Form.Control 
                            name="name"
                            type="text"
                            value={values.name} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.name}
                            isValid={touched.name && !errors.name && values.name !== ""}
                            disabled={isSubmitting}
                        /> 
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
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

export default GroupAddModal;
