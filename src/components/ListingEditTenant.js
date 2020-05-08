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
import {formatDate} from '../helpers/utilities';

const TenantSchema = Yup.object().shape({
    tenant: Yup.string().required('Tenant Name is required'),
    space: Yup.number().integer().typeError('Size must be an integer'),
    baseRent: Yup.number().typeError('Base Rate must be anumber'),
    leaseEnds: Yup.date().typeError('Invalid date')
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

class ListingEditTenant extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(initialValues, values){
        var tenant = {};
        if (this.props.tenant) tenant.id = this.props.tenant.id;
        if (this.props.listing) tenant.ListingVersionId = this.props.listing.id;

        if (initialValues.tenant !== values.tenant){
            tenant.tenant = values.tenant;
        }
        if (initialValues.space !== values.space){
            tenant.space = values.space;
        }
        if (initialValues.baseRent !== values.baseRent){
            tenant.baseRent = values.baseRent;
        }
        if (initialValues.leaseEnds !== values.leaseEnds){
            tenant.leaseEnds = values.leaseEnds;
        }

        this.props.onSave(tenant);
    }
    render(){
        const tenant = this.props.tenant;
        console.log("tenant: "+JSON.stringify(tenant));
        var initialValues = {
            tenant: "",
            space: "",
            baseRent: "",
            leaseEnds: ""
        }
        if (tenant){
            if (tenant.tenant) initialValues.tenant = tenant.tenant;
            if (tenant.space) initialValues.space = tenant.space;
            if (tenant.baseRent) initialValues.baseRent = tenant.baseRent;
            if (tenant.leaseEnds) initialValues.leaseEnds = tenant.leaseEnds;
        }
        if (initialValues.leaseEnds !== ""){
            initialValues.leaseEnds = formatDate(initialValues.leaseEnds);
        }
        return (
       <Formik
            initialValues={initialValues}
            validationSchema={TenantSchema}
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
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Tenant Name</Form.Label>
                        <Form.Control 
                            id="tenant_edit_tenant"
                            name="tenant"
                            type="text"
                            value={values.tenant} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.tenant}
                            isValid={touched.tenant && !errors.tenant}
                            disabled={isSubmitting} 
                        /> 
                        <Form.Control.Feedback type="invalid">
                            {errors.tenant}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label  className="font-weight-bold">Size <span className="font-weight-light">(optional)</span></Form.Label>
                        <InputGroup>
                            <Form.Control 
                                id="tenant_edit_space"
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
                        <Form.Label className="font-weight-bold">Base Rent <span className="font-weight-light">(optional)</span></Form.Label>
                        <InputGroup>
                            <Form.Control 
                                id="tenant_edit_base_rent"
                                name="baseRent"
                                type="text"
                                value={values.baseRent}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.baseRent}
                                isValid={touched.baseRent && !errors.baseRent && values.baseRent !== ""}
                                disabled={isSubmitting}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">$/mo</InputGroup.Text>
                            </InputGroup.Append>
                            <Form.Control.Feedback type="invalid">
                                {errors.baseRent}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Lease Ends <span className="font-weight-light">(optional)</span></Form.Label>
                        <Form.Control 
                            id="tenant_edit_lease_ends"
                            name="leaseEnds"
                            type="text"
                            value={values.leaseEnds} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.leaseEnds}
                            isValid={touched.leaseEnds && !errors.leaseEnds && values.leaseEnds !== ""}
                            disabled={isSubmitting}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.leaseEnds}
                        </Form.Control.Feedback>
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
                <Button onClick={this.props.onHide}>Close</Button>
                <Button
                    disabled={!(isValid && dirty) || isSubmitting}
                    id="tenant_save_button"
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

export default ListingEditTenant;
