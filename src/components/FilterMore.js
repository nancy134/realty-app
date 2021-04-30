import React from 'react';
import {
    Form,
    Col,
    Row,
    InputGroup
} from 'react-bootstrap';

class FilterMore extends React.Component {
    constructor(props){
        super(props);
        this.handleMinSizeChange = this.handleMinSizeChange.bind(this);
        this.handleMaxSizeChange = this.handleMaxSizeChange.bind(this);
        this.handleMinRateChange = this.handleMinRateChange.bind(this);
        this.handleMaxRateChange = this.handleMaxRateChange.bind(this);
    }

    handleMinSizeChange(e){
        var moreFilters = {
            minSize: e.target.value,
            maxSize: this.props.moreFilters.maxSize,
            minPrice: this.props.moreFilters.minPrice,
            maxPrice: this.props.moreFilters.maxPrice            
        }
        this.props.onMoreFilterChange(moreFilters);
    }

    handleMaxSizeChange(e){
        var moreFilters = {
            minSize: this.props.moreFilters.minSize,
            maxSize: e.target.value, 
            minPrice: this.props.moreFilters.minPrice,
            maxPrice: this.props.moreFilters.maxPrice
        }
        this.props.onMoreFilterChange(moreFilters);
    }

    handleMinRateChange(e){
        var moreFilters = {
            minSize: this.props.moreFilters.minSize,
            maxSize: this.props.moreFilters.maxSize,
            minPrice: e.target.value,
            maxPrice: this.props.moreFilters.maxPrice
        }
        this.props.onMoreFilterChange(moreFilters);
    }
    handleMaxRateChange(e){
        var moreFilters = {
            minSize: this.props.moreFilters.minSize,
            maxSize: this.props.moreFilters.maxSize,
            minPrice: this.props.moreFilters.minPrice,
            maxPrice: e.target.value 
        }
        this.props.onMoreFilterChange(moreFilters);
    }
    componentDidMount(){
    }
    
    render(){
        return(
        <div>
            <Form.Group as={Row} className="mr-1 ml-1">
                <Form.Label column sm="4">Available Space</Form.Label>
                <Col sm="4">
                    <InputGroup>
                        <Form.Control 
                            id="filter_min_size"
                            placeholder="Min" 
                            value={this.props.moreFilters.minSize}
                            onChange={this.handleMinSizeChange}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>sf</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col sm="4">
                    <InputGroup>
                        <Form.Control
                            id="filter_max_size"
                            placeholder="Max"
                            value={this.props.moreFilters.maxSize}
                            onChange={this.handleMaxSizeChange}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>sf</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mr-1 ml-1">
                <Form.Label column sm="4">Lease Rate</Form.Label>
                <Col sm="4">
                    <InputGroup>
                        <Form.Control
                            id="filter_min_rate"
                            placeholder="Min"
                            value={this.props.moreFilters.minRate}
                            onChange={this.handleMinRateChange}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>sf/yr</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col sm="4">
                    <InputGroup>
                        <Form.Control 
                            id="filter_max_rate"
                            placeholder="Max"
                            value={this.props.moreFilters.maxRate}
                            onChange={this.handleMaxRateChange}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>sf/yr</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Form.Group>
        </div>
        );
    }

}

export default FilterMore;
