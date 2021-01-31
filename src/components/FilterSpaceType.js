import React from 'react';
import {
    Form
} from 'react-bootstrap';
import listings from '../services/listings';

function SpaceTypeItem(props){
    var checked=false;
    if (props.spaceTypeFilters.length === 0 && props.label === "Any"){
        checked = true;
    }
    for (var i=0; i<props.spaceTypeFilters.length; i++){
        if (props.spaceTypeFilters[i] === props.label){
            checked = true;
        }
    }
  
    return(
        <Form.Check
            onChange={props.onChange}
            value={props.value}
            key={props.value}
            type="checkbox"
            label={props.label}
            checked={checked}
        />
    );
}
class FilterSpaceType extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            spaceTypes: null
        };
    }
    handleChange(evt){
       var spaceTypes = this.state.spaceTypes.spaceUses;
       var filters = this.props.spaceTypeFilters;
       if (evt.target.checked){
          if (evt.target.value === "any"){
              filters = ["Any"];
          } else {
              filters.push(spaceTypes[parseInt(evt.target.value)]);
          }
       } else {
           if (evt.target.value === "any"){
           } else {
               var index = filters.indexOf(spaceTypes[parseInt(evt.target.value)]);
               if (index >= 0) {
                   filters.splice( index, 1 );
               }
           }
       }
       this.props.onFilterChange(filters);
    }
    componentDidMount(){
        listings.getSpaceTypes((spaceTypes) => {
           this.setState({
               spaceTypes: spaceTypes
           })
        });
    }
    render(){
        if (this.state.spaceTypes){
            return(
            <div className="m-2">
                <SpaceTypeItem
                    spaceTypeFilters={this.props.spaceTypeFilters}
                    onChange={this.handleChange}
                    value="any"
                    key="any"
                    type="checkbox"
                    label="Any"
                />
                {this.state.spaceTypes.spaceUses.map((spaceType,key) => (
                    <SpaceTypeItem
                        spaceTypeFilters={this.props.spaceTypeFilters}
                        onChange={this.handleChange}
                        value={key}
                        key={key}
                        type="checkbox"
                        label={spaceType}
                    />
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
