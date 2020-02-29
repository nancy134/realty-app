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
    acceptMethods(childDoAlert){
        this.ChildDoAlert = childDoAlert;
    }
    getListing(){
        this.props.getListing();
    }
    render() {
        var shortDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae.";
        var longDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae aliquet purus. In sollicitudin lobortis sollicitudin. Morbi sagittis ornare lorem, sed volutpat dolor. Vestibulum ac erat et ante cursus bibendum at in urna. Duis quis ex sapien. Sed massa mauris, consectetur eget nisl vel, tincidunt varius dolor. Cras porttitor tortor mauris, ut congue odio fringilla id. Aenean pretium a ante ut fermentum. Donec fringilla quam et felis tempor varius.";
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
