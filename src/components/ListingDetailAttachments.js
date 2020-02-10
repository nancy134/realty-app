import React from 'react';

import {
    Row,
    Col
} from 'react-bootstrap';

class ListingDetailAttachments extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Attachments</h2>
                </Col>
            </Row>
        </React.Fragment>
        );
    }
}
export default ListingDetailAttachments;
