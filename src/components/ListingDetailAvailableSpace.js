import React from 'react';
import {
    Row,
    Col,
    Accordion,
    Image,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faAngleDown,
    faAngleUp,
    faPlus,
    faPencilAlt,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import ListingEditAvailableSpace from './ListingEditAvailableSpace';
import {spaceNameValuePairs} from '../helpers/utilities';
import {numberWithCommas} from '../helpers/utilities';

function NameValue(props){
    var startIndex = props.index * 3;
    var stopIndex = startIndex + props.cols;
    var items = [];
    for (var i=startIndex; i<stopIndex; i++){
        var label = props.nameValuePairs[i].label;
        var value = props.nameValuePairs[i].value;
        var prefix = props.nameValuePairs[i].prefix;
        var unit = props.nameValuePairs[i].unit;
        items.push(
            <Col key={i}>
                <Row>
                    <Col>{label}</Col>
                    <Col className="font-weight-bold">{prefix} {value} {unit}</Col>
                </Row>
            </Col>
        );
    }
    if ((stopIndex - startIndex) === 1){
        items.push(<Col key={2}></Col>);
        items.push(<Col key={3}></Col>);
    } else if ((stopIndex - startIndex) === 2){
        items.push(<Col key={3}></Col>);
    }
    return(
        <React.Fragment>
        {items}    
        </React.Fragment>
    );
}

function NameValues(props){

    return(
    <React.Fragment>
        {props.rows.map((cols, index) =>
        (
            <Row key={index}>
                <NameValue
                    editMode={props.editMode}
                    nameValuePairs={props.nameValuePairs}
                    index={index}
                    cols={cols}
                />        
            </Row>
        ))}
    </React.Fragment>
    );
}

function SpaceItem(props){
    var space = props.space;
    var editMode = props.editMode;
    var listing = props.listing;
    var index = props.index;
    var eventKey = "Accordion"+props.index;
    var showImages = false;

    // Calculate if Accordion is need
    var accordionNeeded = false;
    if (space.description || 
        space.driveInDoors ||
        space.floors ||
        space.divisible ||
        space.loadingDocks ||
        space.leaseTerm ||
        space.ceilingHeight ||
        space.availableDate ||
        space.nets ||
        space.class){
        accordionNeeded = true;
    }
   
    var accordionText = props.accordionText[index];
    if (accordionNeeded){

    var nameValuePairs = spaceNameValuePairs(space);
    var rows = [];
    if (nameValuePairs.length >= 0 && nameValuePairs.length <= 3){
       rows.push(nameValuePairs.length);
    }
    if (nameValuePairs.length > 3 && nameValuePairs.length <= 6){
       rows.push(3);
       rows.push(nameValuePairs.length - 3);
    }
    if (nameValuePairs.length > 6 && nameValuePairs.length <= 9){
       rows.push(3);
       rows.push(3)
       rows.push(nameValuePairs.length - 6);
    }
    if (nameValuePairs.length > 9 && nameValuePairs.length <= 12){
       rows.push(3);
       rows.push(3);
       rows.push(3)
       rows.push(nameValuePairs.length - 9);
    }
    var size = null;
    if (space.size){
        size = numberWithCommas(space.size);
    }

    return(
    <Accordion key={space.unit}> 
        <Row className="ml-0 mr-0 border-bottom align-items-center" >
            <Col md={2}>{space.use}</Col>
            <Col md={2}>{size} sf</Col>
            { space.price ?
            <Col md={2}>${space.price} {space.priceUnit}</Col>
            :
            <Col md={2}></Col> 
            }
            <Col md={4}>{space.unit}</Col>
            <Col md={2}>
                <Row>
                    <Col>
                        <span className="float-right">
                            <Accordion.Toggle
                                value={index}
                                className="text-danger"
                                as={Button}
                                onClick={() => props.onAccordionChange(index)}
                                variant="link"
                                eventKey={eventKey}
                            >
                                <span>{accordionText}&nbsp;
                                    <FontAwesomeIcon
                                        icon={accordionText === "More" ? faAngleDown : faAngleUp}
                                    />
                                </span>
                            </Accordion.Toggle>

                            { editMode === "edit" ?
                            <span className="pr-3">
                                <EditButton
                                    title="Update Space"
                                    listing={listing}
                                    index={index}
                                    spaceUpdateIndex={props.spaceUpdateIndex}
                                    space={space} 
                                    spaceUses={props.spaceUses}
                                    spaceTypes={props.spaceTypes} 
                                    spaceDivisibles={props.spaceDivisibles}
                                    priceUnits={props.priceUnits}
                                    onSave={props.onSave}
                                    onShow={props.onShow}
                                    onHide={props.onHide}
                                    errorMessage={props.errorMessage}
                                    show={props.show}
                                    saving={props.saving}
                                />
                            </span>
                            : null }
                            { editMode === "edit" ?
                            <span>
                                <FontAwesomeIcon 
                                    className="edit-button text-danger" 
                                    size="xs"
                                    onClick={() => {props.onDelete(props.space.id)}} 
                                    icon={faTrash} 
                                />
                            </span>
                            : null }
                        </span>
                    </Col>
                </Row>
            </Col>  
        </Row>
        <Accordion.Collapse eventKey={eventKey}>
            <div className="ml-2 mb-2">
                <Row>
                    <Col>
                        {space.description}
                    </Col>
                </Row>
                <NameValues
                    rows={rows}
                    nameValuePairs={nameValuePairs}
                />
                {showImages ?
                <Row className="border-bottom">
                    <Col><Image src="/image1.jpg" thumbnail /></Col>
                    <Col><Image src="/image2.jpg" thumbnail /></Col>
                    <Col><Image src="/image3.jpg" thumbnail /></Col>
                </Row>
                : null}
            </div>
        </Accordion.Collapse>
    </Accordion>
    );
    } else {
    size = null;
    if (space.size){
        size = numberWithCommas(space.size);
    }
    return(
        <Row className="ml-0 mr-0 border-bottom align-items-center">
            <Col md={2}>{space.use}</Col>
            <Col md={2}>{size} sf</Col>
            { space.price ?
            <Col md={2}>${space.price} {space.priceUnit}</Col>
            :
            <Col md={2}></Col>
            }
	    <Col md={4}>{space.unit}</Col>
            <Col md={2}>
                <Row>
                    <Col>
                        <span className="float-right">
                            { editMode === "edit" ?
                            <span className="pr-3">
                                 <EditButton
                                     title="Update Space"
                                     listing={listing}
                                     index={index}
                                     spaceUpdateIndex={props.spaceUpdateIndex}
                                     space={space}
                                     spaceUses={props.spaceUses}
                                     spaceTypes={props.spaceTypes}
                                     spaceDivisibles={props.spaceDivisibles}
                                     priceUnits={props.priceUnits}
                                     onSave={props.onSave}
                                     onShow={props.onShow}
                                     onHide={props.onHide}
                                     errorMessage={props.errorMessage}
                                     show={props.show}
                                     saving={props.saving}
                                 />
                            </span>
                            : null }
                            { editMode === "edit" ?
                            <span>
                                <FontAwesomeIcon 
                                    className="text-danger" 
                                    size="xs" 
                                    onClick={() => {props.onDelete(space.id)}}
                                    icon={faTrash} />
                            </span>
                            : null }
                        </span>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
    } 
}


function AddButton(props) {
    return (
        <span id="span_space_add_button">
            <span
                className="edit-button text-danger"
                onClick={() => {props.onShow()}}
            >
                <FontAwesomeIcon
                    id="space_add_button"
                    size="xs" 
                    icon={faPlus} />&nbsp;Add Space
            </span>
            {props.show ?
            <ListingEditAvailableSpace
                title={props.title}
                listing={props.listing}
                index={props.index}
                space={props.space}
                spaceTypes={props.spaceTypes}
                spaceUses={props.spaceUses}
                spaceDivisibles={props.spaceDivisibles}
                priceUnits={props.priceUnits}
                show={props.show}
                onHide={props.onHide}
                onSave={listing => props.onSave(listing)}
                errorMessage={props.errorMessage}
                saving={props.saving}
                simple={props.simple}
            />
            : null }
        </span>
  );
}
function EditButton(props) {
    var space = props.space;
    if (props.listing){
         space = props.listing.spaces[props.spaceUpdateIndex];
    }
    return (
        <span>
          <span
              id="space_edit_button"
              onClick={() => {props.onShow(props.index)}}
              className="edit-button text-danger"
          >
              <FontAwesomeIcon icon={faPencilAlt} />
          </span>
          { props.show ?
          <ListingEditAvailableSpace
              title="Edit Space"
              listing={props.listing}
              space={space}
              spaceTypes={props.spaceTypes}
              spaceUses={props.spaceUses}
              spaceDivisibles={props.spaceDivisibles}
              priceUnits={props.priceUnits}
              show={props.show}
              onHide={props.onHide}
              onSave={listing => props.onSave(listing)}
              errorMessage={props.errorMessage}
              saving={props.saving}
              simple={props.simple}
          />
          :null }
        </span>
    );
}
class ListingDetailAvailableSpace extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            text1: "More",
            accordionText: []
        }
    }
    handleSave(space){
        this.props.onSpaceUpdate(space);
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }
    render(){
        var listing = this.props.listing;
        var editMode = this.props.editMode;
        var spaceUses = this.props.spaceUses;
        var spaceTypes = this.props.spaceTypes;
        var spaceDivisibles = this.props.spaceDivisibles;
        var priceUnits = this.props.priceUnits;
        var newSpace = {}; 
        return (
            <div className="m-4 shadow border">
                <Row className="mt-2 ml-0 mr-0">
                    <Col>
                        <h3>Available Space {editMode === "edit" ? 
                            <AddButton 
                            listing={listing} 
                            space={newSpace}
                            spaceUses={spaceUses} 
                            spaceTypes={spaceTypes}
                            spaceDivisibles={spaceDivisibles}
                            priceUnits={priceUnits}
                            onSave={this.handleSave} 
                            onShow={this.props.onSpaceModalNew}
                            onHide={this.props.onSpaceModalHide}
                            errorMessage={this.props.unitError}
                            show={this.props.spaceNew}
                            saving={this.props.spaceSaving}
                            simple={this.props.simple}
                            /> 
                            : null}</h3>
                    </Col>
                </Row>
                <Row className="ml-0 mr-0 bg-light">
                    <Col md={2} className="font-weight-bold">Type</Col>
                    <Col md={2} className="font-weight-bold">Size</Col>
                    <Col md={2} className="font-weight-bold">Price</Col>
                    <Col md={4} className="font-weight-bold">Name</Col>
                    <Col md={2}></Col>
                </Row>
                {!listing ? <div></div> : null}
                { listing.spaces && listing.spaces.length > 0 ? 
                listing.spaces.map((space, index) =>
                (
                <SpaceItem
                    key={space.id}
                    editMode={this.props.editMode}
                    listing={listing}
                    index={index}
                    spaceUpdateIndex={this.props.spaceUpdateIndex}
                    space={space}
                    spaceUses={spaceUses}
                    spaceTypes={spaceTypes}
                    spaceDivisibles={spaceDivisibles}
                    priceUnits={priceUnits}
                    onSave={this.handleSave}
                    onShow={this.props.onSpaceModalUpdate}
                    onHide={this.props.onSpaceModalHide}
                    errorMessage={this.props.spaceError}
                    show={this.props.spaceUpdate}
                    saving={this.props.spaceSaving}
                    onAccordionChange={this.props.onAccordionChange}
                    accordionText={this.props.accordionText}
                    text1={this.state.text1}
                    onDelete={this.props.onDelete}
                />
                )): null}
            </div>

        );
    }
}

export default ListingDetailAvailableSpace;
