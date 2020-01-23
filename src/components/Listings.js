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

    showDetailChange(e){
        console.log("e.target.dataset.index: "+e.target.dataset.index);
        this.props.onShowDetailChange(true, e.target.dataset.index);
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
                                    <Card.Title className="listing-title text-danger" data-index="1" onClick={this.showDetailChange}>240-256 Moody St</Card.Title>
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
                                    <Card.Title className="listing-title text-danger" data-index="2" onClick={this.showDetailChange}>440 Totten Pond Rd</Card.Title>
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
                                    <Card.Title className="listing-title text-danger">384 Main St</Card.Title>
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
                                    <Card.Title className="listing-title text-danger">24 Crescent St</Card.Title>
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
