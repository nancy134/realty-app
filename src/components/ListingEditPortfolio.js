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

const PortfolioSchema = Yup.object().shape({
    tenant: Yup.string().required('Tenant Name is required'),
    buildingSize: Yup.number().typeError('Building Size must be a number'),
    lotSize: Yup.number().typeError('Lot Size must be a number'),
    types: Yup.string()
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
 
class ListingEditPortfolio extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(initialValues, values){

        var portfolio = {};
        if (this.props.portfolio) portfolio.id = this.props.portfolio.id;
        if (this.props.listing) portfolio.ListingVersionId = this.props.listing.id;

        if (initialValues.tenant !== values.tenant){
            portfolio.tenant = values.tenant;
        }        
        if (initialValues.lotSize !== values.lotSize){
            portfolio.lotSize = values.lotSize;
        }
        if (initialValues.buildingSize !== values.buildingSize){
            portfolio.buildingSize = values.buildingSize;
        }
        portfolio.type = values.type;
 
        this.props.onSave(portfolio);
    }
    render(){
        const portfolio = this.props.portfolio;
        var initialValues = {
            tenant: "",
            lotSize: "",
            buildingSize: ""
        };
        if (portfolio){
            if (portfolio.tenant) initialValues.tenant = portfolio.tenant;
            if (portfolio.lotSize) initialValues.lotSize = portfolio.lotSize;
            if (portfolio.buildingSize) initialValues.buildingSize = portfolio.buildingSize;
            if (portfolio.type) initialValues.type = portfolio.type;
        }
        return (
        <Formik
            initialValues={initialValues}
            validationSchema={PortfolioSchema}
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

            <Form noValidate >
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Tenant Name</Form.Label>
                        <Form.Control 
                            id="portfolio_edit_tenant"
                            name="tenant"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tenant}
                            isInvalid={!!errors.tenant}
                            isValid={touched.tenant && !errors.tenant}
                            disabled={isSubmitting}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.tenant}</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Building Size <span className="font-weight-light">(optional)</span></Form.Label>
                        <InputGroup>
                            <Form.Control 
                                id="portfolio_edit_building_size"
                                name="buildingSize"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.buildingSize} 
                                isInvalid={!!errors.buildingSize}
                                isValid={touched.buildingSize && !errors.buildingSize && values.lotSize !== ""}
                                disabled={isSubmitting}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">sq ft</InputGroup.Text>
                            </InputGroup.Append>
                            <Form.Control.Feedback type="invalid">{errors.buildingSize}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label className="font-weight-bold">Lot Size <span className="font-weight-light">(optional)</span></Form.Label>
                        <InputGroup>
                            <Form.Control
                                id="portfolio_edit_lot_size"
                                name="lotSize"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lotSize}
                                isInvalid={!!errors.lotSize}
                                isValid={touched.lotSize && !errors.lotSize && values.lotSize !== ""}
                                disabled={isSubmitting}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">acres</InputGroup.Text>
                            </InputGroup.Append>
                            <Form.Control.Feedback type="invalid">{errors.lotSize}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label className="font-weight-bold">Type <span className="font-weight-light">(optional)</span></Form.Label>
                        <Form.Control 
                            id="portfolio_edit_type"
                            as="select"
                            name="type"
                            value={values.type} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                        >
                            <option key="-1"></option>
                            {this.props.portfolioTypes.map((portfolioType, index) => (
                            <option key={index}>{portfolioType}</option>
                            ))}
                        </Form.Control>
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
                    id="portfolio_save_button"
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

export default ListingEditPortfolio;
