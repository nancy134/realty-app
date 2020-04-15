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
import ListingEditPortfolio from './ListingEditPortfolio';

function AddButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <span>
            <span
                onClick={() => setModalShow(true)}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />
            </span>
            {modalShow ?
            <ListingEditPortfolio
                listing={props.listing}
                portfolio={props.portfolio}
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
                onClick={() => setModalEditShow(true)}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            <ListingEditPortfolio
                listing={props.listing}
                portfolio={props.portfolio}
                show={modalEditShow}
                onHide={() => setModalEditShow(false)}
                onSave={listing => props.onSave(listing)}
            />
        </span>
    );
}

class ListingDetailPortfolio extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }
    handleSave(portfolio){
        this.props.onPortfolioUpdate(portfolio);
    }
    
    render(){
        var listing = this.props.listing;
        var editMode = this.props.editMode;
        var newPortfolio = {};
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Portfolio {editMode === "edit" ? <AddButton listing={listing} portfolio={newPortfolio} onSave={this.handleSave}/> : null}</h2>
                </Col>
            </Row>
            <Row className="bg-light shadow">
                <Col md={3} className="font-weight-bold">Tenant</Col>
                <Col md={2} className="font-weight-bold">Building Size</Col>
                <Col md={2} className="font-weight-bold">Lot Size</Col>
                <Col md={2} className="font-weight-bold">Type</Col>
            </Row>
            {!listing ? <div></div> :
            listing.portfolios.map(portfolio =>
            (
            <Row key={portfolio.id}>
                <Col md={3}>{portfolio.tenant}</Col>
                <Col md={2}>{portfolio.buildingSize}</Col>
                <Col md={2}>{portfolio.lotSize}</Col>
                <Col md={2}>{portfolio.type}</Col>
                <Col md={3}>
                    <Row>
                        { editMode === "edit" ?
                        <Col><EditButton listing={listing} portfolio={portfolio} onSave={this.handleSave}/></Col>
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
export default ListingDetailPortfolio;
