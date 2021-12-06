import React from 'react';
import {
    Container,
    Row,
    Col,
    Card
} from 'react-bootstrap';

class Features extends React.Component {

    render(){
        return(
            <Container className="pt-4">
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Embed Listings</Card.Header>
                        <Card.Body>
                            <Card.Title>Embed Listings directly into your website</Card.Title>
                            <Card.Text>
                                <span>Enter your data into FindingCRE and automatically display on your website</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>Generate Emails</Card.Header>
                        <Card.Body>
                            <Card.Title>Generate professional emails</Card.Title>
                            <Card.Text>
                                <span>Enter your data into FindingCRE and automatically generate profressional emails. Upload emails to Constant Contact and Mail Chimp</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Col>
                <Col>
                    <Card>
                        <Card.Header>Social Media</Card.Header>
                        <Card.Body>
                            <Card.Title>Post to social media</Card.Title>
                            <Card.Text>
                                <span>Enter your data into FindingCRE and automatically post to social media including Facebook, Twitter and LinkedIn</span>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
            </Container>
        )
    }
}

export default Features;
