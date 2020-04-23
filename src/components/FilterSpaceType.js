import React from 'react';
import {
    Form
} from 'react-bootstrap';
import listings from '../services/listings';

class FilterSpaceType extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            spaceTypes: null,
            filters: [] 
        };
    }
    handleChange(evt){
       var spaceTypes = this.state.spaceTypes.spaceUses;
       var filters = this.state.filters;
       if (evt.target.checked){
          filters.push(spaceTypes[parseInt(evt.target.value)]);
       } else {
           var index = filters.indexOf(spaceTypes[parseInt(evt.target.value)]);
           if (index >= 0) {
               filters.splice( index, 1 );
           }
       }
       console.log("filters: "+JSON.stringify(filters));
       this.props.onFilterChange(filters);
       this.setState({
           filters: filters
       });
    }
    componentDidMount(){
        listings.getSpaceTypes((spaceTypes) => {
           console.log("spaceTypes: "+JSON.stringify(spaceTypes));
           this.setState({
               spaceTypes: spaceTypes
           })
        });
    }
    render(){
        if (this.state.spaceTypes){
            return(
            <div className="m-2">
                {this.state.spaceTypes.spaceUses.map((spaceType,key) => (
                    <Form.Check onChange={this.handleChange} value={key} key={key} type="checkbox" label={spaceType} />
                ))}
            </div>

            );
        } else {
            return(
                <div>Loading...</div>
            );
        }
    }
}

export default FilterSpaceType;
