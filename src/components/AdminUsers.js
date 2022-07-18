import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from '@material-table/core';
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
import userService from '../services/users';
import {
} from 'react-bootstrap';

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

class AdminUsers extends React.Component {
    render(){
        return(
            <div
            >
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        
                        { title: 'ID', field: 'id' },
                        { title: 'Email', field: 'email'},
                        { title: 'CognitoId', field: 'cognitoId'},
                        { title: 'First', field: 'first'},
                        { title: 'Last', field: 'last'}
                    ]}
                    options={{
                      }}
                    detailPanel={rowData => {
                        return (

<div class="container">
    <div class="row">
        <div class="col">
            <table class="table table-striped">
                <tr>
                    <th>Association</th>
                    <th>Association Status</th>
                    <th>Association Token</th>
                </tr>
                <tr>
                    <td>{rowData.AssociationId}</td>
                    <td>{rowData.associationStatus}</td>
                    <td>{rowData.associationToken}</td>
                </tr>
                <tr>
                    <th>Title</th>
                    <th colspan="2">Company</th>
                </tr>
                <tr>
                    <td>{rowData.title}</td>
                    <td colspan="2">{rowData.company}</td>
                </tr>

                <tr>
                    <th colspan="3">Address</th>
                </tr>

                <tr>
                    <td colspan="3">{rowData.address1} {rowData.address1}<br />{rowData.city}, {rowData.state} {rowData.zip}</td>
                </tr>
            </table>
        </div>
        <div class="col">
            <table class="table table-striped">
                <tr>
                    <th>Website</th>
                    <th>Phone (Mobile)</th>
                    <th>Phone (Office)</th>
                </tr>
                <tr>
                    <td>{rowData.website}</td>
                    <td>{rowData.mobilePhone}</td>
                    <td>{rowData.officePhone}</td>
                </tr>
                <tr>
                    <th colspan="3">Bio</th>
                </tr>

                <tr>
                    <td colspan="3">{rowData.bio}</td>
                </tr>
            </table>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <strong>Role:</strong> {rowData.role}
        </div>
        <div class="col">
            <strong>Account Created:</strong> {rowData.createdAt}
        </div>
        <div class="col">
            <strong>Account Updated:</strong> {rowData.updatedAt}
        </div>
    </div>
</div>
                              
                        )
                      }}

                      onSelectionChange={rows => {
                        alert("Selected id is:  " + rows[0].id);
                      }}

                    data={query =>
                        new Promise((resolve, reject) => {
                            var page = query.page + 1;
                            var queryStr = 'perPage='+query.pageSize+'&page='+page;
                            userService.getUsers(queryStr).then(function(result){
                                console.log(result);
                                var ret = {
                                    data: result.users.rows,
                                    page: result.page-1,
                                    totalCount: result.users.count
                                };
                                resolve(ret);
                            }).catch(function(err){
                                console.log(err);
                                reject(err);
                            });
                        })
                    }
                    title="Users"
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                />  
            </div>
        )
    }
}
export default AdminUsers;
