import React from 'react';
import {
    Row,
    Col,
    Button,
    Image
} from 'react-bootstrap';

class ListingDetail extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }
    handleChange() {
        this.props.onShowDetailChange(false);
    }
    render(){
        const showDetail = this.props.showDetail;
        if (showDetail){
            return (
                <div>
                <Row className="bg-dark">
                    <Col md={8}className="text-white"><Button variant="dark">240-246 Moody St</Button></Col>
                    <Col md={4} className="text-right"><Button variant="link">Expand</Button>
                    <Button variant="link">Edit</Button>
                    <Button variant="link" onClick={this.handleChange}>Close</Button></Col>
                </Row>
                <Row className="border-bottom">
                    <Col>
                    OVERVIEW
                    </Col>
                    <Col>
                    <div className="text-right">
                    For Lease
                    </div>
                    </Col>
                </Row>
                <Row className="border-bottom">
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
                <Row>
                    <Col>AVAILABLE</Col>
                </Row>
                </div> 
            );
        } else {
            return null;
        }
    } 
}

export default ListingDetail;
