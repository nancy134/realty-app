import React from 'react';

import {
    Row,
    Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlus,
    faPencilAlt,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import ListingEditTenant from './ListingEditTenant';
import {formatDate} from '../helpers/utilities';

function TenantItem(props){
    var tenant = props.tenant;
    var leaseEnds;
    if (tenant.leaseEnds && tenant.leaseEnds !== ""){
        leaseEnds = formatDate(tenant.leaseEnds);
    }
    return(
            <Row key={tenant.id}>
                <Col md={3}>{tenant.tenant}</Col>
                <Col md={2}>{tenant.space} sf</Col>
                <Col md={2}>${tenant.baseRent}/mo</Col>
                <Col md={3}>{leaseEnds}</Col>
                <Col md={2}>
                    <Row>
                        { props.editMode === "edit" ?
                        <Col>
                            <EditButton
                                listing={props.listing}
                                index={props.index}
                                tenantUpdateIndex={props.tenantUpdateIndex}
                                tenant={props.tenant}
                                onSave={props.onSave}
                                onShow={props.onShow}
                                onHide={props.onHide}
                                errorMessage={props.errorMessage}
                                show={props.show}
                                saving={props.saving}
                            />
                        </Col>
                        : null }
                        { props.editMode === "edit" ?
                        <Col><FontAwesomeIcon className="text-danger" size="xs" icon={faTrash} /></Col>
                        : null }
                    </Row>
                </Col>
            </Row>
    );
}


function AddButton(props) {
    return (
        <span>
            <span
                id="tenant_add_button"
                onClick={() => {props.onShow()}}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />
            </span>
            {props.show ?
            <ListingEditTenant
                title="Add New Tenant"
                listing={props.listing}
                index={props.index}
                tenant={props.tenant}
                show={props.show}
                onHide={props.onHide}
                onSave={listing => props.onSave(listing)}
                errorMessage={props.errorMessage}
                saving={props.saving}
            />
            : null}
        </span>
  );
}

function EditButton(props){
    var tenant = props.tenant;
    if (props.listing){
        tenant = props.listing.tenants[props.tenantUpdateIndex];
   }
    return(
        <span>
            <span
                id="tenant_edit_button"
                onClick={() => {props.onShow(props.index)}}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            { props.show ?
            <ListingEditTenant
                listing={props.listing}
                tenant={tenant}
                show={props.show}
                onHide={props.onHide}
                onSave={listing => props.onSave(listing)}
                errorMessage={props.errorMessage}
                saving={props.saving}
            />
            : null}
        </span>
    );
}
class ListingDetailTenants extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(tenant){
        this.props.onTenantUpdate(tenant);
    }
    render(){
       var listing = this.props.listing;
       var editMode = this.props.editMode;
       var newTenant = {};
       
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Tenants 
                        {editMode === "edit" ? 
                        <AddButton 
                            listing={listing} 
                            tenant={newTenant} 
                            onSave={this.handleSave}
                            onShow={this.props.onTenantModalNew}
                            onHide={this.props.onTenantModalHide}
                            errorMessage={this.props.tenantError}
                            show={this.props.tenantNew}
                            saving={this.props.tenantSaving}
                        /> 
                        : null}
                    </h2>
                </Col>
            </Row>
            <Row className="bg-light shadow">
                <Col md={3} className="font-weight-bold">Tenant</Col>
                <Col md={2} className="font-weight-bold">Square Feet</Col>
                <Col md={2} className="font-weight-bold">Base Rent</Col>
                <Col md={3} className="font-weight-bold">Lease Ends</Col>
                <Col md={2}></Col>
            </Row>
            {!listing ? <div></div> :
            listing.tenants.map((tenant, index) => 
            (
            <TenantItem
                key={index}
                listing={listing}
                index={index}
                tenantUpdateIndex={this.props.tenantUpdateIndex}
                tenant={tenant}
                onSave={this.handleSave}
                onShow={this.props.onTenantModalUpdate}
                onHide={this.props.onTenantModalHide}
                errorMessage={this.props.tenantError}
                show={this.props.tenantUpdate}
                saving={this.props.tenantSaving}
                editMode={editMode}
            />
            ))}
        </React.Fragment>
        );
    }
}
export default ListingDetailTenants;
