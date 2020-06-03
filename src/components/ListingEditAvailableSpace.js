import React from 'react';
import {
    Row,
    Col,
    Form,
    InputGroup,
    Modal,
    Alert,
    Spinner,
    Button,
    Accordion,
    Card,
    Image
} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {formatDate} from '../helpers/utilities';
import ImageUpload from './ImageUpload';

const SpaceSchema = Yup.object().shape({
    unit: Yup.string().required('Unit Name is required'),
    size: Yup.number().integer().typeError('Must be an integer'),
    price: Yup.number().typeError('Must be a number'),
    driveInDoors: Yup.number().integer().typeError('Must be an integer'),
    floors: Yup.number().integer().typeError('Must be an integer'),
    divisible: Yup.string(),
    loadingDocks: Yup.number().integer().typeError('Must be an integer'),
    leaseTerm: Yup.string(),
    ceilingHeight: Yup.number().typeError('Must be a number'),
    availableDate: Yup.date().typeError('Must be a date'),
    nets: Yup.number().typeError('Must be a number'),
    class: Yup.string()
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

class ListingEditAvailableSpace extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(initialValues, values){
        var space = {};
        if (this.props.space) space.id = this.props.space.id;
        if (this.props.listing) space.ListingVersionId = this.props.listing.id;

        if (initialValues.unit !== values.unit){
            space.unit = values.unit;
        }
        if (initialValues.size !== values.size){
            space.size = values.size;
        }
        if (initialValues.price !== values.price){
            space.price = values.price;
        }
        if (initialValues.type !== values.type){
            space.type = values.type;
        }
        if (initialValues.use !== values.use){
            space.use = values.use;
        }
        if (initialValues.description !== values.description){
            space.description = values.description;
        }
        if (initialValues.driveInDoors !== values.driveInDoors){
            space.driveInDoors = values.driveInDoors;
        }
        if (initialValues.floors !== values.floors){
            space.floors = values.floors;
        }
        if (initialValues.divisible !== values.divisible){
            space.divisible = values.divisible;
        }
        if (initialValues.loadingDocks !== values.loadingDocks){
            space.loadingDocks = values.loadingDocks;
        }
        if (initialValues.leaseTerm !== values.leaseTerm){
            space.leaseTerm = values.leaseTerm;
        }
        if (initialValues.ceilingHeight !== values.ceilingHeight){
            space.ceilingHeight = values.ceilingHeight;
        }
        if (initialValues.availableDate !== values.availableDate){
            space.availableDate = values.availableDate;
        }
        if (initialValues.nets !== values.nets){
            space.nets = values.nets;
        }
        if (initialValues.class !== values.class){
            space.class = values.class;
        }

        this.props.onSave(space);
    }
    render(){

        const space = this.props.space;
        var initialValues = {
            unit: "",
            size: "",
            price: "",
            type: "",
            use: "",
            description: "",
            driveInDoors: "",
            floors: "",
            divisible: "",
            loadingDocks: "",
            leaseTerm: "",
            ceilingHeight: "",
            availableDate: "",
            nets: "",
            class: ""
        };
        if (space){
            if (space.unit) initialValues.unit = space.unit;
            if (space.size) initialValues.size = space.size;
            if (space.price) initialValues.price = space.price;
            if (space.type) initialValues.type = space.type;
            if (space.use) initialValues.use = space.use;
            if (space.description) initialValues.description = space.description;
            if (space.driveInDoors) initialValues.driveInDoors = space.driveInDoors;
            if (space.floors) initialValues.floors = space.floors;
            if (space.divisible) initialValues.divisible = space.divisible;
            if (space.loadingDocks) initialValues.loadingDocks = space.loadingDocks;
            if (space.leaseTerm) initialValues.leaseTerm = space.leaseTerm;
            if (space.ceilingHeight) initialValues.ceilingHeight = space.ceilingHeight;
            if (space.availableDate) initialValues.availableDate = space.availableDate;
            if (space.nets) initialValues.nets = space.nets;
            if (space.class) initialValues.class = space.class;
        }
        var images = [];
        if (space && space.images) images = space.images;

        if (initialValues.availableDate !== ""){
            initialValues.availableDate = formatDate(initialValues.availableDate);
        }
        var imgs = [];
        if (space && space.images){
            imgs = space.images.map((item,key) =>
                <Image key={key} src={item.url} className="edit-image p-2"/>
            );
        }
        var showImages = false;
        return (
        <Formik
            initialValues={initialValues}
            validationSchema={SpaceSchema}
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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop='static'
            >   
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Available Space Edit 
                    </Modal.Title>
                </Modal.Header>                    
                <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Unit Name</Form.Label>
                                <Form.Control 
                                    id="space_edit_unit"
                                    name="unit"
                                    type="text"
                                    value ={values.unit} 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={!!errors.unit}
                                    isValid={touched.unit && !errors.unit && values.unit !== ""}
                                    disabled={isSubmitting}
                                /> 
                                <Form.Control.Feedback type="invalid">
                                    {errors.unit}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Size</Form.Label>
                                <InputGroup>
                                    <Form.Control 
                                        id="space_edit_size"
                                        name="size"
                                        type="text"
                                        value={values.size} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.size}
                                        isValid={touched.size && !errors.size && values.size !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text id="basic-addon2">sf</InputGroup.Text>
                                    </InputGroup.Append>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.size}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Price</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>$</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control 
                                        id="space_edit_price"
                                        name="price"
                                        type="text"
                                        value={values.price} 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.price}
                                        isValid={touched.price && !errors.price && values.price !== ""}
                                        disabled={isSubmitting}
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text>sf/yr</InputGroup.Text>
                                    </InputGroup.Append>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Lease Type</Form.Label>
                                <Form.Control 
                                    id="space_edit_type"
                                    name="type"
                                    as="select" 
                                    value={values.type} 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={isSubmitting}
                                   
                                >
                                    <option key="-1"></option>
                                    {this.props.spaceTypes.map((spaceType, index) => ( 
                                        <option key={index}>{spaceType}</option>
                                    ))}
                                </Form.Control> 
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Use</Form.Label>
                                <Form.Control 
                                    id="space_edit_use"
                                    name="use"
                                    as="select" 
                                    value={values.use} 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <option key="-1"></option>
                                    {this.props.spaceUses.map((spaceUse, index) =>(
                                    <option key={index}>{spaceUse}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    id="space_edit_description"
                                    name="description"
                                    as="textarea" 
                                    rows="5" 
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
                            <Accordion className="w-100">
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            Additional Parameters 
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                        <div className="m-2">
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                    <Form.Label>Drive in Doors</Form.Label>
                                                    <Form.Control
                                                        id="space_edit_driveInDoors"
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
                                                    <Form.Label>Floors</Form.Label>
                                                    <Form.Control
                                                        id="space_edit_floors"
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
                                                <Form.Group as={Col}>
                                                    <Form.Label>Divisible</Form.Label>
                                                    <Form.Control
                                                        id="space_edit_divisible"
                                                        name="divisible"
                                                        as="select"
                                                        value={values.divisible}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={!!errors.divisible}
                                                        isValid={touched.divisible && !errors.divisible && values.divisible !== ""}
                                                        disabled={isSubmitting}
                                                    >
                                                        <option key="-1"></option>
                                                        {this.props.spaceDivisibles.map((spaceDivisible, index) =>(
                                                        <option key={index}>{spaceDivisible}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                    <Form.Label>Loading Docks</Form.Label>
                                                    <Form.Control
                                                        id="space_edit_loadingDocks"
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
                                                    <Form.Label>Lease Term</Form.Label>
                                                    <Form.Control
                                                        id="space_edit_leaseTerm"
                                                        name="leaseTerm"
                                                        type="text"
                                                        value={values.leaseTerm}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={!!errors.leaseTerm}
                                                        isValid={touched.leaseTerm && !errors.leaseTerm && values.leaseTerm !== ""}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.leaseTerm}
                                                    </Form.Control.Feedback>

                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Label>Ceiling Height</Form.Label>
                                                    <Form.Control
                                                        id="space_edit_ceilingHeight"
                                                        name="ceilingHeight"
                                                        type="text"
                                                        value={values.ceilingHeight}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={!!errors.ceilingHeight}
                                                        isValid={touched.ceilingHeight && !errors.ceilingHeight && values.ceilingHeight !== ""}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.ceilingHeight}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                    <Form.Label>Available Date</Form.Label>
                                                    <Form.Control
                                                        id="space_edit_availableDate"
                                                        name="availableDate"
                                                        type="text"
                                                        value={values.availableDate}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={!!errors.availableDate}
                                                        isValid={touched.availableDate && !errors.availableDate && values.availableDate !== ""}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.availableDate}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Label>Nets</Form.Label>
                                                    <Form.Control
                                                        id="space_edit_nets"
                                                        name="nets"
                                                        type="text"
                                                        value={values.nets}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={!!errors.nets}
                                                        isValid={touched.nets && !errors.nets && values.nets !== ""}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.nets}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Label>Class</Form.Label>
                                                    <Form.Control
                                                        id="space_edit_class"
                                                        name="class"
                                                        type="text"
                                                        value={values.class}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={!!errors.class}
                                                        isValid={touched.class && !errors.class && values.class !== ""}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.class}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Form.Row>

                                        </div>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Form.Row>
                        {showImages ?
                        <Form.Row>
                            <Accordion className="w-100">
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                            Images
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="2">
                                        <div className="m-2">
                                            <Row>

                                                <ImageUpload 
                                                    id="overview_edit_image_upload"
                                                    images={images} 
                                                    listing={this.props.listing} 
                                                    onImageUploadFinished={this.onImageUploadFinished}
                                                    onFilesAdded={this.handleFilesAdded}
                                                    files={this.props.files}
                                                    uploading={this.props.uploading}
                                                    uploadProgress={this.props.uploadProgress}
                                                    successfullUploaded={this.props.successfullUploaded}
                                                />
                                            </Row>
                                            <Row>
                                                {imgs}
                                            </Row>
                                        </div>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Form.Row>
                        : null}
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
                        id="space_button_save"
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

export default ListingEditAvailableSpace;
