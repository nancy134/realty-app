import React from 'react';
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
import billingService from '../services/billing';

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

class AdminBilling extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            billingEvents: [],
            billingCycles: [],
            selectedBillingCycle: 0
        }

        this.handleBillingCycleSelect = this.handleBillingCycleSelect.bind(this);
        this.handleBillingCycleCalculate = this.handleBillingCycleCalculate.bind(this);
    }

    componentDidMount(){
        var that = this;
        billingService.getBillingCycles().then(function(billingCycles){
            var billingCycleRows = billingCycles.billingCycles.rows;
            var selectedValue = 0;
            if (billingCycleRows.length > 0){
                selectedValue = billingCycleRows[0].id;
            }
            billingService.getBillingEvents(selectedValue).then(function(billingEvents){
                that.setState({
                    billingEvents: billingEvents.billingEvents.rows,
                    billingCycles: billingCycleRows,
                    selectedBillingCycle: selectedValue
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    handleBillingCycleCalculate(){
        billingService.playBillingCycle(this.state.selectedBillingCycle).then(function(result){
            console.log(result);
        }).catch(function(err){
            console.log(err);
        });
    }
    handleBillingCycleSelect(e){
        this.setState({
            selectedBillingCycle: e.target.value
        });
    }
    render(){
        var billingCycles = [];
        billingCycles = this.state.billingCycles.map((item, key) =>
            <option
                key={key}
                value={item.id}
            >
                {item.startDate} - {item.endDate}
            </option>
        );

        return(
            <div>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label 
                            column
                            sm={2}
                        >
                            <span>Billing Cycles</span>
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                as="select"
                                onChange={this.handleBillingCycleSelect}
                            >
                                {billingCycles}
                            </Form.Control>
                        </Col>
                        <Col sm={2}>
                            <Button
                                onClick={this.handleBillingCycleCalculate}
                            >
                                <span>Run Calculation</span>
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: 'Listing', field: 'ListingId'},
                        { title: 'Days on Market', field: 'daysOnMarket'},
                        { title: 'Cost', field: 'cost'}
                    ]}
                    data={this.state.billingEvents}
                    title="Listings"
                />
            </div>
        );
    }
}
export default AdminBilling;
