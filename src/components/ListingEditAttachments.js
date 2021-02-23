import React from 'react';
import {
    Row,
    Col,
    Modal,
    Button,
    Alert,
    Spinner,
    Image,
    Form
} from 'react-bootstrap';
import {Formik} from 'formik';
import Dropzone from './Dropzone';
import * as Yup from 'yup';

const style = {
  marginRight: '.5rem',
  marginTop: '.5rem',
  cursor: 'pointer',
  display: 'inline-block',
  height: '80px'
};

const AttachmentSchema = Yup.object().shape({
    name: Yup.string().max(15).required()
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

class ListingEditAttachments extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleAttachmentsAdded = this.handleAttachmentsAdded.bind(this);
        this.state = {
            attachmentsAdded: false,
            imagesToDelete: []
        };
    }

    handleSave(initialValues, values){
        var attachment = {};
        if (initialValues.name !== values.name){
            attachment.name=values.name;
        }
        this.props.onSave(attachment);
    }
    handleAttachmentsAdded(files){
        this.setState({attachmentsAdded: true});
        this.props.onAttachmentsAdded(files);
    }
    render(){

        var listing = this.props.listing;
        var initialValues = {
            name: ""
        };
        if (listing){
        }
        return (
        <Formik
            initialValues={initialValues}
            validationSchema={AttachmentSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                this.handleSave(initialValues, values);
                //setSubmitting(false);
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
          aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add Attachment 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                <Col>
                { !this.state.attachmentsAdded ?
                <Dropzone
                    onFilesAdded={this.handleAttachmentsAdded}
                    multiple={false}
                    label="Upload Attachment"
                />
                :
                    <span >
                        <span className="border" style={{...style}}>
                            <span className="img-wrap">
                                <Image src={"https://sabre-images.s3.amazonaws.com/OTHER.png"} className="attachment-image p-2"/>
                            </span>
                        </span>
                    </span>
                 }
                 </Col>
            </Row>

            <Form>
               <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label
                            className="font-weight-bold"
                        >Name</Form.Label>
                        <Form.Control 
                            name="name"
                            type="text"
                            value={values.name} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.name}
                            isValid={touched.name && !errors.name && values.name !== ""}
                        /> 
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                {this.props.errorMessage ?
                <ErrorAlert errorMessage={this.props.errorMessage}/>
                : null}
                { dirty ?
                <Button 
                    id="overview_edit_cancel_button"
                    onClick={this.props.onHide}
                >
                    Discard Changes
                </Button>
                :
                <Button
                    id="overview_edit_cancel_button"
                    onClick={this.props.onHide}
                >
                    Cancel
                </Button>
                }
                <Button
                    disabled={!(isValid && dirty) || !this.state.attachmentsAdded}
                    id="overview_edit_save_button"
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

export default ListingEditAttachments;
