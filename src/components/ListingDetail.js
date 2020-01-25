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
        var showDetail = this.props.showDetail;
        const content = this.props.content;
        var viewType;
        if (this.props.index === "1") {
            viewType = "owner";
        } else if (this.props.index === "2") {
            viewType = "default";
        } else {
            viewType = "new";
        }
        if (content === "new"){
            showDetail = true;
        }   
        if (showDetail){
            return (
            <div>
                <ListingDetailHeader content={content} viewType={viewType} onShowDetailChange={this.handleShowDetailChange}/>
                <ListingDetailOverview content={content} viewType={viewType} />
                <ListingDetailAvailableSpace content={content} viewType={viewType} />
                <Row className="mt-3">
                    <Col>
                        <ListingDetailGeneral content={content} viewType={viewType} />
                    </Col>
                    <Col>
                        <ListingDetailAmenities content={content} viewType={viewType} />
                    </Col>
                    
                </Row>
                <ListingDetailBrokers content={content} viewType={viewType} />

            </div> 
            );
        } else {
            return null;
        }
    } 
}

export default ListingDetail;
