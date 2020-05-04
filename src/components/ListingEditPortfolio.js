import React from 'react';
import {
    Col,
    Form,
    Modal,
    InputGroup,
    Button
} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';

    const PortfolioSchema = Yup.object().shape({
        tenant: Yup.string().required('Tenant Name is required'),
        buildingSize: Yup.number().typeError('Building Size must be a number'),
        lotSize: Yup.number().typeError('Lot Size must be a number'),
        types: Yup.string()
    });

class ListingEditPortfolio extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(portfolio){

        if (this.props.portfolio) portfolio.id = this.props.portfolio.id;
        if (this.props.listing) portfolio.ListingVersionId = this.props.listing.id;

        console.log("portfolio: "+JSON.stringify(portfolio));
        this.props.onSave(portfolio);
        this.props.onHide();
    }
    render(){
        const portfolio = this.props.portfolio;
        var portfolioValues = {
            tenant: ""
        };
        if (portfolio){
            if (portfolio.tenant) portfolioValues.tenant = portfolio.tenant;
            if (portfolio.lotSize) portfolioValues.lotSize = portfolio.lotSize;
            if (portfolio.buildingSize) portfolioValues.buildingSize = portfolio.buildingSize;
            if (portfolio.type) portfolioValues.type = portfolio.type;
        }
        return (
                 <Formik
                initialValues={portfolioValues}
                validationSchema={PortfolioSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    this.handleSave(values);
                    setSubmitting(false);
                }}
            >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid, dirty }) => (
        <Modal
            show={this.props.show}
            onHide={this.props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Portfolio Edit 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form noValidate >
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Tenant Name</Form.Label>
                        <Form.Control 
                            id="portfolio_edit_tenant"
                            name="tenant"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tenant}
                            isInvalid={!!errors.tenant}
                            isValid={touched.tenant && !errors.tenant}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.tenant}</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Building Size</Form.Label>
                        <InputGroup>
                            <Form.Control 
                                id="portfolio_edit_building_size"
                                name="buildingSize"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.buildingSize} 
                                isInvalid={!!errors.buildingSize}
                                isValid={touched.buildingSize && !errors.buildingSize}
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
                        <Form.Label>Lot Size</Form.Label>
                        <InputGroup>
                            <Form.Control
                                id="portfolio_edit_lot_size"
                                name="lotSize"
                                type="text"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lotSize}
                                isInvalid={!!errors.lotSize}
                                isValid={touched.lotSize && !errors.lotSize}
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
                        <Form.Label>Type</Form.Label>
                        <Form.Control 
                            id="portfolio_edit_type"
                            as="select"
                            name="type"
                            value={values.type} 
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                <Button onClick={this.props.onHide}>Close</Button>
                <Button 
                    disabled={!(isValid && dirty)}
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
