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
import listService from '../services/lists';
import listItemService from '../services/listItems';

function Toolbar(props){
    return(
    <div className="pt-1">
        <Row>
            <Col>
                <Button size="sm">
                    <FontAwesomeIcon icon={faFilePdf} />&nbsp;Summary Report
                </Button>
            </Col>
            <Col>
                <Button size="sm">
                    <FontAwesomeIcon icon={faFilePdf} />&nbsp;Detail Report
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
        this.handleDelete = this.handleDelete.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.handleNewListing = this.handleNewListing.bind(this);
        this.handleSelectFavorite = this.handleSelectFavorite.bind(this);
        this.state = {
            lists: [],
            listItems: [],
            listItemIndex: 0
        };
    }
    componentDidMount() {
        var that = this;
        listService.getAll().then(function(lists){
            if (lists.lists.rows){
                var listId = lists.lists.rows[0].id; 
                var query = "perPage=10&page=1&ListId="+listId;
                listItemService.getAll(query).then(function(listItems){
                    that.setState({
                        lists: lists.lists.rows,
                        listItems: listItems.listItems.rows,
                        listId: listId 
                    });
                    that.props.onReportListChange(listItems.listItems.rows);
                }).catch(function(err){
                    console.log(err);
                });
            } else {
            }
        }).catch(function(err){
            console.log(err);
        });
    }
    componentWillUnmount() {
    }
    handleDelete(e, id){
        e.stopPropagation();
        this.props.onDelete(id);
    };
    showDetailChange(id, arrayIndex){
        this.props.onShowDetailChange(true, id, arrayIndex);
    }
    handleListChange(listTab){
        var that = this;
        var query = "perPage=10&page=1&ListId="+listTab;
        listItemService.getAll(query).then(function(listItems){
            that.setState({
                listItems: listItems.listItems.rows,
                listId: listTab
            });
            that.props.onReportListChange(listItems.listItems.rows);
        }).catch(function(err){
            console.log(err);
        });
    }
    handleNewListing(){
        this.props.onNewListing();
    }
    handleSelectFavorite(e, id){
        e.stopPropagation();
    }
    render() {
        if (this.state.lists.length > 0){

        var listings = this.state.listItems;
        var activeKey = this.state.listId;
        var showImage = false;
        var showShortDescription = false;

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
                        {this.state.lists.map((list, index) =>
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
