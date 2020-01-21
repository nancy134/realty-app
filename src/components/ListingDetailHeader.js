import React from 'react';
import {
    Row,
    Col,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTimes,
    faEdit,
    faExpand
} from '@fortawesome/free-solid-svg-icons';

class ListingDetailHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClose(){
        this.props.onShowDetailChange(false);
    }

    render() {
        return(
            <Row className="align-items-center bg-info">
	        <Col md={6}className="text-white"><h4>240-246 Moody St (Waltham, MA)</h4></Col>
                <Col md={6} className="text-right">
                    <Button variant="info"><FontAwesomeIcon icon={faExpand} /> Expand</Button>
                    <Button variant="info"><FontAwesomeIcon icon={faEdit} /> Edit</Button>
                    <Button variant="info" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes}/> Close</Button>
                </Col>
            </Row>
        );
    }
}

export default ListingDetailHeader;
