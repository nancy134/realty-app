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
        this.state = {listing: null};
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
    }

    handleShowDetailChange() {
        this.props.onShowDetailChange(false);
    }
    componentDidMount(){
        fetch('https://listing-api.phowma.com/listing/'+this.props.index)
        .then(res => res.json())
        .then((data) => {
          this.setState({ listing: data })
        })
        .catch(console.log)

    }
    componentWillUnmount(){
    }
    render(){
        var showDetail = this.props.showDetail;
        const content = this.props.content;
        const listing = this.state.listing;
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
        if (showDetail && listing){
            return (
            <div>
                <ListingDetailHeader listing={listing} content={content} viewType={viewType} onShowDetailChange={this.handleShowDetailChange}/>
                <ListingDetailOverview listing={listing} content={content} viewType={viewType} />
                <ListingDetailAvailableSpace listing={listing} content={content} viewType={viewType} />
                <Row className="mt-3">
                    <Col>
                        <ListingDetailGeneral listing={listing} content={content} viewType={viewType} />
                    </Col>
                    <Col>
                        <ListingDetailAmenities listing={listing} content={content} viewType={viewType} />
                    </Col>
                    
                </Row>
                <ListingDetailBrokers listing={listing} content={content} viewType={viewType} />

            </div> 
            );
        } else {
            return null;
        }
    } 
}

export default ListingDetail;
