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

function AddButton(props) {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <span>
            <span
                id="space_add_button"
                onClick={() => setModalShow(true)}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />
            </span>
            {modalShow ?
            <ListingEditAvailableSpace
                listing={props.listing}
                space={props.space}
                spaceTypes={props.spaceTypes}
                spaceUses={props.spaceUses}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onSave={listing => props.onSave(listing)}
            />
            : null }
        </span>
  );
}
function EditButton(props) {
    const [modalEditShow, setModalEditShow] = React.useState(false);
    return (
        <span>
          <span
              id="space_edit_button"
              onClick={() => setModalEditShow(true)}
              className="edit-button alight-top text-danger"
          >
              <FontAwesomeIcon icon={faPencilAlt} />
          </span>
          <ListingEditAvailableSpace
              listing={props.listing}
              space={props.space}
              spaceTypes={props.spaceTypes}
              spaceUses={props.spaceUses}
              show={modalEditShow}
              onHide={() => setModalEditShow(false)}
              onSave={listing => props.onSave(listing)}
          />
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
            text2: "More",
        }
    }

    handleAccordionChange(e){
        if (e.target.value === "1") {
            if (this.state.text1 === "More"){
                this.setState({text1: "Less"});
            } else {
                this.setState({text1: "More"});
            }
        } else {
            if (this.state.text2 === "More") {
                this.setState({text2: "Less"});
            } else {
                this.setState({text2: "More"});
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
                            onSave={this.handleSave} /> : null}</h2>
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
                listing.spaces.map(space =>
                (
                <Accordion key={space.unit}> 
                    <Row className="border-bottom align-items-center" >
                       <Col md={2}>{space.unit}</Col>
                       <Col md={2}>{space.size} sq ft</Col>
                       <Col md={2}>${space.price}/sq ft</Col>
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
                                   listing={listing} 
                                   space={space} 
                                   spaceUses={spaceUses}
                                   spaceTypes={spaceTypes} 
                                   onSave={this.handleSave}/></Col>
                               : null }
                               { editMode === "edit" ?
                               <Col><FontAwesomeIcon className="text-danger" size="xs" icon={faTrash} /></Col>
                                : null }

                               <Col >
                                   <Accordion.Toggle value="1" className="text-danger" as={Button} onClick={this.handleAccordionChange} variant="link" eventKey="0">
                               {this.state.text1} <FontAwesomeIcon icon={this.state.text1 === "More" ? faAngleDown : faAngleUp} />
                                   </Accordion.Toggle>
                               </Col>

                           </Row>
                        </Col>  
                    </Row>
                    <Accordion.Collapse eventKey="0">
                        <div>
                         <p>{space.description}</p>
                    <Row className="border-bottom">
                       <Col><Image src="/image1.jpg" thumbnail /></Col>
                       <Col><Image src="/image2.jpg" thumbnail /></Col>
                       <Col><Image src="/image3.jpg" thumbnail /></Col>
                    </Row>
                    </div>
                    </Accordion.Collapse>
                </Accordion>
                ))}
            </div>

        );
    }
}

export default ListingDetailAvailableSpace;
