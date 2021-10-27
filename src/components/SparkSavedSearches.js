import React from 'react';
import {
    ListGroup,
    Navbar,
    Nav
} from 'react-bootstrap';

function SavedSearchItem(props){
    var active = false;
    if (props.savedSearch.Id === props.selectedSavedSearch){
        active = true;
    }

    return(
       <ListGroup.Item
           active={active}
           onClick={() => props.onSparkSavedSearchSelect(props.savedSearch.Id)}
       >
           <span>{props.savedSearch.Name}</span>
       </ListGroup.Item>
    );
}

class SparkSavedSearches extends React.Component{
    constructor(props){
        super(props);
        this.handleSparkSavedSearchSelect = this.handleSparkSavedSearchSelect.bind(this);
    }
 
    handleSparkSavedSearchSelect(id){
        this.props.onSparkSavedSearchSelect(id);
    }

    render(){

        var savedSearches = this.props.sparkSavedSearches;
        if (savedSearches){
        return(
        <React.Fragment>
            <div className="pl-1 pr-1">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>SavedSearches</Navbar.Brand>
                <Nav.Link>Add</Nav.Link>
            </Navbar>
            <ListGroup>
                {savedSearches.D.Results.map((savedSearch, index) =>
                (
                    <SavedSearchItem
                        index={index}
                        key={index}
                        savedSearch={savedSearch}
                        onSparkSavedSearchSelect={this.handleSparkSavedSearchSelect}
                        selectedSavedSearch={this.props.sparkSelectedSavedSearch}
                    />
                ))}
            </ListGroup>
            </div>
        </React.Fragment>
        );
       } else {
           return(<div>loading...</div>);
       }
    }
}

export default SparkSavedSearches;
