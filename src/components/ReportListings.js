import React from 'react';
import {
    ListGroup,
    Row, Col,
    Button,
    Modal,
    Form,
    Dropdown,
    Spinner,
    Alert
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faPencilAlt,
    faShare
} from '@fortawesome/free-solid-svg-icons';
import {
    faFilePdf
} from '@fortawesome/free-regular-svg-icons';
import ListingPagination from '../components/ListingPagination';
import ListingItem from '../components/ListingItem';
import DeleteModal from '../components/DeleteModal';
import WizardShareListing from '../components/WizardShareListing';

import { Formik } from 'formik';
import * as Yup from 'yup';

const ReportSchema = Yup.object().shape({
    name: Yup.string().max(20).required()
});
function Toolbar(props){
    return(
    <div className="pt-1">
        <Row>
            <Col>
                <Button
                    size="sm"
                    onClick={props.onReportListSummary}
                >
                    <FontAwesomeIcon icon={faFilePdf} />&nbsp;Summary
                </Button>
            </Col>
            <Col>
                <Button
                    size="sm"
                    onClick={props.onReportListDetail}
                >
                    <FontAwesomeIcon icon={faFilePdf} />&nbsp;Detail
                </Button>
            </Col>
            <Col>
                <Button
                    size="sm"
                    onClick={props.onReportListShare}
                >
                    <FontAwesomeIcon icon={faShare} />&nbsp;Share
                </Button>
            </Col>

            <Col>
                <ListingPagination
                    page={props.page}
                    count={props.count}
                    perPage={props.perPage}
                    onNewPage={props.onNewPage}
                />
            </Col>
        </Row>
    </div>
    );
}

function AddListModal(props){

    var title = "Add New List";
    var buttonText = "Create List";
    if (props.dialogMode === "edit"){
        title = "Edit List Name";
        buttonText = "Update List Name"
    }

    var initialValues = {
        name: ""
    };
    if (props.listName){
        initialValues.name = props.listName
    }
    
    return(
    <Formik
        initialValues={initialValues}
        validationSchema={ReportSchema}
        onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            if (props.dialogMode === "edit"){
                props.onEditList(initialValues, values);
            } else {
                props.onAddList(initialValues, values);
            }
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
        show={props.show}
    >
        <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { props.listEror && props.listError.length > 0 ?
            <Alert
                variant="danger"
            >
                <span>{props.listError}</span>
            </Alert>
            : null }
                <Form>
                    <Form.Label>List Name</Form.Label>
                    <Form.Control
                        id="list_name"
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        isValid={touched.name && !errors.name}
                        disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                    {errors.name}
                    </Form.Control.Feedback>
                </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
                onClick={props.onHide}
            >
                Cancel
            </Button>
            <Button
                disabled={!(isValid && dirty) || isSubmitting}
                onClick={handleSubmit}
            >
                { !props.listProgress ?
                <span>{buttonText}</span>
                :
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                }
            </Button>
        </Modal.Footer>
    </Modal>
    )}
    </Formik>
    );
}

class ReportListings extends React.Component {
   
    constructor(props) {
        super(props);
        this.showDetailChange = this.showDetailChange.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.handleListNameChange = this.handleListNameChange.bind(this);

        this.handleReportListDetail = this.handleReportListDetail.bind(this);
        this.handleReportListSummary = this.handleReportListSummary.bind(this);

        this.handleAddListModalShow = this.handleAddListModalShow.bind(this);
        this.handleAddListModalHide = this.handleAddListModalHide.bind(this);
        this.handleAddList = this.handleAddList.bind(this);
        this.handleListNameChange = this.handleListNameChange.bind(this);
        this.handleEditList = this.handleEditList.bind(this);
        this.handleAddListStart = this.handleAddListStart.bind(this);
        this.handleEditListStart = this.handleEditListStart.bind(this);

        // Delete
        this.handleDeleteListModalShow = this.handleDeleteListModalShow.bind(this);
        this.handleDeleteListStart = this.handleDeleteListStart.bind(this);
        this.handleDeleteListModalHide = this.handleDeleteListModalHide.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);

        // Share
        this.handleReportListShare = this.handleReportListShare.bind(this);

