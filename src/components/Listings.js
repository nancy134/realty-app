import React from 'react';
import {
    ListGroup,
    Row, Col,
    Card,
    Image
} from 'react-bootstrap';

class Listings extends React.Component {
   
    constructor(props) {
        super(props);
        this.showDetailChange = this.showDetailChange.bind(this);
    }

    showDetailChange(){
        this.props.onShowDetailChange(true);
    }
    render() {
        return ( 
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>
                            <Image src="/image1.jpg" className="border-0" thumbnail/>
                        </Col>
                        <Col>
                            <Card className="border-0">
                                <Card.Body >
                                    <Card.Title className="listing-title text-danger" onClick={this.showDetailChange}>240-256 Moody St</Card.Title>
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

       ); 
    }
}
export default Listings;
