import React from 'react';
import {
    Row,
    Col,
    Accordion,
    Image,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faAngleDown,
    faAngleUp
} from '@fortawesome/free-solid-svg-icons';

class ListingDetailAvailableSpace extends React.Component {
    constructor(props){
        super(props);
        this.handleAccordionChange = this.handleAccordionChange.bind(this);
        this.state = {
            text1: "More",
            text2: "More"
        }
    }

    handleAccordionChange(e){
        console.log("handleAccordionChange e.target.value:"+e.target.value);
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
        return (
            <div>
                <Row className="mt-3 border-bottom border-warning">
                    <Col><h2>Available Space</h2></Col>
                </Row>
                <Row className="bg-light shadow">
                    <Col md={2} className="font-weight-bold">Unit</Col>
                    <Col md={2} className="font-weight-bold">Size</Col>
                    <Col md={2} className="font-weight-bold">Price</Col>
                    <Col md={2} className="font-weight-bold">Type</Col>
                    <Col md={2} className="font-weight-bold">Use</Col>
                </Row>
                <Accordion>
                    <Row className="border-bottom align-items-center">
                       <Col md={2}>Suite 1A</Col>
                       <Col md={2}>3,080 sq ft</Col>
                       <Col md={2}>$45/sq ft</Col>
                       <Col md={2}>NNN</Col>
                       <Col md={2}>Office</Col> 
                       <Col md={2}>
                           <Accordion.Toggle value="1" className="text-danger" as={Button} onClick={this.handleAccordionChange} variant="link" eventKey="0">
                               {this.state.text1} <FontAwesomeIcon icon={this.state.text1 === "More" ? faAngleDown : faAngleUp} />
                           </Accordion.Toggle>
                       </Col>
                    </Row>
                    <Accordion.Collapse eventKey="0">
                        <div>
                         <p>For lease is approximately 3,032 square feet of retail space in Ridge Plaza on High Ridge Road. This end cap location has large frontage and is currently a real estate office configured with perimeter offices and a large bullpen area, but can be easily redesigned into an open layout. There are 2 baths located within the space. The Plaza contains multiple retailers and abundant parking is available. As a main artery from the Merritt Parkway to the downtown business district, High Ridge Road is one of the most heavily traveled roads in Stamford with a traffic count of 26,900 cars per day. Ridge Plaza is conveniently located less than 1 mile from the Merritt Parkway Yet easily accessible from downtown Stamford. Prominent pylon signage is available.</p>
                    <Row className="border-bottom">
                       <Col><Image src="./image1.jpg" thumbnail /></Col>
                       <Col><Image src="./image2.jpg" thumbnail /></Col>
                       <Col><Image src="./image3.jpg" thumbnail /></Col>
                    </Row>
                    </div>
                    </Accordion.Collapse>
                </Accordion>
                <Accordion>
                    <Row className="border-bottom align-items-center">
                        <Col md={2}>Suite 2F</Col>
                        <Col md={2}>700 sq ft</Col>
                        <Col md={2}>$20/sq ft</Col>
                        <Col md={2}>Modified Gross</Col>
                        <Col md={2}>Office</Col>
                        <Col md={2}>
                           <Accordion.Toggle className="text-danger" value="2" as={Button} onClick={this.handleAccordionChange} variant="link" eventKey="0">
                               {this.state.text2} <FontAwesomeIcon icon={this.state.text2 === "More" ? faAngleDown : faAngleUp} />
                           </Accordion.Toggle>
                        </Col>
                    </Row>
                    <Accordion.Collapse eventKey="0">
                        <p>For lease is approximately 3,032 square feet of retail space in Ridge Plaza on High Ridge Road. This end cap location has large frontage and is currently a real estate office configured with perimeter offices and a large bullpen area, but can be easily redesigned into an open layout. There are 2 baths located within the space. The Plaza contains multiple retailers and abundant parking is available. As a main artery from the Merritt Parkway to the downtown business district, High Ridge Road is one of the most heavily traveled roads in Stamford with a traffic count of 26,900 cars per day. Ridge Plaza is conveniently located less than 1 mile from the Merritt Parkway Yet easily accessible from downtown Stamford. Prominent pylon signage is available.</p>
                    </Accordion.Collapse>
                </Accordion>
            </div>

        );
    }
}

export default ListingDetailAvailableSpace;
