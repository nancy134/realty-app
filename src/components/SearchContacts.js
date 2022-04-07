import React  from 'react';
import {
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import contactService from '../services/contacts';
import ContactAddModal from '../components/ContactAddModal';
import GroupAddModal from '../components/GroupAddModal';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function GroupList(props){

    var options = [];
    for (var i=0; i<props.groups.length; i++){
        var group = props.groups[i];
        if (group.id === props.selectedGroup){
            options.push(<option key={i} value={group.id} selected={true}>{group.name}</option>);
        } else {
            options.push(<option key={i} value={group.id}>{group.name}</option>);
        }
    }
    return(
        <Form.Control
            as="select"
            onChange={props.handleSelectGroup}
        >
            {options}
        </Form.Control>
    );
}

class SearchContacts extends React.Component {

    tableRef = React.createRef();

    constructor(props){
        super(props);

        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleSaveContact = this.handleSaveContact.bind(this);
        this.handleHideContact = this.handleHideContact.bind(this);
        this.handleSaveGroup = this.handleSaveGroup.bind(this);
        this.handleShowGroupModal = this.handleShowGroupModal.bind(this);
        this.handleHideGroupModal = this.handleHideGroupModal.bind(this);
        this.getContacts = this.getContacts.bind(this);
        this.handleShowSelectGroupModal = this.handleShowSelectGroupModal.bind(this);
        this.handleHideSelectGroupModal = this.handleHideSelectGroupModal.bind(this);
        this.handleSaveSelectedGroups = this.handleSaveSelectedGroups.bind(this);
        this.handleSelectGroup = this.handleSelectGroup.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleImport = this.handleImport.bind(this);

        this.state = {
            contacts: [],
            showContactAdd: false,
            showSelectGroupModal: false,
            selectedGroups: [],
            files: []
        }
    }

    getContacts(query){
        var that = this;
        return new Promise(function(resolve, reject){
            that.props.getContacts(query).then(function(result){
                resolve(result);
            }).catch(function(err){
                reject(err);
            });
        });
    }

    componentDidMount(){

    }

    handleSelectGroup(e){
        var that = this;
        this.props.onSelectGroup(e.target.value);
        sleep(250).then(function(result){
            that.tableRef.current.onQueryChange();
        }).catch(function(err){
            console.log(err);
        });
    }

    handleSelectionChange(rows){
        this.props.onContactsSelected(rows);
    }
    handleAddContact(){
        this.setState({
            showContactAdd: true,
            selectedGroups: []
        });
    }
    handleSaveContact(contact){
        var that = this;
        contactService.createContact(contact).then(function(result){
            var clientGroups = [];

            if (that.state.selectedGroups.length > 0){
                for (var i=0; i<that.state.selectedGroups.length; i++){
                    var body = {
                        ClientId: result.id,
                        GroupId: that.state.selectedGroups[i].id
                    };
                    var clientGroup = contactService.createClientGroup(body);
                    clientGroups.push(clientGroup);
                }
            } else if (that.props.selectedGroup > 0){
                body = {
                    ClientId: result.id,
                    GroupId: that.props.selectedGroup
                }
                clientGroup = contactService.createClientGroup(body);
                clientGroups.push(clientGroup);
            }

            Promise.all(clientGroups).then(function(values){
                that.tableRef.current.onQueryChange()
                that.setState({
                    showContactAdd: false,
                    selectedGroups: []
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    handleSaveGroup(group){
        var that = this;
        this.props.onAddGroup(group);
        sleep(250).then(function(result){
            that.tableRef.current.onQueryChange();
        }).catch(function(err){
            console.log(err);
        });
    }

    handleHideContact(){
        this.setState({
            showContactAdd: false
        });
    }

    handleShowGroupModal(){
        this.props.onShowAddGroup();
    }

    handleHideGroupModal(){
        this.props.onHideAddGroup();
    }

    handleShowSelectGroupModal(){
        this.setState({
            showSelectGroupModal: true 
        });
    }

    handleHideSelectGroupModal(){
        this.setState({
            showSelectGroupModal: false
        });
    }

    handleSaveSelectedGroups(groups){
        this.setState({
            selectedGroups: groups,
            showSelectGroupModal: false
        });
    }

    handleFileSelect(e){
        this.setState({
            files: e.target.files
        });
    }

    handleImport(){
        var that = this;
        if (this.state.files.length > 0){
            contactService.clientUpload(this.props.selectedGroup, this.state.files[0]).then(function(result){
                that.tableRef.current.onQueryChange();
            }).catch(function(err){
                console.log(err);
            });
        }
    }

    render(){
        return(
            <React.Fragment>
                { this.props.showAddGroup ?
                <GroupAddModal
                    show={this.props.showAddGroup}
                    onHide={this.props.onHideAddGroup}
                    onSave={this.handleSaveGroup}
                />
                : null }

                { this.state.showContactAdd ?
                <ContactAddModal
                    show={this.state.showContactAdd}
                    user={this.props.user}
                    onSave={this.handleSaveContact}
                    onHide={this.handleHideContact}
                    onSaveGroup={this.handleSaveGroup}
                    onShowGroupModal={this.props.onShowAddGroup}
                    onHideGroupModal={this.props.onHideAddGroup}
                    showGroupModal={this.props.showAddGroup}
                    groups={this.props.groups}
                    onShowSelectGroupModal={this.handleShowSelectGroupModal}
                    onHideSelectGroupModal={this.handleHideSelectGroupModal}
                    showSelectGroupModal={this.state.showSelectGroupModal}
                    onSaveSelectedGroups={this.handleSaveSelectedGroups}
                    selectedGroups={this.state.selectedGroups}
                />
                : null }
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label
                            column
                            sm={3}
                        >
                            <span>Select Group to Email</span>
                        </Form.Label>
                        <Col sm={4}>
                            <GroupList
                                selectedGroup={this.props.selectedGroup}
                                groups={this.props.groups}
                                handleSelectGroup={this.handleSelectGroup}
                            />
                        </Col>
                        <Col sm={2}>
                            <Button
                                onClick={this.handleShowGroupModal}
                            >
                                <span>Add New Group</span>
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
                { this.props.selectedGroup > 0 ?
                <MaterialTable
                    tableRef={this.tableRef}
                    icons={tableIcons}
                    actions={[{
                        icon: "add_box",
                        tooltip: "Add Contact",
                        position: "toolbar",
                        onClick: () => { this.handleAddContact();}
                    }]}
                    options={{
                        selection: false,
                        search: false
                    }}
                    onSelectionChange={(rows) => this.handleSelectionChange(rows)}
                    columns={[
                        { title: 'first', field: 'first'},
                        { title: 'last', field: 'last'},
                        { title: 'email', field: 'email'},
                        { title: 'company', field: 'company'}
                    ]}
                    data={query => this.getContacts(query)}
                    title="Contacts"
                />
                : null }
                <Form>
                    <Form.Group as={Row}>
                        <Col sm="auto">
                            <Form.File
                                label="Select CSV file to import"
                                onChange={this.handleFileSelect}
                            >
                            </Form.File>
                        </Col>
                        <Col sm="auto">
                            <Button
                                onClick={this.handleImport}
                            >
                            Import
                            </Button>

                        </Col>

                    </Form.Group>
                </Form>

            </React.Fragment>
        );
    }
}
export default SearchContacts;
