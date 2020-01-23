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
        console.log("ListingDetail index: "+this.props.index);
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
    }

    handleShowDetailChange() {
        this.props.onShowDetailChange(false);
    }
    render(){
        const showDetail = this.props.showDetail;
        var viewType;
        if (this.props.index === "1") {
            viewType = "owner";
        } else if (this.props.index === "2") {
            viewType = "default";
        } else {
            viewType = "new";
        }   
        if (showDetail){
            return (
            <div>
                <ListingDetailHeader viewType={viewType} onShowDetailChange={this.handleShowDetailChange}/>
                <ListingDetailOverview viewType={viewType} />
                <ListingDetailAvailableSpace viewType={viewType} />
                <Row className="mt-3">
                    <Col>
                        <ListingDetailGeneral viewTpe={viewType} />
                    </Col>
                    <Col>
                        <ListingDetailAmenities viewType={viewType} />
                    </Col>
                    
                </Row>
                <ListingDetailBrokers viewType={viewType} />

            </div> 
            );
        } else {
            return null;
        }
    } 
}

export default ListingDetail;
