import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';

class ListingDetailBuildingIncome extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <React.Fragment>
            <Row className="mt-2 border-bottom border-warning">
                <Col>
                    <h2>Building Income/Expense</h2>
                </Col>
            </Row>
        </React.Fragment>
        );
    }
}
export default ListingDetailBuildingIncome;
