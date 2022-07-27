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
import listingService from '../services/listings';

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

class AdminListings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listings: []
        }
    }

    render(){
        return(
            <div>
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: 'id', field: 'id'},
                        { title: 'address', field: 'address'},
                        { title: 'city', field: 'city'},
                        { title: 'state', field: 'state'}
                    ]}


                    detailPanel={rowData => {
                        var row = rowData.rowData;
                        return (
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <strong>Listing ID:</strong> {row.ListingId}
                                </div>
                                <div className="col">
                                    <strong>Status:</strong> {row.publishStatus}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <table className="table table-striped">
                                        <tbody>
                                        <tr>
                                            <th colSpan="3">Address</th>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">{row.address}<br />{row.city}, {row.state} {row.zip}</td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3">Landlord Expenses</th>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">{row.landlordExpenses}</td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3">Tenant Expenses</th>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">{row.tenantExpenses}</td>
                                        </tr>       
                                        <tr>
                                            <th colSpan="3">Short Description</th>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">{row.shortDescription}</td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3">Long Description</th>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">{row.longDescription}</td>
                                        </tr>
                                        <tr>
                                            <th>Listing Type</th>
                                            <th>Listing Price</th>
                                            <th>Property Type/s</th>
                                        </tr>
                                        <tr>
                                            <td>{row.listingType}</td>
                                            <td>{row.listingPrice}</td>
                                            <td>{row.propertyType}/{row.propertyTypes}</td>
                                        </tr>
                                        <tr>
                                            <th>Total Building Size/Total Available Space</th>
                                            <th>Lot Size</th>
                                            <th>Taxes</th>
                                        </tr>
                                        <tr>
                                            <td>{row.totalBuildingSize}/{row.totalAvailableSpace}</td>
                                            <td>{row.lotSize}</td>
                                            <td>{row.taxes}</td>
                                        </tr>
                                        <tr>
                                            <th>Parking</th>
                                            <th>Floors</th>
                                            <th># Of Units</th>
                                        </tr>
                                        <tr>
                                            <td>{row.parking}</td>
                                            <td>{row.floors}</td>
                                            <td>{row.totalNumberOfUnits}</td>
                                        </tr>
                                        <tr>
                                            <th>Building Class</th>
                                            <th>Zone</th>
                                            <th>Year Build</th>
                                        </tr>
                                        <tr>
                                            <td>{row.buildingClass}</td>
                                            <td>{row.zone}</td>
                                            <td>{row.yearBuilt}</td>
                                        </tr>     
                                        <tr>
                                            <th>Ceiling Height</th>
                                            <th>Drive-in Doors</th>
                                            <th>Loading Docks</th>
                                        </tr>
                                        <tr>
                                            <td>{row.ceilingHeight}</td>
                                            <td>{row.driveInDoors}</td>
                                            <td>{row.loadingDocks}</td>
                                        </tr>
                                        <tr>
                                            <th>Nets</th>
                                            <th>Gross Income</th>
                                            <th>Net Income</th>
                                        </tr>
                                        <tr>
                                            <td>{row.nets}</td>
                                            <td>{row.grossIncome}</td>
                                            <td>{row.netIncome}</td>
                                        </tr>
                                        <tr>
                                            <th>Cap Rate</th>
                                            <th>Price per Sq. Foot</th>
                                            <th>Maintenance</th>
                                        </tr>
                                        <tr>
                                            <td>{row.capRate}</td>
                                            <td>{row.pricePerFoot}</td>
                                            <td>{row.maintenance}</td>
                                        </tr>
                                        <tr>
                                            <th>HVAC</th>
                                            <th>Security</th>
                                            <th>HOA Feets</th>
                                        </tr>
                                        <tr>
                                            <td>{row.hvac}</td>
                                            <td>{row.seciroty}</td>
                                            <td>{row.hoaFees}</td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3">Utilities</th>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">{row.utilities}</td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3">Amenities</th>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">{row.amenities}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <strong>Owner:</strong> {row.owner}
                                </div>       
                                <div className="col">
                                    <strong>Created:</strong> {row.createdAt}
                                </div>
                                <div className="col">
                                    <strong>Updated:</strong> {row.updatedAt}
                                </div>
                            </div>
                        </div>
                        )
                    }}

                    data={query =>
                        new Promise((resolve, reject) => {
                            var page = query.page + 1;
                            var queryStr = 'perPage='+query.pageSize+'&page='+page;
                            listingService.getListingsAdmin(queryStr).then(function(result){
                                var ret = {
                                    data: result.listings.rows,
                                    page: result.page-1,
                                    totalCount: result.listings.count
                                }
                                resolve(ret);
                            }).catch(function(err){
                                reject(err);
                            });
                        })
                    }
                    title="Listings"
                />
            </div>
        );
    }
}
export default AdminListings;
