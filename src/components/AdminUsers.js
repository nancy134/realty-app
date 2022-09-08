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
                    detailPanel={[{
                        render: rowData => {
                        var row = rowData.rowData;
                        var optout = "No";
                        if (row.optout) optout = "Yes"
                        return (
<div className="container">
    <div className="row">
        <div className="col">
            <table className="table table-striped">
                <tbody> 
                <tr>
                    <th>Association</th>
                    <th>Association Status</th>
                    <th>Association Token</th>
                </tr>
                <tr>
                    <td>{row.AssociationId}</td>
                    <td>{row.associationStatus}</td>
                    <td>{row.associationToken}</td>
                </tr>
                <tr>
                    <th>Title</th>
                    <th colSpan="2">Company</th>
                </tr>
                <tr>
                    <td>{row.title}</td>
                    <td colSpan="2">{row.company}</td>
                </tr>

                <tr>
                    <th colSpan="3">Address</th>
                </tr>

                <tr>
                    <td colSpan="3">{row.address1} {row.address2}<br />{row.city}, {row.state} {row.zip}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div className="col">
            <table className="table table-striped">
                <tbody>
                <tr>
                    <th>Website</th>
                    <th>Phone (Mobile)</th>
                    <th>Phone (Office)</th>
                </tr>
                <tr>
                    <td>{row.website}</td>
                    <td>{row.mobilePhone}</td>
                    <td>{row.officePhone}</td>
                </tr>
                <tr>
                    <th colSpan="3">Bio</th>
                </tr>

                <tr>
                    <td colSpan="3">{row.bio}</td>
                </tr>
                <tr>
                    <th>Opt Out</th>
                </tr>
                <tr>
                    <td>{optout}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div className="row">
        <div className="col">
            <strong>Role:</strong> {row.role}
        </div>
        <div className="col">
            <strong>Account Created:</strong> {row.createdAt}
        </div>
        <div className="col">
            <strong>Account Updated:</strong> {row.updatedAt}
        </div>
    </div>
</div>
                              
                        )
                      }}]}

                      onSelectionChange={rows => {
                        alert("Selected id is:  " + rows[0].id);
                      }}

                    data={query =>
                        new Promise((resolve, reject) => {
                            var page = query.page + 1;
                            var queryStr = 'perPage='+query.pageSize+'&page='+page;
                            userService.getUsers(queryStr).then(function(result){
                                var ret = {
                                    data: result.users.rows,
                                    page: result.page-1,
                                    totalCount: result.users.count
                                };
                                resolve(ret);
                            }).catch(function(err){
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
