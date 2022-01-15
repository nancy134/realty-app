import React from 'react';
import {
    Row,
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

const CondoSchema = Yup.object().shape({
    unit: Yup.string(),
    size: Yup.number().integer().typeError('Size must be an integer'),
    fees: Yup.number().typeError('Fees must be a number'),
    taxes: Yup.number().typeError('Taxes must be a number')
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
class ListingEditCondo extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(initialValues, values){
        var condo = {};
        if (this.props.condo) condo.id = this.props.condo.id;
        if (this.props.listing) condo.ListingVersionId = this.props.listing.id;

        if (initialValues.unit !== values.unit){
            condo.unit = values.unit;
        }
        if (initialValues.size !== values.size){
            condo.size = values.size;
        }
        if (initialValues.fees !== values.fees){
            condo.fees = values.fees;
        }
        if (initialValues.taxes !== values.taxes){
            condo.taxes = values.taxes;
        }

        this.props.onSave(condo);
    }
    render(){
        const condo = this.props.condo;
        var initialValues = {
            unit: "",
            size: "",
            fees: "",
            taxes: ""
        }
        if (condo){
            if (condo.unit) initialValues.unit = condo.unit;
            if (condo.size) initialValues.size = condo.size;
            if (condo.fees) initialValues.fees = condo.fees;
            if (condo.taxes) initialValues.taxes = condo.taxes;
        }
        return (
        <Formik
            initialValues={initialValues}
            validationSchema={CondoSchema}
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
                <Modal.Title id="contained-modal-title-vcenter">{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Unit</Form.Label>
                        <Form.Control 
                            id="condo_edit_unit"
                            name="unit"
                            type="text"
                            value={values.unit} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.unit}
                            isValid={touched.unit && !errors.unit}
                            disabled={isSubmitting} 
                        /> 
                        <Form.Control.Feedback type="invalid">
                            {errors.unit}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label  className="font-weight-bold">Size <span className="font-weight-light">(optional)</span></Form.Label>
                        <InputGroup>
                            <Form.Control 
                                id="condo_edit_size"
                                name="size"
                                type="text"
                                value={values.size} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.size}
                                isValid={touched.size && !errors.size && values.size !== ""}
                                disabled={isSubmitting}
                            />
                            <InputGroup.Text id="basic-addon2">sf</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                {errors.size}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Fees <span className="font-weight-light">(optional)</span></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control 
                                id="condo_edit_fees"
                                name="fees"
                                type="text"
                                value={values.fees}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.fees}
                                isValid={touched.fees && !errors.fees && values.fees !== ""}
                                disabled={isSubmitting}
                            />
                            <InputGroup.Text id="basic-addon2">mo</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                {errors.fees}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Taxes <span className="font-weight-light">(optional)</span></Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control 
                                id="condo_edit_taxes"
                                name="taxes"
                                type="text"
                                value={values.taxes} 
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.taxes}
                                isValid={touched.taxes && !errors.taxes && values.taxes !== ""}
                                disabled={isSubmitting}
                            />
                            <InputGroup.Text id="basic-addon2">yr</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                {errors.taxes}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>

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
                <Button 
                    onClick={this.props.onHide}
                >Discard changes</Button>
                :
                <Button
                    onClick={this.props.onHide}
                >Close</Button>
                }
  
                <Button
                    disabled={!(isValid && dirty) || isSubmitting}
                    id="condo_save_button"
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

export default ListingEditCondo;
