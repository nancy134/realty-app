import React from 'react';
import { 
    Map,
    GoogleApiWrapper,
    Marker,
    InfoWindow
} from 'google-maps-react';
import Geocode from 'react-geocode';

class ListingMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [
                {latitude: 42.372376, longitude: -71.236423},
                {latitude: 42.397269, longitude: -71.255798},
                {latitude: 42.377510, longitude: -71.225547},
                {latitude: 42.371878, longitude: -71.237794}
            ],
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false
        } 
        this.handleChange = this.handleChange.bind(this);  
    }

    handleChange(e) {
        this.props.onShowDetailChange(e.target.value);
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
    }

    onInfoWindowClose = () => {
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });
    }

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    displayMarkers = () => {
        if (this.props.listings){
            var listings = this.props.listings;
            return listings.map((listing, index) => {
                return <Marker
                    key={index}
                    name={listing.address}
                    onClick={this.onMarkerClick}
                    position={{ lat: listing.location.coordinates[0], lng: listing.location.coordinates[1] }}
                />

            })
        } else {
            return null;
        }
    }

    makeBounds = () => {
        var bounds = new this.props.google.maps.LatLngBounds();
        var nePoint = {};
        var swPoint = {};
        console.log("this.props.lat0: "+this.props.lat0);

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

        this.setState({
            bounds: bounds
        });

    }

    onReady = () => {
        this.makeBounds();
    }

    render(){
        const showDetail = this.props.showDetail;
        console.log("bounds: "+this.state.bounds);
        if (!showDetail) {
            return (
            <Map
                className="map"
                google={this.props.google}
                onReady={this.onReady}
                onClick={this.onMapClicked}
                style={{ height: '100%', position: 'relative', width: '100%' }}
                bounds={this.state.bounds}
            >
                {this.displayMarkers()}

               <InfoWindow
                   marker={this.state.activeMarker}
                   onClose={this.onInfoWindowClose}
                   visible={this.state.showingInfoWindow}
               >
                   <div>
                       <p>{this.state.selectedPlace.name}</p>
                   </div>
               </InfoWindow>
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
