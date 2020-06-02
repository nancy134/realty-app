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
import {formatDate} from '../helpers/utilities';

function SpaceItem(props){
    var space = props.space;
    var editMode = props.editMode;
    var listing = props.listing;
    var index = props.index;

    var availableDate;
    if (space.availableDate && space.availableDate !== ""){
        availableDate = formatDate(space.availableDate);
    }
    var showImages = false;

    // Calculate if Accordion is need
    var accordionNeeded = false;
    if (editMode === "edit"){
        accordionNeeded = true;
    } else {
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
    }
    var accordionText = props.accordionText[index];

    if (accordionNeeded){
    return(
    <Accordion key={space.unit}> 
        <Row className="border-bottom align-items-center" >
            <Col md={2}>{space.unit}</Col>
            <Col md={2}>{space.size} sf</Col>
            <Col md={2}>${space.price} sf/yr</Col>
            <Col md={3}>
                <Row>
                    <Col >{space.type}</Col>
                    <Col >{space.use}</Col>
                </Row>
            </Col> 
            <Col md={3}>
                <Row>
                    { editMode === "edit" ?
                    <Col>
                         <EditButton
                             title="Update Space"
                             listing={listing}
                             index={index}
                             spaceUpdateIndex={props.spaceUpdateIndex}
                             space={space} 
                             spaceUses={props.spaceUses}
                             spaceTypes={props.spaceTypes} 
                             spaceDivisibles={props.spaceDivisibles}
                             onSave={props.onSave}
                             onShow={props.onShow}
                             onHide={props.onHide}
                             errorMessage={props.errorMessage}
                             show={props.show}
                             saving={props.saving}
                         />
                    </Col>
                    : null }
                    { editMode === "edit" ?
                    <Col>
                        <span>
                        <FontAwesomeIcon 
                            className="edit-button alight-top text-danger" 
                            size="xs"
                            onClick={() => {props.onDelete(props.space.id)}} 
                            icon={faTrash} 
                        />
                        </span>
                    </Col>
                    : null }
                    <Col >
                        <Accordion.Toggle 
                            value={index}
                            className="text-danger"
                            as={Button}
                            onClick={props.onAccordionChange}
                            variant="link"
                            eventKey={index}
                        >
                           {accordionText} <FontAwesomeIcon icon={accordionText === "More" ? faAngleDown : faAngleUp} />
                        </Accordion.Toggle>
                    </Col>
                </Row>
            </Col>  
        </Row>
    <Accordion.Collapse eventKey={index}>
        <div>
            <Row>
                <Col>
                    {space.description}
                </Col>
            </Row>
            <Row>
                <Col>
                    {editMode === "edit" || (editMode === "view" && space.driveInDoors) ?
                    <Row>
                        <Col>Drive In Doors</Col>
                        <Col className="font-weight-bold">{space.driveInDoors}</Col>
                    </Row>
                    : null }
                </Col>
                <Col>
                    {editMode === "edit" || (editMode === "view" && space.floors) ?
                    <Row>
                        <Col>Floors</Col>
                        <Col className="font-weight-bold">{space.floors}</Col>
                    </Row>
                    : null }
                </Col>
                <Col>
                    {editMode === "edit" || (editMode === "view" && space.divisible) ?
                    <Row>
                        <Col>Divisible</Col>
                        <Col className="font-weight-bold">{space.divisible}</Col>
                    </Row>
                    : null }
                </Col>
            </Row>
            <Row>
                <Col>
                    {editMode === "edit" || (editMode === "view" && space.loadingDocks) ?
                    <Row>
                        <Col>Loading Docks</Col>
                        <Col className="font-weight-bold">{space.loadingDocks}</Col>
                    </Row>
                    : null }
                </Col>
                <Col>
                    {editMode === "edit" || (editMode === "view" && space.leaseTerm) ?
                    <Row>
                        <Col>Lease Term</Col>
                        <Col className="font-weight-bold">{space.leaseTerm}</Col>
                    </Row>
                    : null }
                </Col>
                <Col>
                    {editMode === "edit" || (editMode === "view" && space.ceilingHeight) ?
                    <Row>
                        <Col>Ceiling Height</Col>
                        <Col className="font-weight-bold">{space.ceilingHeight}</Col>
                    </Row>
                    : null }
                </Col>
            </Row>
            <Row>
                <Col>
                    {editMode === "edit" || (editMode === "view" && availableDate) ?
                    <Row>
                        <Col>Available Date</Col>
                        <Col className="font-weight-bold">{availableDate}</Col>
                    </Row>
                    : null }
                </Col>
                <Col>
                    {editMode === "edit" || (editMode === "view" && space.nets) ?
                    <Row>
                        <Col>Nets</Col>
                        <Col className="font-weight-bold">{space.nets}</Col>
                    </Row>
                    : null }
                </Col>
                <Col>
                    {editMode === "edit" || (editMode === "view" && space.class) ?
                    <Row>
                        <Col>Class</Col>
                        <Col className="font-weight-bold">{space.class}</Col>
                    </Row>
                    : null }
                </Col>
            </Row>
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
    return(
        <Row className="border-bottom align-items-center" >
            <Col md={2}>{space.unit}</Col>
            <Col md={2}>{space.size} sf</Col>
            <Col md={2}>${space.price} sf/yr</Col>
            <Col md={3}>
                <Row>
                    <Col >{space.type}</Col>
                    <Col >{space.use}</Col>
                </Row>
            </Col>
            <Col md={3}>
                <Row>
                    { editMode === "edit" ?
                    <Col>
                         <EditButton
                             title="Update Space"
                             listing={listing}
                             index={index}
                             spaceUpdateIndex={props.spaceUpdateIndex}
                             space={space}
                             spaceUses={props.spaceUses}
                             spaceTypes={props.spaceTypes}
                             spaceDivisibles={props.spaceDivisibles}
                             onSave={props.onSave}
                             onShow={props.onShow}
                             onHide={props.onHide}
                             errorMessage={props.errorMessage}
                             show={props.show}
                             saving={props.saving}
                         />
                    </Col>
                    : null }
                    { editMode === "edit" ?
                    <Col>
                        <FontAwesomeIcon 
                            className="text-danger" 
                            size="xs" 
                            onClick={() => {props.onDelete(space.id)}}
                            icon={faTrash} />
                    </Col>
                    : null }
                    <Col></Col>
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
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon
                    id="space_add_button"
                    onClick={() => {props.onShow()}}
                    size="xs" 
                    icon={faPlus} />
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
              className="edit-button alight-top text-danger"
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
              show={props.show}
              onHide={props.onHide}
              onSave={listing => props.onSave(listing)}
              errorMessage={props.errorMessage}
              saving={props.saving}
          />
          :null }
        </span>
    );
}
class ListingDetailAvailableSpace extends React.Component {
    constructor(props){
        super(props);
        this.handleAccordionChange = this.handleAccordionChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            text1: "More",
            accordionText: []
        }
    }

    handleAccordionChange(e){
        if (e.target.value === "1") {
            if (this.state.text1 === "More"){
                this.setState({text1: "Less"});
            } else {
                this.setState({text1: "More"});
            }
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
        var newSpace = {}; 
        return (
            <div>
                <Row className="mt-3 border-bottom border-warning">
                    <Col>
                        <h2>Available Space {editMode === "edit" ? 
                            <AddButton 
                            listing={listing} 
                            space={newSpace}
                            spaceUses={spaceUses} 
                            spaceTypes={spaceTypes}
                            spaceDivisibles={spaceDivisibles}
                            onSave={this.handleSave} 
                            onShow={this.props.onSpaceModalNew}
                            onHide={this.props.onSpaceModalHide}
                            errorMessage={this.props.unitError}
                            show={this.props.spaceNew}
                            saving={this.props.spaceSaving}
                            /> 
                            : null}</h2>
                    </Col>
                </Row>
                <Row className="bg-light shadow">
                    <Col md={2} className="font-weight-bold">Unit</Col>
                    <Col md={2}  className="font-weight-bold">Size</Col>
                    <Col md={2} className="font-weight-bold">Price</Col>
                    <Col md={3}>
                        <Row>
                            <Col className="font-weight-bold">Type</Col>
                             <Col className="font-weight-bold">Use</Col>
                        </Row>
                    </Col>
                    <Col md={3}></Col>
                </Row>
                {!listing ? <div></div> : 
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
                ))}
            </div>

        );
    }
}

export default ListingDetailAvailableSpace;
