import React  from 'react';
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

class SearchContacts extends React.Component {

    tableRef = React.createRef();

    constructor(props){
        super(props);

        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.handleSaveContact = this.handleSaveContact.bind(this);
        this.handleHideContact = this.handleHideContact.bind(this);

        this.state = {
            contacts: [],
            showContactAdd: false
        }
    }
    handleSelectionChange(rows){
        this.props.onContactsSelected(rows);
    }
    handleAddContact(){
        this.setState({
            showContactAdd: true
        });
    }
    handleSaveContact(contact){
        var that = this;
        contactService.createContact(contact).then(function(result){
            that.tableRef.current.onQueryChange()
            that.setState({
                showContactAdd: false
            });
        }).catch(function(err){
        });
    }
    handleHideContact(){
        this.setState({
            showContactAdd: false
        });
    }
    render(){
        return(
            <React.Fragment>
                { this.state.showContactAdd ?
                <ContactAddModal
                    show={this.state.showContactAdd}
                    user={this.props.user}
                    onSave={this.handleSaveContact}
                    onHide={this.handleHideContact}
                />
                : null }
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
                        selection: true,
                        search: false
                    }}
                    onSelectionChange={(rows) => this.handleSelectionChange(rows)}
                    columns={[
                        { title: 'first', field: 'first'},
                        { title: 'last', field: 'last'},
                        { title: 'email', field: 'email'}
                    ]}
                    data={query =>
                        new Promise((resolve, reject) => {
                            var page = query.page + 1;
                            var queryStr = 'perPage='+query.pageSize+'&page='+page;
                            contactService.getContacts(queryStr).then(function(result){
                                
                                var ret = {
                                    data: result.clients.rows,
                                    page: result.page-1,
                                    totalCount: result.clients.count
                                }
                                resolve(ret);
                            }).catch(function(err){
                                reject(err);
                            });
                        })
                    }
                    title="Contacts"
                />
            </React.Fragment>
        );
    }
}
export default SearchContacts;
