import React from 'react';
import {
    Row,
    Col,
    Image,
    Button,
    Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt
} from '@fortawesome/free-solid-svg-icons';

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
                   Edit Brokers 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
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

class ListingDetailBrokers extends React.Component {
    render() {
        const viewType = this.props.viewType;
        const content = this.props.content;
        return (
            <div>
                <Row className="mt-3 border-bottom border-warning">
                    <Col >
                        <h2>Brokers {viewType === "owner" ? <EditButton /> : null}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Row>
                            <Col md={4}><Image src="/broker.jpg" className="broker-image"  roundedCircle /></Col>
                            <Col md={8}>
                                <Row>Paul Piedra</Row>
                                <Row>Sabre Realty Group</Row>
                                <Row>(203) 388-8030</Row>
                                <Row><Button className="p-0" variant="link">Contact</Button></Row>
                            </Col>
                        </Row>
                    </Col>
                    { content !== "new" ?
                    <Col>
                        <Row>
                            <Col md={4}><Image src="/broker.jpg" className="broker-image"  roundedCircle /></Col>
                            <Col md={8}>
                                <Row>Paul Piedra</Row>
                                <Row>Sabre Realty Group</Row>
                                <Row>(203) 388-8030</Row>
                                <Row><Button className="p-0" variant="link">Contact</Button></Row>
                            </Col>
                        </Row>

                    </Col>
                    : null}
                    { content !== "new" ?
                    <Col>
                        <Row>
                            <Col md={4}><Image src="/broker.jpg" className="broker-image"  roundedCircle /></Col>
                            <Col md={8}>
                                <Row>Paul Piedra</Row>
                                <Row>Sabre Realty Group</Row>
                                <Row>(203) 388-8030</Row>
                                <Row><Button className="p-0" variant="link">Contact</Button></Row>
                            </Col>
                        </Row>

                    </Col>
                    : null}
                </Row>
             </div>
        );
    }
}

export default ListingDetailBrokers;
