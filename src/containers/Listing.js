import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import {
    Container,
    Row, Col,
    ListGroup,
    Card,
    Image,
    Form,
    Button,
    Dropdown,
    Pagination
} from 'react-bootstrap';
import './Listing.css';


export class Listing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{latitude: 42.372376, longitude: -71.236423},
              {latitude: 42.397269, longitude: -71.255798},
              {latitude: 42.377510, longitude: -71.225547},
              {latitude: 42.371878, longitude: -71.237794}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }
  render() {
    return (
        <Container fluid>
        <Row className="bg-secondary">
          <Form className="m-2">
            <Form.Row>
              <Col xs={6}>
                <Form.Control placeholder="Waltham, MA" />
              </Col>
              <Col>
                <Button variant="info">Search</Button>
              </Col>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    Filters 
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Form>
             <Col xs={6}>
                <Form.Control placeholder="Waltham, MA" />
              </Col>
              <Col>
                <Button variant="info">Search</Button>
              </Col>

                    </Form>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Form.Row>
          </Form>
        </Row>
        <Row>
            <Col className="leftcol">
                <Map
                  google={this.props.google}
                  zoom={13}
                  initialCenter={{ lat: 42.372376, lng: -71.236423}}
                >
                   {this.displayMarkers()}
                </Map>
            </Col>
            <Col className="rightcol">
<Pagination size="sm" className="justify-content-end">
  <Pagination.Item key="1" active="true">1</Pagination.Item>
  <Pagination.Item key="2" >2</Pagination.Item>
  <Pagination.Ellipsis />
  <Pagination.Item key="6" >6</Pagination.Item>

</Pagination>
                <ListGroup>
                    <ListGroup.Item disabled>
                       <Row>
                           <Col>
                           <Image src="/image1.jpg" className="border-0" thumbnail/>
                           </Col>
                           <Col>
                               <Card className="border-0">
                                   <Card.Body >
                                       <Card.Title>240-256 Moody St</Card.Title>
                                       <Card.Subtitle>Waltham, MA</Card.Subtitle>
                                       <Card.Text>Built in 1920 /
                                       1,152sf Retail Space /
                                       $20.00 sf/yr</Card.Text>
                                   </Card.Body>
                               </Card>
                           </Col>
                       </Row>
                       </ListGroup.Item>
                       <ListGroup.Item>
                       <Row>
                           <Col>
                           <Image src="/image2.jpg" className="border-0" thumbnail/>
                           </Col>
                           <Col>
                               <Card className="border-0">
                                   <Card.Body >
                                       <Card.Title>440 Totten Pond Rd</Card.Title>
                                       <Card.Subtitle>Waltham, MA</Card.Subtitle>
                                       <Card.Text>Built in 1969 /
                                       1,147sf Office Space /
                                       $22.85 sf/yr</Card.Text>
                                   </Card.Body>
                               </Card>
                           </Col>
                       </Row>

                    </ListGroup.Item>
                       <ListGroup.Item>
                       <Row>
                           <Col>
                           <Image src="/image3.jpg" className="border-0" thumbnail/>
                           </Col>
                           <Col>
                               <Card className="border-0">
                                   <Card.Body >
                                       <Card.Title>384 Main St</Card.Title>
                                       <Card.Subtitle>Waltham, MA</Card.Subtitle>
                                       <Card.Text>Built in 1948 /
                                       1,200sf Office Space /
                                       $15.00 sf/yr</Card.Text>
                                   </Card.Body>
                               </Card>
                           </Col>
                       </Row>

                    </ListGroup.Item>
                       <ListGroup.Item>
                       <Row>
                           <Col>
                           <Image src="/image4.jpg" className="border-0" thumbnail/>
                           </Col>
                           <Col>
                               <Card className="border-0">
                                   <Card.Body >
                                       <Card.Title>24 Crescent St</Card.Title>
                                       <Card.Subtitle>Waltham, MA</Card.Subtitle>
                                       <Card.Text>Built in 1962 /
                                       650 - 3,948sf Spaces /
                                       $14.12 - $20.00 sf/yr</Card.Text>
                                   </Card.Body>
                               </Card>
                           </Col>
                       </Row>

                    </ListGroup.Item>

                </ListGroup>
            </Col>
        </Row>
        </Container>
    );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(Listing);
