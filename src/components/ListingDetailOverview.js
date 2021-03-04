import React from 'react';
import {
    Row,
    Col,
    Spinner
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import ListingEditOverview from './ListingEditOverview';
import ImageGallery from 'react-image-gallery';
//import './image-gallery.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import { abbrState } from '../helpers/utilities';

function PropertyTypeList(props){

    var items = [];
    for (var i=0; i<props.propertyTypes.length; i++){
        if (i !== 0)
            items.push(<span key={i}>, {props.propertyTypes[i]} </span>);
        else
            items.push(<span key={i}>{props.propertyTypes[i]}</span>);
    }
    return(items);
}

function EditButton(props) {
    return (
        <span>
           {props.showSpinner ?
            <span
                id="overview_spinner" 
                className="edit-button align-top text-danger"
            >
                <Spinner animation="border" size="sm"/>
            </span>
            : null}
            {!props.showSpinner ?
            <span
                id="overview_edit_button"
                onClick={() => props.onShow()}
                className="edit-button text-danger"
            >

                <FontAwesomeIcon size="xs" icon={faPencilAlt} />&nbsp;Edit Overview & Image
            </span>
            : null}
            {props.show ?
            <ListingEditOverview
                listing = {props.listing}
                listingTypes = {props.listingTypes}
                propertyTypes={props.propertyTypes}
                getListing={props.getListing}
                onFilesAdded={props.onFilesAdded}
                files={props.files}
                uploading={props.uploading}
                uploadProgress={props.uploadProgress}
                successfullyUploaded={props.successfullyUploaded}
                onSave={listing => props.onSave(listing)}

                show={props.show}
                onHide={props.onHide}
                saving={props.saving}
                errorMessage={props.errorMessage}

                onImagesChanged={props.onImagesChanged}
            />
            : null}
        </span>
    );
}

class ListingDetailOverview extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        this.renderLeftNav = this.renderLeftNav.bind(this);
        this.renderRightNav = this.renderRightNav.bind(this);
        this.getListing = this.getListing.bind(this);
    }
    handleEdit(){
    }
    handleSave(listing){
        this.props.onOverviewUpdate(listing);
    }
    handleFilesAdded(files){
        this.props.onFilesAdded(files);
    }
    renderLeftNav(onClick, disabled){
        return(
        <button
          type="button"
          className="image-gallery-icon image-gallery-left-nav"
          disabled={disabled}
          onClick={onClick}
          aria-label="Previous Slide"
        >
          <FontAwesomeIcon size="3x" icon={faChevronLeft} />
        </button>
        );
    }
    renderRightNav(onClick, disabled){
        return(
        <button
          type="button"
          className="image-gallery-icon image-gallery-right-nav"
          disabled={disabled}
          onClick={onClick}
          aria-label="Next Slide"
        > 
          <FontAwesomeIcon size="3x" icon={faChevronRight} />
        </button>
        );
    }
    getListing(){
        this.props.getListing();
    }
    render() {
        var shortDescription = "Lorem.";
        var longDescription = "Lorem ipsum.";
        var defaultImage = {
            original: "/default.jpg"
        };
        var listingType = "For Lease";
        var galleryImages = [];
        var listingPrice = "";
        if (this.props.listing){
            shortDescription = this.props.listing.shortDescription;
            longDescription = this.props.listing.longDescription;
            if (this.props.listing.images.length > 0){
                for (var i=0; i<this.props.listing.images.length; ++i){
                  var galleryImage = {
                      original: this.props.listing.images[i].url
                  };
                  galleryImages.push(galleryImage);
              }
            }
            listingType = this.props.listing.listingType;
            var floatPrice = parseFloat(this.props.listing.listingPrice);
            listingPrice = floatPrice.toLocaleString(undefined, {maximumFractionDigits:0});
        }

        var hasImages = true;
        if (galleryImages.length === 0){
            hasImages = false;
            galleryImages.push(defaultImage);
        }
        const listing = this.props.listing;
        const editMode = this.props.editMode;
        const listingTypes = this.props.listingTypes;
        const propertyTypes = this.props.propertyTypes;

        var stateAbbr = abbrState(listing.state, 'abbr');
        var title = listing.address + ", " + listing.city + ", "+stateAbbr+ " " +listing.zip;
        return (
            <div className="m-4 shadow border">
                <Row className="mt-2 ml-0 mr-0">
                    <Col>
	                <h4>{title} {editMode === "edit" ? 
                            <EditButton 
                                listing={listing} 
                                listingTypes={listingTypes} 
                                propertyTypes={propertyTypes}
                                onSave={this.handleSave} 
                                getListing={this.props.getListing}
                                onFilesAdded={this.handleFilesAdded}
                                files={this.props.files}
                                uploading={this.props.uploading}
                                uploadProgress={this.props.uploadProgress}
                                successfullyUploaded={this.props.successfullyUploaded}
                                showSpinner={this.props.showSpinner}

                                onShow={this.props.onOverviewModalUpdate}
                                onHide={this.props.onOverviewModalHide}
                                show={this.props.overviewUpdate}
                                saving={this.props.overviewSaving}
                                errorMessage={this.props.errorMessage}
                                onImagesChanged={this.props.onImagesChanged}
                            /> 
                            : null}</h4>
                    </Col>
                    {listing && listing.listingPrice ?
                    <Col xs={3}>
                        <div className="text-right">
                            <h5>{listingType} ${listingPrice}</h5>
                         </div>
                    </Col>
                    :
                    <Col xs={3}>
                        <span className="text-right">
                            <h5>{listingType}</h5>
                        </span>
                    </Col>
                    }
                </Row>
                <Row className="pt-2 pb-3 ml-0 mr-0">
                    <Col md={12}>

                        <span className="image-container float-right">
                        { hasImages ?
                        <ImageGallery
                          items={galleryImages}
                          showThumbnails={false}
                          showBullets={true}
                        />
                        :
                        <ImageGallery
                          showThumbnails={false}
                          items={galleryImages}
                          showPlayButton={false}
                          showFullscreenButton={false}/>
                        }
                        </span>
                        <div>
                            <h5>{shortDescription}</h5>
                            <div className="preLine">{longDescription}</div>
                        </div>

                    </Col>
                </Row>
                <Row  className="mt-2 ml-0 mr-0">
                    <Col>
                            { listing.propertyTypes && listing.propertyTypes.length > 0 ?
                            <div className="pb-2">Property Uses: <span className="font-weight-bold">
                                <PropertyTypeList
                                    propertyTypes={listing.propertyTypes}
                                />
                            </span></div>
                            : null }

                    </Col>
                </Row>
            </div>
        );
    }
}

export default ListingDetailOverview;
