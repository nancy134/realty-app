import React from 'react';
import {
    ListGroup,
    Navbar,
    Nav
} from 'react-bootstrap';

function CollectionItem(props){

    var active = false;
    if (props.collection.Id === props.selectedCollection){
        active = true;
    }

    return(
       <ListGroup.Item
           active={active}
           onClick={() => props.onSparkCollectionSelect(props.collection.Id)}
       >
           <span>{props.collection.Name}</span>
       </ListGroup.Item>
    );
}

class SparkCollections extends React.Component{
    constructor(props){
        super(props);
        this.handleSparkCollectionSelect = this.handleSparkCollectionSelect.bind(this);
    }
 
    handleSparkCollectionSelect(id){
        console.log("handleSparkCollectionSelect(): id: "+id);
        this.props.onSparkCollectionSelect(id);
    }

    render(){
        var collections = this.props.sparkCollections;
        console.log("this.props.selectedCollection: "+this.props.sparkSelectedCollection);
        if (collections){
        return(
        <React.Fragment>
            <div className="pl-1 pr-1">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Collections</Navbar.Brand>
                <Nav.Link>Add</Nav.Link>
            </Navbar>
            <ListGroup>
                {collections.D.Results.map((collection, index) =>
                (
                    <CollectionItem
                        index={index}
                        key={index}
                        collection={collection}
                        onSparkCollectionSelect={this.handleSparkCollectionSelect}
                        selectedCollection={this.props.sparkSelectedCollection}
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

export default SparkCollections;
