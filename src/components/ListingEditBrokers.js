import React from 'react';
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap';
import listingService from '../services/listings';

function Associate(props){
    var name = props.associate.email + " (" + props.associate.role + ")";
    if (props.associate.first){
        name = props.associate.first + " " + props.associate.last + " ("+props.associate.role+") ";
    }
    return(
        <Form.Check
            type="checkbox"
            label={name}
            defaultChecked={props.checkedAssociate}
            onChange={props.onToggleCheckbox}
        />
    );
}

class ListingEditBrokers extends React.Component {
    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this);

        var checkedAssociates = [];
        if (this.props.listing && this.props.listing.users && this.props.associates){
            for (var i=0; i<this.props.associates.length; i++){
                var checkedAssociate = false;
                for(var j=0; j<this.props.listing.users.length; j++){
                    console.log(this.props.listing.users[j].email+"==="+this.props.associates[i].email);
                    if (this.props.listing.users[j].email === this.props.associates[i].email){
                        checkedAssociate = true;
                    }
                }
                checkedAssociates.push(checkedAssociate); 
            }
        }
        this.state = {
            checkedAssociates: checkedAssociates
        };
    }

    handleSave(){
        console.log("handleSave");
        console.log("this.props.associates:");
        console.log(this.props.associates);
        console.log("this.props.listing:");
        console.log(this.props.listing);
        console.log("this.state.checkedAssociates:");
        console.log(this.state.checkedAssociates);

        // Get ListingVersionId
        var listingVersionId = this.props.listing.id;

        // Find Added Associates
        for (var i=0; i<this.props.associates.length; i++){
            // Is this associated Checked?
            var checked = this.state.checkedAssociates[i];
            // Are they already in the list of Brokers?
            var broker = false;
            for (var j=0; j<this.props.listing.users.length; j++){
                if (this.props.associates[i].email === this.props.listing.users[j].email){
                    broker = true;
                }
            }
            if (broker === true && checked === false) {
                console.log("deleted: "+this.props.associates[i].email);
                listingService.deleteListingUser(listingVersionId, this.props.associates[i].id).then(function(listingUser){
                    console.log(listingUser);
                }).catch(function(err){
                    console.log(err);
                }); 
            }
            if (broker === false && checked === true) {
                console.log("added: "+this.props.associates[i].email);
                var listingUserBody = {
                    UserId: this.props.associates[i].id,
                    ListingVersionId: listingVersionId
                };
                listingService.addListingUser(listingUserBody).then(function(listingUser){
                    console.log(listingUser);
                }).catch(function(err){
                    console.log(err);
                });
            }
        }

        // Find Deleted Associates
    }

    handleToggleCheckbox(index){
        var checkedAssociates = this.state.checkedAssociates;
        checkedAssociates[index] = !checkedAssociates[index];
        this.setState({
            checkedAssociates: checkedAssociates,
            associatesChanged: true
        });
    }

    componentDidMount(){
    }

    render(){

        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Brokers 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    { this.props.associates.map((associate, index) =>
                    (
                        <Associate
                            key={index}
                            associate={associate}
                            checkedAssociate={this.state.checkedAssociates[index]}
                            onToggleCheckbox={() => this.handleToggleCheckbox(index)}
                        />
                    ))}
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onHide}
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    onClick={this.handleSave}
                >
                    <span>Save</span>
                </Button>
            </Modal.Footer>
        </Modal>
        );
    }
}

export default ListingEditBrokers;
