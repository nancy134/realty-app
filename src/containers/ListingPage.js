import React, { Component } from 'react';
import {
    Row, Col
} from 'react-bootstrap';
import './ListingPage.css';
import ListingMap from '../components/ListingMap';
import Listings from '../components/Listings';
import ListingToolbar from '../components/ListingToolbar';
import ListingPagination from '../components/ListingPagination';
import ListingDetail from '../components/ListingDetail';

export class ListingPage extends Component {
    constructor(props){
        super(props);
        this.handleShowDetailChange = this.handleShowDetailChange.bind(this);
        this.handleAddListing = this.handleAddListing.bind(this);
        this.state = {
            showDetail: false,
            content: "existing",
            listings: []
        };
    }
    handleShowDetailChange(showDetail, index){
        this.setState({
            showDetail: showDetail,
            index: index,
            content: "existing"
        });

    }
    handleAddListing(){
        this.setState({
            content: "new",
            index: "1",
            showDetail: true
        });
    }
    componentDidMount(){

    }
    componentWillUnmount(){
    }
    shouldComponentUpdate(){
        return true;
    }
    render() {
        var showDetail = this.state.showDetail;
        var index = this.state.index;
        var content = this.state.content;
        var data = this.state.data;
        return (
            <React.Fragment>
                <Row className="bg-success">
                    <ListingToolbar onAddListing={this.handleAddListing}/>
                </Row>
                <Row>
                    <Col className={showDetail? "rightcol" : "leftcol"}>
                        {showDetail ? (
                            <ListingDetail content={content} index={index} showDetail={showDetail} data={data} onShowDetailChange={this.handleShowDetailChange}/>
                        ) : (
                            <ListingMap showDetail={showDetail} />
                        )}
                    </Col>
                    <Col className="rightcol" >
                        <ListingPagination />
                        <Listings onShowDetailChange={this.handleShowDetailChange} />
                    </Col>
                </Row>
                <Row className="bg-secondary">footer</Row>
            </React.Fragment> 
        );
    }
}

export default ListingPage;
