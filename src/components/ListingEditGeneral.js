import React from 'react';
import {
    Row,
    Col,
    Form,
    Modal,
    Button,
    InputGroup,
    Spinner,
    Alert
} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';

const GeneralSchema = Yup.object().shape({
    propertyType: Yup.string(),
    zone: Yup.string(),
    buildingClass: Yup.string(),
    totalBuildingSize: Yup.number().integer().typeError('Must be an integer'),
    totalAvailableSpace: Yup.number().integer().typeError('Must be an integer'),
    lotSize: Yup.number().typeError('Must be a number'),
    totalNumberOfUnits: Yup.number().integer().typeError('Must be an integer'),
    yearBuilt:  Yup.number().integer().typeError('Must be an integer'),
    parking: Yup.string(),
    driveInDoors: Yup.number().integer().typeError('Must be an integer'),
    loadingDocks: Yup.number().integer().typeError('Must be an integer'),
    floors: Yup.number().integer().typeError('Must be an integer'),
    ceilingHeight: Yup.number().typeError('Must be a number'),
    taxes: Yup.number().typeError('Must be a number'),
    nets: Yup.number().typeError('Must be a number')

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
class ListingEditGeneral extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(initialValues, values){
        var listing = {};
        if (this.props.listing){
            listing.ListingId = this.props.listing.ListingId;
        } else {
            listing.ListingId = this.state.ListingId;
        }
        if (initialValues.propertyType !== values.propertyType){
            listing.propertyType = values.propertyType;
        }
        if (initialValues.totalBuildingSize !== values.totalBuildingSize){
            listing.totalBuildingSize = values.totalBuildingSize;
        }
        if (initialValues.lotSize !== values.lotSize){
            listing.lotSize = values.lotSize;
        }
        if (initialValues.taxes !== values.taxes){
            listing.taxes = values.taxes;
        }
        if (initialValues.parking !== values.parking){
            listing.parking = values.parking;
        }
        if (initialValues.floors !== values.floors){
            listing.floors = values.floors;
        }
        if (initialValues.totalNumberOfUnits !== values.totalNumberOfUnits){
            listing.totalNumberOfUnits = values.totalNumberOfUnits;
        }
        if (initialValues.buildingClass !== values.buildingClass){
            listing.buildingClass = values.buildingClass;
        }
        if (initialValues.ceilingHeight !== values.ceilingHeight){
            listing.ceilingHeight = values.ceilingHeight;
        }
        if (initialValues.driveInDoors !== values.driveInDoors){
            listing.driveInDoors = values.driveInDoors;
        }
        if (initialValues.loadingDocks !== values.loadingDocks){
            listing.loadingDocks = values.loadingDocks;
        }
        if (initialValues.yearBuilt !== values.yearBuilt){
            listing.yearBuilt = values.yearBuilt;
        }
        if (initialValues.zone !== values.zone){
            listing.zone = values.zone;
        }
        if (initialValues.totalAvailableSpace !== values.totalAvailableSpace){
            listing.totalAvailableSpace = values.totalAvailableSpace;
        }
        if (initialValues.nets !== values.nets){
            listing.nets = values.nets;
        }

        this.props.onSave(listing);
    }
    render()
    {

    var listing = this.props.listing;
    var initialValues = {
        propertyType: "",
        totalBuildingSize : "",
        lotSize : "",
        taxes : "",
        parking : "",
        floors : "",
        totalNumberOfUnits : "",
        buildingClass : "",
        ceilingHeight : "",
        driveInDoors : "",
        loadingDocks : "",
        yearBuilt : "",
        zone : "",
        totalAvailableSpace : "",
        nets : ""
    };
    if (listing){
        if (listing.propertyType) initialValues.propertyType = listing.propertyType;
        if (listing.totalBuildingSize) initialValues.totalBuildingSize = listing.totalBuildingSize;
        if (listing.lotSize) initialValues.lotSize = listing.lotSize;
        if (listing.taxes) initialValues.taxes = listing.taxes;
        if (listing.parking) initialValues.parking = listing.parking;
        if (listing.floors) initialValues.floors = listing.floors;
        if (listing.totalNumberOfUnits) initialValues.totalNumberOfUnits = listing.totalNumberOfUnits;
        if (listing.buildingClass) initialValues.buildingClass = listing.buildingClass;
        if (listing.ceilingHeight) initialValues.ceilingHeight = listing.ceilingHeight;
        if (listing.driveInDoors) initialValues.driveInDoors = listing.driveInDoors;
        if (listing.loadingDocks) initialValues.loadingDocks = listing.loadingDocks;
        if (listing.yearBuilt) initialValues.yearBuilt = listing.yearBuilt;
        if (listing.zone) initialValues.zone = listing.zone;
        if (listing.totalAvailableSpace) initialValues.totalAvailableSpace = listing.totalAvailableSpace;
        if (listing.nets) initialValues.nets = listing.nets;
    }

    var hideForNow = false;
    return(
    <Formik
        initialValues={initialValues}
        validationSchema={GeneralSchema}
        onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            this.handleSave(initialValues, values);
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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
    >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
            Edit Building Details
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}> 
        <Form>
            <Form>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Building Size <span className="font-weight-light">(optional)</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            id="general_edit_building_size"
                            name="totalBuildingSize"
                            type="text"
                            value={values.totalBuildingSize}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.totalBuildingSize}
                            isValid={touched.totalBuildingSize && !errors.totalBuildingSize && values.totalBuildingSize !== ""}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">sq ft</InputGroup.Text>
                        </InputGroup.Append> 
                        <Form.Control.Feedback type="invalid">
                            {errors.totalBuildingSize}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Available Space <span className="font-weight-light">(optional)</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            id="general_edit_total_available_space"
                            name="totalAvailableSpace"
                            type="text"
                            value={values.totalAvailableSpace}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.totalAvailableSpace}
                            isValid={touched.totalAvailableSpace && values.totalAvailableSpace && values.totalAvailableSpace !== ""}
                            disabled={isSubmitting}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">sq ft</InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            {errors.totalAvailableSpace}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Lot Size <span className="font-weight-light">(optional)</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            id="general_edit_lot_size"
                            name="lotSize"
                            type="text"
                            value={values.lotSize}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.lotSize}
                            isValid={touched.lotSize && !errors.lotSize && values.lotSize !== ""}
                            disabled={isSubmitting}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">acres</InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            {errors.lotSize}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            </Form>
            <Form>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Number of Units <span className="font-weight-light">(optional)</span></Form.Label>
                    <Form.Control
                        id="general_edit_total_number_of_units"
                        name="totalNumberOfUnits"
                        type="text"
                        value={values.totalNumberOfUnits}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.totalNumberOfUnits}
                        isValid={touched.totalNumberOfUnits && !errors.totalNumberOfUnits && values.totalNumberOfUnits !== ""}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.totalNumberOfUnits}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Year Built <span className="font-weight-light">(optional)</span></Form.Label>
                    <Form.Control
                        id="general_edit_year_built"
                        name="yearBuilt"
                        type="text"
                        value={values.yearBuilt}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.yearBuilt}
                        isValid={touched.yearBuilt && !errors.yearBuilt && values.yearBuilt !== ""}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.yearBuilt}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Parking <span className="font-weight-light">(optional)</span></Form.Label>
                    <Form.Control
                        id="general_edit_parking"
                        name="parking"
                        type="text"
                        value={values.parking}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.parking}
                        isValid={touched.parking && !errors.parking && values.parking !== ""}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.parking}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            </Form>
            <Form>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Drive In Doors <span className="font-weight-light">(optional)</span></Form.Label>
                    <Form.Control
                        id="general_edit_drive_in_doors"
                        name="driveInDoors"
                        type="text"
                        value={values.driveInDoors}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.driveInDoors}
                        isValid={touched.driveInDoors && !errors.driveInDoors && values.driveInDoors !== ""}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.driveInDoors}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Loading Docks <span className="font-weight-light">(optional)</span></Form.Label>
                    <Form.Control
                        id="general_edit_loading_docks"
                        name="loadingDocks"
                        type="text"
                        value={values.loadingDocks}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.loadingDocks}
                        isValid={touched.loadingDocks && !errors.loadingDocks && values.loadingDocks !== ""}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.loadingDocks}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Floors <span className="font-weight-light">(optional)</span></Form.Label>
                    <Form.Control
                        id="general_edit_floors"
                        name="floors"
                        type="text"
                        value={values.floors}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.floors}
                        isValid={touched.floors && !errors.floors && values.floors !== ""}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.floors}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            </Form>
            <Form>
            <Row>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Ceiling Height <span className="font-weight-light">(optional)</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            id="general_edit_ceiling_height"
                            name="ceilingHeight"
                            type="text"
                            value={values.ceilingHeight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.ceilingHeight}
                            isValid={touched.ceilingHeight && !errors.ceilingHeight && values.ceilingHeight !== ""}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>ft</InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            {errors.ceilingHeight}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Taxes <span className="font-weight-light">(optional)</span></Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            id="general_edit_taxes"
                            name="taxes"
                            type="text"
                            value={values.taxes}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.taxes}
                            isValid={touched.taxes && !errors.taxes && values.taxes !== ""}
                            disabled={isSubmitting}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>/ yr</InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            {errors.taxes}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Nets <span className="font-weight-light">(optional)</span></Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            id="general_edit_nets"
                            name="nets"
                            type="text"
                            value={values.nets}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.nets}
                            isValid={touched.nets && !errors.nets && values.nets !== ""}
                            disabled={isSubmitting}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>/ mo</InputGroup.Text>
                        </InputGroup.Append>
                        <Form.Control.Feedback type="invalid">
                            {errors.nets}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            </Form>
            <Form>
            <Row>
                { hideForNow ?
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Property Type <span className="font-weight-light">(optional)</span></Form.Label>
                    <Form.Control
                        id="general_edit_property_type"
                        name="propertyType"
                        as="select"
                        value={values.propertyType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option key="-1"></option>
                        {this.props.propertyTypes.map((propertyType, index) => (
                        <option key={index}>{propertyType}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                : null }
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Zone <span className="font-weight-light">(optional)</span></Form.Label>
                    <Form.Control
                        id="general_edit_zone"
                        name="zone"
                        type="text"
                        value={values.zone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.zone}
                        isValid={touched.zone && !errors.zone && values.zone !== ""}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.zone}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label className="font-weight-bold">Building Class <span className="font-weight-light">(optional)</span></Form.Label>
                    <Form.Control
                        id="general_edit_building_class"
                        name="buildingClass"
                        type="text"
                        value={values.buildingClass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.buildingClass}
                        isValid={touched.buildingClass && !errors.buildingClass && values.buildingClass !== ""}
                        disabled={isSubmitting}
                    />
                </Form.Group>
            </Row>
            </Form>

        </Form>
        </Modal.Body>
        <Modal.Footer>
            {this.props.errorMessage ?
            <ErrorAlert
                errorMessage={this.props.errorMessage}
            />
            : null}
            { dirty ?
            <Button
                id="general_edit_cancel_button" 
                onClick={this.props.onHide}
            >
                Discard Changes
            </Button>
            :
            <Button
                id="general_edit_cancel_button"
                onClick={this.props.onHide}
            >
                Cancel
            </Button>
            }
            <Button
                disabled={(!(isValid && dirty) || isSubmitting)} 
                id="general_edit_save_button"
                onClick={handleSubmit}
            >
                { this.props.saving ?
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                :
                <span>Save</span>
                }
            </Button>
        </Modal.Footer>
    </Modal>
    )}
    </Formik> 
    );
    }

}

export default ListingEditGeneral;
