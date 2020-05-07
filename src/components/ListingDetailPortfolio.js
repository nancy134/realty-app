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
    return (
        <span>
            <span
                id="portfolio_add_button"
                onClick={() => {props.onShow()}}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />
            </span>
            {props.show ?
            <ListingEditPortfolio
                title="Add New Portfolio"
                listing={props.listing}
                index={props.index}
                portfolioTypes={props.portfolioTypes}
                portfolio={props.portfolio}
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
    var portfolio = props.portfolio;
    if (props.listing){
        portfolio = props.listing.portfolios[props.portfolioUpdateIndex];
    }
    return(
        <span>
            <span
                id="portfolio_edit_button"
                onClick={() => {props.onShow(props.index)}}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon icon={faPencilAlt} />
            </span>
            { props.show ?
            <ListingEditPortfolio
                title="Edit Portfolio"
                listing={props.listing}
                portfolio={portfolio}
                portfolioTypes={props.portfolioTypes}
                show={props.show}
                onHide={props.onHide}
                onSave={listing => props.onSave(listing)}
                errorMessage={props.errorMessage}
                saving={props.saving}
            />
            : null }
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
        var portfolioTypes = this.props.portfolioTypes;
        var newPortfolio = {};
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Portfolio 
                        {editMode === "edit" ? 
                        <AddButton
                            listing={listing}
                            portfolio={newPortfolio}
                            portfolioTypes={portfolioTypes}
                            onSave={this.handleSave}
                            onShow={this.props.onPortfolioModalNew}
                            onHide={this.props.onPortfolioModalHide}
                            errorMessage={this.props.portfolioError}
                            show={this.props.portfolioNew}
                            saving={this.props.portfolioSaving}
                        />
                        : null}</h2>
                </Col>
            </Row>
            <Row className="bg-light shadow">
                <Col md={3} className="font-weight-bold">Tenant</Col>
                <Col md={2} className="font-weight-bold">Building Size</Col>
                <Col md={2} className="font-weight-bold">Lot Size</Col>
                <Col md={2} className="font-weight-bold">Type</Col>
            </Row>
            {!listing ? <div></div> :
            listing.portfolios.map((portfolio, index) =>
            (
            <Row key={portfolio.id}>
                <Col md={3}>{portfolio.tenant}</Col>
                <Col md={2}>{portfolio.buildingSize}</Col>
                <Col md={2}>{portfolio.lotSize}</Col>
                <Col md={2}>{portfolio.type}</Col>
                <Col md={3}>
                    <Row>
                        { editMode === "edit" ?
                        <Col>
                            <EditButton 
                                listing={listing}
                                index={index}
                                portfolioUpdateIndex={this.props.portfolioUpdateIndex}
                                portfolio={portfolio}
                                portfolioTypes={portfolioTypes}
                                onSave={this.handleSave}
                                onShow={this.props.onPortfolioModalUpdate}
                                onHide={this.props.onPortfolioModalHide}
                                errorMessage={this.props.portfolioError}
                                show={this.props.portfolioUpdate}
                                saving={this.props.portfolioSaving}
                            /></Col>
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
