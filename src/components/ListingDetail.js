import React from 'react';
import {
    Row,
    Col
} from 'react-bootstrap';
import ListingDetailHeader from './ListingDetailHeader';
import ListingDetailOverview from './ListingDetailOverview';
import ListingDetailAvailableSpace from './ListingDetailAvailableSpace';
import ListingDetailGeneral from './ListingDetailGeneral';
import ListingDetailAmenities from './ListingDetailAmenities';
import ListingDetailBrokers from './ListingDetailBrokers';

class ListingDetail extends React.Component {
    constructor(props) {
        super(props);
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
    }

    handleShowDetailChange() {
        this.props.onShowDetailChange(false);
    }
    render(){
        const showDetail = this.props.showDetail;
        if (showDetail){
            return (
            <div>
                <ListingDetailHeader onShowDetailChange={this.handleShowDetailChange}/>
                <ListingDetailOverview />
                <ListingDetailAvailableSpace />
                <Row className="mt-3">
                    <Col>
                        <ListingDetailGeneral />
                    </Col>
                    <Col>
                        <ListingDetailAmenities />
                    </Col>
                    
                </Row>
                <ListingDetailBrokers />

            </div> 
            );
        } else {
            return null;
        }
    } 
}

export default ListingDetail;
