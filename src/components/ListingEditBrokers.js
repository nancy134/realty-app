import React from 'react';
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap';

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
                        <Form.Check
                            key={index}
                            type="checkbox"
                            label={associate.email}
                            defaultChecked={this.state.checkedAssociates[index]}
                            onChange={() => this.handleToggleCheckbox(index)}
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
