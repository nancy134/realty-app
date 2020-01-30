import React from 'react';
import {
    Row,
    Col,
    Accordion,
    Image,
    Button,
    Modal
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

function ListingEditModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Available Space Edit 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                <ListingEditAvailableSpace content={props.content}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={props.onHide}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

function AddButton() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <span>
            <span
                onClick={() => setModalShow(true)}
                className="edit-button align-top text-danger"
            >
                <FontAwesomeIcon size="xs" icon={faPlus} />
            </span>
            <ListingEditModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                content="new"
            />
        </span>
  );
}
function EditButton() {
    const [modalEditShow, setModalEditShow] = React.useState(false);
    return (
        <span>
          <span
              onClick={() => setModalEditShow(true)}
              className="edit-button alight-top text-danger"
          >
              <FontAwesomeIcon icon={faPencilAlt} />
          </span>
          <ListingEditModal
              show={modalEditShow}
              onHide={() => setModalEditShow(false)}
              content="existing"
          />
        </span>
    );
}
class ListingDetailAvailableSpace extends React.Component {
    constructor(props){
        super(props);
        this.handleAccordionChange = this.handleAccordionChange.bind(this);
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
    render(){
        const viewType = this.props.viewType;
        var listing = this.props.listing;
        if (this.props.content === "new"){
            listing.spaces = [];
        }
       
        return (
            <div>
                <Row className="mt-3 border-bottom border-warning">
                    <Col><h2>Available Space {viewType === "owner" ? <AddButton /> : null}</h2></Col>
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
                {listing.spaces.map(space =>
                (
                <Accordion>
                    <Row className="border-bottom align-items-center">
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
                               { viewType === "owner" ?
                               <Col><EditButton /></Col>
                               : null }
                               { viewType === "owner" ?
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
                         <p>For lease is approximately 3,032 square feet of retail space in Ridge Plaza on High Ridge Road. This end cap location has large frontage and is currently a real estate office configured with perimeter offices and a large bullpen area, but can be easily redesigned into an open layout. There are 2 baths located within the space. The Plaza contains multiple retailers and abundant parking is available. As a main artery from the Merritt Parkway to the downtown business district, High Ridge Road is one of the most heavily traveled roads in Stamford with a traffic count of 26,900 cars per day. Ridge Plaza is conveniently located less than 1 mile from the Merritt Parkway Yet easily accessible from downtown Stamford. Prominent pylon signage is available.</p>
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
