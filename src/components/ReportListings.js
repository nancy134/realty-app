import React from 'react';
import {
    ListGroup,
    Row, Col,
    Tabs,
    Tab,
    Button,
    Modal,
    Form
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import {
    faFilePdf
} from '@fortawesome/free-regular-svg-icons';
import ListingPagination from '../components/ListingPagination';
import ListingItem from '../components/ListingItem';

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

function AddNewListModal(props){
    return(
    <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
    >
        <Modal.Header>
            <Modal.Title>Add New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Label>List Name</Form.Label>
                <Form.Control
                    id="list_name"
                    name="name"
                    type="text"
                    onChange={props.onListNameChange}
                /> 
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button
                onClick={props.onHide}
            >
                Cancel
            </Button>
            <Button
                onClick={props.onAddNewList}
            >
                Create List
            </Button>
        </Modal.Footer>
    </Modal>
    );

}

class ReportListings extends React.Component {
   
    constructor(props) {
        super(props);
        this.showDetailChange = this.showDetailChange.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.handleAddNewList = this.handleAddNewList.bind(this);
        this.handleHideAddListModal = this.handleHideAddListModal.bind(this);
        this.handleListNameChange = this.handleListNameChange.bind(this);
        this.handleReportListDetail = this.handleReportListDetail.bind(this);
        this.handleReportListSummary = this.handleReportListSummary.bind(this);

        this.state = {
            showAddListModal: false
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    showDetailChange(id, arrayIndex){
        this.props.onShowDetailChange(true, id, arrayIndex);
    }
    handleListChange(listTab){
        if (listTab === "add"){
            this.setState({
                showAddListModal: true
            });
        } else {
            this.props.onReportListChange(listTab);
        }
    }
    handleAddNewList(){
        this.props.onAddNewList(this.state.listName);
        this.setState({
            showAddListModal: false
        });
    }
    handleHideAddListModal(){
        this.setState({
            showAddListModal: false
        });
    }
    handleListNameChange(event){
        this.setState({
            listName: event.target.value
        });
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
    render() {
        if (this.props.lists.length > 0){

        var listings = this.props.listItems;
        var activeKey = this.props.listId;
        var showImage = false;
        var showShortDescription = false;
        var showDeleteFromList = true;
        return (
        <div>
            <AddNewListModal
                show={this.state.showAddListModal}
                onAddNewList={this.handleAddNewList}
                onHide={this.handleHideAddListModal}
                onListNameChange={this.handleListNameChange}
            />
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
                />
                <Tab.Container>
                    <Tabs
                        className="listing-tabs pt-1 border-0"
                        id="listing-tabs"
                        activeKey={activeKey}
                        onSelect={tab => this.handleListChange(tab)}
                    >
                        {this.props.lists.map((list, index) =>
                        <Tab
                            title={list.name}
                            eventKey={list.id}
                            key={index}
                        >
                            <Tab.Content>
                            </Tab.Content>
                        </Tab>
                        )}

                        <Tab
                            title={<FontAwesomeIcon icon={faPlus}/>}
                            eventKey="add"
                        >
                            <Tab.Content>
                            </Tab.Content>
                        </Tab>
                    </Tabs>
                </Tab.Container>
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
