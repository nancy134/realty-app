import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import ListingEditOverview from './ListingEditOverview';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function EditButton(props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <span>
            <span
                id="overview_edit_button" 
                onClick={() => setModalShow(true)} 
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPencilAlt} />
            </span>
            <ListingEditOverview
                listing = {props.listing}
                listingTypes = {props.listingTypes}
                getListing={props.getListing}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSave={listing => props.onSave(listing)}
            />
        </span>
  );
}

class ListingDetailOverview extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.renderLeftNav = this.renderLeftNav.bind(this);
        this.renderRightNav = this.renderRightNav.bind(this);
        this.getListing = this.getListing.bind(this);
    }
    handleEdit(){
    }
    handleSave(listing){
        console.log("handleSave");
        this.props.onListingUpdate(listing);
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
    acceptMethods(uploadFiles){
        console.log("acceptMethods");
        this.upLoadFiles = uploadFiles;
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
        }
        if (galleryImages.length === 0){
            galleryImages.push(defaultImage);
        }

        const listing = this.props.listing;
        const editMode = this.props.editMode;
        const listingTypes = this.props.listingTypes;
        return (
            <div>
                <Row className="mt-2 border-bottom border-warning">
                    <Col>
	                <h2>Overview {editMode === "edit" ? <EditButton listing={listing} listingTypes={listingTypes} onSave={this.handleSave} getListing={this.props.getListing}/> : null}</h2>
                    </Col>
                    <Col>
                        <div className="text-right">
                            <h4>{listingType}</h4>
                         </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p>{shortDescription}</p>
                        <p>{longDescription}</p>
                    </Col>
                    <Col md={6}>
                        <ImageGallery 
                          showThumbnails={false}
                          items={galleryImages}
                          renderLeftNav={this.renderLeftNav}
                          renderRightNav={this.renderRightNav}/>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default ListingDetailOverview;
