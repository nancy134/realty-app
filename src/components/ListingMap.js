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
        return (
            <Map
                google={this.props.google}
                zoom={13}
                initialCenter={{ lat: 42.372376, lng: -71.236423}}
            >
                {this.displayMarkers()}
            </Map>
        );
    } 
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4'
})(ListingMap);
