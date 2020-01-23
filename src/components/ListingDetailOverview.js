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
                <ListingEditOverview />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
function EditButton() {
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
        const viewType = this.props.viewType;
        return (
            <div>
                <Row className="mt-2 border-bottom border-warning">
                    <Col>
	                <h2>Overview {viewType === "owner" ? <EditButton /> : null}</h2>
                    </Col>
                    <Col>
                        <div className="text-right">
                            <h4>For Lease</h4>
                         </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                    <p>
                    Street Retail and Office Space for Lease on High Ridge Road in Stamford, CT</p>
<p>
Street Retail in Ridge Plaza on heavily traveled High Ridge Road. The Plaza contains multiple retailers and has ample parking on site. Pylon signage is available.</p>
                    </Col>
                    <Col md={6}>
                        <Image src="/image1.jpg" className="border-0" thumbnail />
                    </Col>

                </Row>
            </div>
        );
    }
}

export default ListingDetailOverview;
