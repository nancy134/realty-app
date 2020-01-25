import React from 'react';
import {
    Row,
    Col,
    Image,
    Modal,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import ListingEditOverview from './ListingEditOverview';

function ListingEditModal(props) {
    var content = props.content;
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Overview 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <ListingEditOverview content={content}/>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
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
            <ListingEditModal
                content = {props.content}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </span>
  );
}

class ListingDetailOverview extends React.Component {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleEdit(){
       console.log("handleEdit");
    }

    render() {
        var shortDescription = "Street Retail and Office Space for Lease on High Ridge Road in Stamford, CT";
        var longDescription = "Street Retail in Ridge Plaza on heavily traveled High Ridge Road. The Plaza contains multiple retailers and has ample parking on site. Pylon signage is available.";
        var image = "/image1.jpg";
        if (this.props.content === "new"){
            shortDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae.";
            longDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae aliquet purus. In sollicitudin lobortis sollicitudin. Morbi sagittis ornare lorem, sed volutpat dolor. Vestibulum ac erat et ante cursus bibendum at in urna. Duis quis ex sapien. Sed massa mauris, consectetur eget nisl vel, tincidunt varius dolor. Cras porttitor tortor mauris, ut congue odio fringilla id. Aenean pretium a ante ut fermentum. Donec fringilla quam et felis tempor varius.";
            image = "/default.jpg"; 
        }
        const viewType = this.props.viewType;
        const content = this.props.content;
        return (
            <div>
                <Row className="mt-2 border-bottom border-warning">
                    <Col>
	                <h2>Overview {viewType === "owner" ? <EditButton content={content} /> : null}</h2>
                    </Col>
                    <Col>
                        <div className="text-right">
                            <h4>For Lease</h4>
                         </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p>{shortDescription}</p>
                        <p>{longDescription}</p>
                    </Col>
                    <Col md={6}>
                        <Image src={image} className="border-0" thumbnail />
                    </Col>

                </Row>
            </div>
        );
    }
}

export default ListingDetailOverview;
