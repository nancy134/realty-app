import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from '@material-table/core';
import {MTableToolbar} from '@material-table/core';
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
import billingService from '../services/billing';
import AdminAddPromotionCode from '../components/AdminAddPromotionCode';
import {
    Button
} from '@material-ui/core';

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

class AdminCodes extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            addPromotionCodeShow: false
        };
        this.handleAddPromotionCodeShow = this.handleAddPromotionCodeShow.bind(this);
        this.handleAddPromotionCodeCancel = this.handleAddPromotionCodeCancel.bind(this);
        this.handleAddPromotionCodeSave = this.handleAddPromotionCodeSave.bind(this);

        this.tableRef = React.createRef();
    }
    handleAddPromotionCodeShow(){
        this.setState({
            addPromotionCodeShow: true
        });
    }
    handleAddPromotionCodeCancel(){
        this.setState({
            addPromotionCodeShow: false
        });
    }
    handleAddPromotionCodeSave(state){
        console.log(state);
        var that = this;
        var body = {
            description: state.description,
            autoGenerate: state.autoGenerate,
            multiUse: state.multiUse,
            code: state.code
        };
        billingService.createPromotionCode(state.PromotionId, body).then(function(result){
            console.log(result);
            that.tableRef.current.onQueryChange();
            that.setState({
                addPromotionCodeShow: false
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    render(){
        var showTitle = false;
        return(
            <div>
                <AdminAddPromotionCode
                    show={this.state.addPromotionCodeShow}
                    onCancel={this.handleAddPromotionCodeCancel}
                    onSave={this.handleAddPromotionCodeSave}
                />
                <MaterialTable
                    tableRef={this.tableRef}
                    icons={tableIcons}
                    columns={[
                        { title: 'id', field: 'id'},
                        { title: 'Code', field: 'code'},
                        { title: 'Description', field: 'description'},
                        { title: 'Promotion', field: 'Promotion.name'},
                        { title: 'Email', field: 'user.email'}
                    ]}
                    data={query =>
                        new Promise((resolve, reject) => {
                            var page = query.page + 1;
                            var queryStr = 'perPage='+query.pageSize+'&page='+page;
                            billingService.getCodes(queryStr).then(function(result){
                                var ret = {
                                    data: result.codes.rows,
                                    page: result.page-1,
                                    totalCount: result.codes.count
                                }
                                resolve(ret);
                            }).catch(function(err){
                                reject(err);
                            });
                        })
                    }
                    components={{
                        Toolbar: props => (
                            <div>
                                <MTableToolbar {...props} />
                                <div className="pl-2">
                                    <Button
                                        variant="contained"
                                        onClick={this.handleAddPromotionCodeShow}
                                    >
                                        <span>Add Promotion Code</span>
                                    </Button>
                                </div>
                            </div>
                        )
                    }}
                    options={{
                        showTitle: showTitle,
                        search: false 
                    }}
                />
            </div>
        );
    }
}
export default AdminCodes;
