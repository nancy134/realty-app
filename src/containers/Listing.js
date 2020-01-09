import React from 'react';
import './Listing.css';
import {
    Container,
    Row, Col,
    ListGroup,
    Pagination
} from 'react-bootstrap';

function Listing() {
  
  return (
      <Container>
          <Row>
              <Col>Co11</Col>
              <Col>
<Pagination>
  <Pagination.First />
  <Pagination.Prev />
  <Pagination.Item>{1}</Pagination.Item>
  <Pagination.Ellipsis />

  <Pagination.Item>{10}</Pagination.Item>
  <Pagination.Item>{11}</Pagination.Item>
  <Pagination.Item active>{12}</Pagination.Item>
  <Pagination.Item>{13}</Pagination.Item>
  <Pagination.Item disabled>{14}</Pagination.Item>

  <Pagination.Ellipsis />
  <Pagination.Item>{20}</Pagination.Item>
  <Pagination.Next />
  <Pagination.Last />
</Pagination>
                  <ListGroup>
                      <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>
                      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                  </ListGroup>
              </Col>
          </Row>
      </Container>
  );
}

export default Listing; 

