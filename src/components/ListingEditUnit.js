import React from 'react';
import {
    Col,
    Form,
    Modal,
    InputGroup,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';

const UnitSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    numUnits: Yup.number().integer().typeError('Must be an integer'),
    space: Yup.number().integer().typeError('Must be an integer'),
    income: Yup.number().typeError('Must be a number')
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
function SavingAlert(){
    return(
    <div className="w-100">
        <Alert
           variant="info"
        >
           Saving...<Spinner animation="border" />
        </Alert>
    </div>
    );
}

class ListingEditUnit extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(initialValues, values){
        var unit = {};
        if (this.props.unit) unit.id = this.props.unit.id;
        if (this.props.listing) unit.ListingVersionId = this.props.listing.id;

        if (initialValues.description !== values.description){
            unit.description = values.description;
        }
        if (initialValues.numUnits !== values.numUnits){
            unit.numUnits = values.numUnits;
        }        
        if (initialValues.space !== values.space){
            unit.space = values.space;
        }
        if (initialValues.income !== values.income){
            unit.income = values.income;
        }

        this.props.onSave(unit);
    } 
    render(){
        const unit = this.props.unit;
        var initialValues = {
            description: "",
            numUnits: "",
            space: "",
            income: ""
        };
        if (unit){
            if (unit.description) initialValues.description = unit.description;
            if (unit.numUnits) initialValues.numUnits = unit.numUnits;
            if (unit.space) initialValues.space = unit.space;
            if (unit.income) initialValues.income = unit.income;
        }
        return (
       <Formik
            initialValues={initialValues}
            validationSchema={UnitSchema}
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
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Unit Edit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Decription</Form.Label>
                        <Form.Control 
                            id="unit_edit_description"
                            name="description"
                            type="text"
                            value={values.description} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.description}
                            isValid={touched.description && !errors.description && values.description !== ""}
                            disabled={isSubmitting}
                        /> 
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">No. of Units <span className="font-weight-light">(optional)</span></Form.Label>
                        <Form.Control 
                            id="unit_edit_num_units"
                            name="numUnits"
                            type="text"
                            value={values.numUnits} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.numUnits}
                            isValid={touched.numUnits && !errors.numUnits && values.numUnits !== ""}
                            disabled={isSubmitting}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.numUnits}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Square feet <span className="font-weight-light">(optional)</span></Form.Label>
                        <InputGroup>
                            <Form.Control 
                                id="unit_edit_space"
                                name="space"
                                type="text"
                                value={values.space} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.space}
                                isValid={touched.space && !errors.space && values.space !== ""}
                                disabled={isSubmitting}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">sq ft</InputGroup.Text>
                            </InputGroup.Append>
                            <Form.Control.Feedback type="invalid">
                                {errors.space}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Income <span className="font-weight-light">(optional)</span></Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                id="unit_edit_income"
                                name="income"
                                type="text"
                                value={values.income} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.income}
                                isValid={touched.income && !errors.income && values.income !== ""}
                                disabled={isSubmitting}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">mo</InputGroup.Text>
                            </InputGroup.Append>

                            <Form.Control.Feedback type="invalid">
                                {errors.income}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>

            </Form>
            </Modal.Body>
            <Modal.Footer>
                {this.props.errorMessage ?
                <ErrorAlert errorMessage={this.props.errorMessage}/>
                : null}
                {this.props.saving ?
                <SavingAlert />
                : null}
                { dirty ?
                <Button onClick={this.props.onHide}>Discard Changes</Button>
                :
                <Button onClick={this.props.onHide}>Close</Button>
                }
                <Button
                    disabled={!(isValid && dirty) || isSubmitting}
                    id="unit_save_button"
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

export default ListingEditUnit;