        this.state = {
            listName: "",
            list: {},
            dialogMode: "add",
            deleteMessage: "",
            showShareListingWizard: false
        };
    }
    handleAddListStart(){
        this.setState({
            dialogMode: "add"
        }, () => {
            this.handleAddListModalShow();
        });

    }
    handleAddListModalShow(){
        this.props.onAddListModalShow();
    }
    handleEditListStart(list){
        this.setState({
            list: list,
            listName: list.name,
            dialogMode: "edit"
        }, () => {
            this.handleAddListModalShow();
        });
    }
    handleDeleteListStart(e, id, name){
        var deleteMessage = "Do you want to delete '"+name+"' ?";
        this.setState({
            listToDelete: id,
            deleteMessage: deleteMessage 
        }, () => {
            this.handleDeleteListModalShow();
        });
    }
    handleDeleteListModalShow(){
        this.props.onDeleteListModalShow();
    } 
    handleAddListModalHide(){
        this.setState({
            list: {},
            listName: ""
        });
        this.props.onAddListModalHide();
    }
    handleDeleteListModalHide(){
        this.setState({
            listToDelete: 0,
            deleteMessage: ""
        });
        this.props.onDeleteListModalHide();
    }
    handleAddList(initialValues, values){
        this.props.onAddList(values.name);
    }

    handleListNameChange(event){
        this.setState({
            listName: event.target.value
        });
    }
    handleEditList(initialValues, values){
        var list = {
            id: this.state.list.id,
            name: values.name
        };
        
        this.props.onEditList(list);
    }

    handleDeleteList(){
        this.props.onDeleteList(this.state.listToDelete);
    }
    showDetailChange(id, arrayIndex){
        this.props.onShowDetailChange(true, id, arrayIndex);
    }

    handleListChange(e,id){
        this.props.onReportListChange(id);
    }

    handleReportListDetail(){
        var id = this.props.listId;
        var url = 
            window.location.protocol + 
            "//" + window.location.hostname + 
            "/report/list/" + id + 
            "?reportType=detail";
        window.open(url, "_blank");
    }
    handleReportListSummary(){
        var id = this.props.listId;
        var url =
            window.location.protocol +
            "//" + window.location.hostname +
            "/report/list/" + id +
            "?reportType=summary";
        window.open(url, "_blank");
    }

    handleReportListShare(){
        this.setState({
            showShareListingWizard: true
        });
    }
    render() {
        if (this.props.lists.length > 0){

        var listings = this.props.listItems;
        var showImage = false;
        var showShortDescription = false;
        var showDeleteFromList = true;

        var selectedListName = "";
        for (var i=0; i<this.props.lists.length; i++){
            if (this.props.lists[i].id === this.props.listId){
                selectedListName = this.props.lists[i].name;
                break;
            }
        }

        return (
        <div>

            { this.state.showShareListingWizard ?
            <WizardShareListing
                listings={listings}
                start={this.state.showShareListingWizard}
                onCancel={this.props.onCancelShareWizard}
                onFinish={this.props.onFinishShareWizard}
            />
            : null }

            { this.props.showAddListModal ?
            <AddListModal
                show={this.props.showAddListModal}
                onAddList={this.handleAddList}
                onEditList={this.handleEditList}
                onHide={this.handleAddListModalHide}
                onListNameChange={this.handleListNameChange}
                listProgress={this.props.listProgress}
                listError={this.props.listError}
                list={this.state.list}
                dialogMode={this.state.dialogMode}
                listName={this.state.listName}
            />
            : null }
            { this.props.showDeleteListModal ?
            <DeleteModal
                show={this.props.showDeleteListModal}
                message={this.state.deleteMessage}
                errorMessage={this.props.listError}
                onHide={this.handleDeleteListModalHide}
                onDelete={this.handleDeleteList}
            />
            : null }
            { this.props.loggedIn ?
            <div id="stickyHeader" className="bg-white">
                <Toolbar
                    page={this.props.page}
                    count={this.props.count}
                    perPage={this.props.perPage}
                    onNewPage={this.props.onNewPage}
                    listingMode={this.props.listingMode}
                    onReportListDetail={this.handleReportListDetail}
                    onReportListSummary={this.handleReportListSummary}
                    onReportListShare={this.handleReportListShare}
                />
                <Dropdown className="pt-2">
                    <Dropdown.Toggle
                        size="sm"
                        variant="warning"
                        id="dropdown-basic"
                    >
                        <span>{selectedListName}</span> 
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        { this.props.lists.map((list, index) =>
                        <Dropdown.Item
                            onClick={(e) => this.handleListChange(e, list.id)}
                            key={index}
                        >
                            <span>{list.name}</span>
                            { this.props.lists.length > 1 ?
                            <span className="pl-1 pr-2 text-danger float-right">
                                <FontAwesomeIcon
                                    onClick={(e) => this.handleDeleteListStart(e, list.id, list.name)}
                                    size="xs"
                                    icon={faTrash}
                                />
                            </span>
                            : null }

                            <span className="pl-1 pr-2 text-danger float-right">
                                <FontAwesomeIcon
                                    onClick={() => this.handleEditListStart(list)}
                                    size="xs"
                                    icon={faPencilAlt}
                                />
                            </span>

                        </Dropdown.Item>
                        )}
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={this.handleAddListStart}>
                            <span>Add New...</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            :
            <Toolbar
                page={this.props.page}
                count={this.props.count}
                perPage={this.props.perPage}
                onNewPage={this.props.onNewPage}
                listingMode={this.props.listingMode}
            />
            }
            <div>
                <ListGroup>
                    {listings.map((listing, index) =>
                    (
                        <ListingItem
                            index={index}
                            key={listing.id}
                            listing={listing.listing.versions[0]}
                            onDelete={this.handleDelete}
                            listingMode={this.props.listingMode}
                            onItemClick={this.showDetailChange}
                            showImage={showImage}
                            showShortDescription={showShortDescription}
                            showDeleteFromList={showDeleteFromList}
                            onDeleteFromList={this.props.onDeleteFromList}
                        />
                    ))}
                </ListGroup>
                {listings.length === 0 ?
                <Alert
                    variant="primary"
                >
                    <span>Add listings from the left</span>
                </Alert>
                : null }
            </div>
        </div>

       ); 
       } else {
       return(
       <p>No listings</p>
       );
       }
    }
}
export default ReportListings;
