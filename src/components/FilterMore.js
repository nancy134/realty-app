import React from 'react';
import {
    Form,
    Col,
    Row
} from 'react-bootstrap';
import listings from '../services/listings';
import _ from 'lodash';

class FilterMore extends React.Component {
    constructor(props){
        super(props);
        this.handleListingTypeChange = this.handleListingTypeChange.bind(this);
        this.handleMinSizeChange = this.handleMinSizeChange.bind(this);
        this.handleMaxSizeChange = this.handleMaxSizeChange.bind(this);
        this.handleMinRateChange = this.handleMinRateChange.bind(this);
        this.handleMaxRateChange = this.handleMaxRateChange.bind(this);
        this.state = {
            minSize: "", 
            maxSize: "",
            minRate: "",
            maxRate: "",
            listingTypes: null,
            listingType: "All"
        };
        this.onMoreFilterChange = _.debounce(this.onMoreFilterChange, 2000);
    }

    handleListingTypeChange(e){
        this.setState({
            listingType: e.target.value
        }, () => {
            this.onMoreFilterChange(this.state);
        }); 
    }
    handleMinSizeChange(e){
        this.setState({
            minSize: e.target.value
        }, () => {
            this.onMoreFilterChange(this.state);
        });
    }
    handleMaxSizeChange(e){
        this.setState({
            maxSize: e.target.value
        }, () => {
            this.onMoreFilterChange(this.state);
        });
    }
    handleMinRateChange(e){
        this.setState({
            minRate: e.target.value
        }, () => {
            this.onMoreFilterChange(this.state);
        });
    }
    handleMaxRateChange(e){
        this.setState({
            maxRate: e.target.value
        }, () => {
            this.onMoreFilterChange(this.state);
        });
    }
    onMoreFilterChange(){
        this.props.onMoreFilterChange(this.state);
    }
    componentDidMount(){
        listings.getListingTypes((listingTypes) => {
            this.setState({
                listingTypes: listingTypes
            });
        });
    }
    
    render(){
        if (this.state.listingTypes){
        return(
        <div>
            <Form.Group as={Row} className="mr-1 ml-1">
                <Form.Label column sm="4">Available Space</Form.Label>
                <Col sm="4">
                    <Form.Control 
                        placeholder="Min" 
                        value={this.state.minSize}
                        onChange={this.handleMinSizeChange} />
                </Col>
                <Col sm="4">
                    <Form.Control 
                        placeholder="Max"
                        value={this.state.maxSize}
                        onChange={this.handleMaxSizeChange} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mr-1 ml-1">
                <Form.Label column sm="4">Lease Rate</Form.Label>
                <Col sm="4">
                    <Form.Control 
                        placeholder="Min"
                        value={this.state.minRate}
                        onChange={this.handleMinRateChange}/>
                </Col>
                <Col sm="4">
                    <Form.Control 
                        placeholder="Max"
                        value={this.state.maxRate}
                        onChange={this.handleMaxRateChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mr-1 ml-1">
                <Form.Label column sm="4">Listing Type</Form.Label>
                <Col sm="4">
                    <Form.Control 
                        as="select"
                        value={this.state.listingType}
                        onChange={this.handleListingTypeChange}>
                        <option key="-1">All</option>
                        {this.state.listingTypes.listingTypes.map((listingType, key) => (
                            <option key={key}>{listingType}</option>
                        ))}
                    </Form.Control>
                </Col>
            </Form.Group>
        </div>
        );
        } else {
            return(<div>Loading...</div>);
        }
    }

}

export default FilterMore;
