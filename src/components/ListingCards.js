import React from 'react';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';

class ListingCards extends React.Component {

    render(){
        return(
            <Container className="pt-4">
            <h2>Recent Listings</h2>
            <Row>
                <Col>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="https://ph-s3-images.s3.amazonaws.com/listing/10/image/3/resized400x600.jpg"
                        />
                        <Card.Body>
                            <Card.Title>40 2nd Ave, Waltham, MA</Card.Title>
                            <Card.Text>
                                <span>Retail Strip Center with Residential Development Potential for Sale at $9,900,000</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="https://ph-s3-images.s3.amazonaws.com/listing/11/image/2/resized400x600.jpg"
                        /> 
                        <Card.Body>
                            <Card.Title>1620 Post Road East, Westport, CT</Card.Title>
                            <Card.Text>
                                <span>Flagship Retail Opportunity</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Col>
                <Col>
                    <Card>
                        <Card.Img
                            variant="top"
                            src="https://ph-s3-images.s3.amazonaws.com/listing/12/image/1/resized400x600.jpg"
                        />
                        <Card.Body>
                            <Card.Title>28 Spring Street, Stamford, CT</Card.Title>
                            <Card.Text>
                                <span>Restaurant Space for Lease in Downtown Stamford</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
            </Container>
        )
    }
}

export default ListingCards;
