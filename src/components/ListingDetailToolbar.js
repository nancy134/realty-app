import React from 'react';
import {
    Row,
    Col,
    Tabs,
    Tab,
    Button
} from 'react-bootstrap';

class ListingDetailToolbar extends React.Component {
    constructor(props){
        super(props);
        this.handleEditModeChange = this.handleEditModeChange.bind(this);
    }

    handleEditModeChange(editMode){
        this.props.onEditModeChange(editMode);
    }

    render(){
       var editMode = this.props.editMode;
       var listingMode = this.props.listingMode;

       if (listingMode === "myListings" ){
       return(
           <div className="mb-2 shadow border">
               <Row className="pt-2 ml-0 mr-0 bg-white">
                   <Col>
                       <Tabs
                           className="listing-tabs pb-1"
                           variant="pills"
                           activeKey={editMode}
                           onSelect={editMode => this.handleEditModeChange(editMode)}
                       >
                           <Tab eventKey="edit" title="Edit"></Tab>
                           <Tab eventKey="view" title="Preview"></Tab>
                       </Tabs>
                   </Col>
                   <Col
                       className="text-right"
                   >
                       <Button variant="warning">
                           Publish
                       </Button>
                   </Col>
               </Row>
           </div>
        );
        } else {
            return null;
        } 
    }
}

export default ListingDetailToolbar;
