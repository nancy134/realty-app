import React from 'react';
import {
    ListGroup,
    Row, Col,
    Tabs,
    Tab,
    Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import {
    faFilePdf
} from '@fortawesome/free-regular-svg-icons';
import ListingPagination from '../components/ListingPagination';
import ListingItem from '../components/ListingItem';

function Toolbar(props){
    return(
    <div className="pt-1">
        <Row>
            <Col>
                <Button size="sm">
                    <FontAwesomeIcon icon={faFilePdf} />&nbsp;Summary
                </Button>
            </Col>
            <Col>
                <Button size="sm">
                    <FontAwesomeIcon icon={faFilePdf} />&nbsp;Detail
                </Button>
            </Col>
            <Col>
                <ListingPagination
                    page={props.page}
                    count={props.count}
                    perPage={props.perPage}
                    onNewPage={props.onNewPage}
                />
            </Col>
        </Row>
    </div>
    );
}

class ReportListings extends React.Component {
   
    constructor(props) {
        super(props);
        this.showDetailChange = this.showDetailChange.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.handleNewListing = this.handleNewListing.bind(this);
        this.handleSelectFavorite = this.handleSelectFavorite.bind(this);

    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    showDetailChange(id, arrayIndex){
        this.props.onShowDetailChange(true, id, arrayIndex);
    }
    handleListChange(listTab){
        this.props.onReportListChange(listTab);
    }
    handleNewListing(){
        this.props.onNewListing();
    }
    handleSelectFavorite(e, id){
        e.stopPropagation();
    }
    render() {
        if (this.props.lists.length > 0){

        var listings = this.props.listItems;
        var activeKey = this.props.listId;
        var showImage = false;
        var showShortDescription = false;
        var showDeleteFromList = true;

        return (
        <div>
            { this.props.loggedIn ?
            <div id="stickyHeader" className="bg-white">
                <Toolbar
                    page={this.props.page}
                    count={this.props.count}
                    perPage={this.props.perPage}
                    onNewPage={this.props.onNewPage}
                    listingMode={this.props.listingMode}
                    onNewListing={this.handleNewListing}
                />
                <Tab.Container>
                    <Tabs
                        className="listing-tabs pt-1 border-0"
                        id="listing-tabs"
                        activeKey={activeKey}
                        onSelect={tab => this.handleListChange(tab)}
                    >
                        {this.props.lists.map((list, index) =>
                        <Tab
                            title={list.name}
                            eventKey={list.id}
                            key={index}
                        >
                            <Tab.Content>
                            </Tab.Content>
                        </Tab>
                        )}

                        <Tab
                            title={<FontAwesomeIcon icon={faPlus}/>}
                            eventKey="add"
                        >
                            <Tab.Content>
                            </Tab.Content>
                        </Tab>
                    </Tabs>
                </Tab.Container>
            </div>
            :
            <Toolbar
                page={this.props.page}
                count={this.props.count}
                perPage={this.props.perPage}
                onNewPage={this.props.onNewPage}
                listingMode={this.props.listingMode}
            />
            }
            <div>
                <ListGroup>
                    {listings.map((listing, index) =>
                    (
                        <ListingItem
                            index={index}
                            key={listing.id}
                            listing={listing.listing.versions[0]}
                            onDelete={this.handleDelete}
                            listingMode={this.props.listingMode}
                            onItemClick={this.showDetailChange}
                            onSelectFavorite={this.handleSelectFavorite}
                            showImage={showImage}
                            showShortDescription={showShortDescription}
                            showDeleteFromList={showDeleteFromList}
                            onDeleteFromList={this.props.onDeleteFromList}
                        />
                    ))}
                </ListGroup>
            </div>
        </div>

       ); 
       } else {
       return(
       <p>No listings</p>
       );
       }
    }
}
export default ReportListings;
