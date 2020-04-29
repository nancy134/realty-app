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

function AddButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <span>
            <span
                id="tenant_add_button"
                onClick={() => setModalShow(true)}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />
            </span>
            {modalShow ?
            <ListingEditTenant
                listing={props.listing}
                tenant={props.tenant}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSave={listing => props.onSave(listing)}
            />
            : null}
        </span>
  );
}

function EditButton(props){
    const [modalEditShow, setModalEditShow] = React.useState(false);
    return(
        <span>
            <span
                id="tenant_edit_button"
                onClick={() => setModalEditShow(true)}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            <ListingEditTenant
                listing={props.listing}
                tenant={props.tenant}
                show={modalEditShow}
                onHide={() => setModalEditShow(false)}
                onSave={listing => props.onSave(listing)}
            />
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
                    <h2>Tenants {editMode === "edit" ? <AddButton listing={listing} tenant={newTenant} onSave={this.handleSave}/> : null}</h2>
                </Col>
            </Row>
            <Row className="bg-light shadow">
                <Col md={3} className="font-weight-bold">Tenant</Col>
                <Col md={2} className="font-weight-bold">Square Feet</Col>
                <Col md={2} className="font-weight-bold">Base Rent</Col>
                <Col md={2} className="font-weight-bold">Lease Ends</Col>
                <Col md={3}></Col>
            </Row>
            {!listing ? <div></div> :
            listing.tenants.map(tenant =>
            (
            <Row key={tenant.id}>
                <Col md={3}>{tenant.tenant}</Col>
                <Col md={2}>{tenant.space}</Col>
                <Col md={2}></Col>
                <Col md={2}>{tenant.leaseEnds}</Col>
                <Col md={3}>
                    <Row>
                        { editMode === "edit" ?
                        <Col><EditButton listing={listing} tenant={tenant} onSave={this.handleSave}/></Col>
                        : null }
                        { editMode === "edit" ?
                        <Col><FontAwesomeIcon className="text-danger" size="xs" icon={faTrash} /></Col>
                        : null }
                    </Row>
                </Col>
            </Row>
            ))}
        </React.Fragment>
        );
    }
}
export default ListingDetailTenants;
