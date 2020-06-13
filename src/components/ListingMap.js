import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class ListingMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [
                {latitude: 42.372376, longitude: -71.236423},
                {latitude: 42.397269, longitude: -71.255798},
                {latitude: 42.377510, longitude: -71.225547},
                {latitude: 42.371878, longitude: -71.237794}
            ]
        } 
        this.handleChange = this.handleChange.bind(this);  
    }

    handleChange(e) {
        this.props.onShowDetailChange(e.target.value);
    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
            onClick={() => console.log("You clicked me!")} />
        })
    }

    render(){
        const showDetail = this.props.showDetail;
        var bounds = new this.props.google.maps.LatLngBounds();
        console.log("this.props.lat0: "+this.props.lat0);
        var nePoint = {};
        var swPoint = {};
        if (this.props.lat0){
            nePoint = { 
                lat: parseFloat(this.props.lat0), 
                lng: parseFloat(this.props.lng0) 
            };
            swPoint = { 
                lat: parseFloat(this.props.lat1), 
                lng: parseFloat(this.props.lng1) 
            };
        } else {
            nePoint = {
                lat: 42.424226,
                lng: -71.1938809
            };
            swPoint = {
                lat: 42.353715,
                lng: -71.285501
            };
        }
          
        bounds.extend(nePoint);
        bounds.extend(swPoint);
        if (!showDetail) {
            return (
                <Map
                    google={this.props.google}
                    bounds={bounds}
                >
                    {this.displayMarkers()}
                </Map>
            );
        } else {
             return null;
        }
    } 
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(ListingMap);
