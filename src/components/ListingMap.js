import React from 'react';
import { 
    Map,
    GoogleApiWrapper,
    Marker,
    InfoWindow,
    Polygon
} from 'google-maps-react';

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
        this.handleZoomChanged = this.handleZoomChanged.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
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

    makeBounds = (map) => {
        var bounds = new this.props.google.maps.LatLngBounds();
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
        map.fitBounds(bounds);
        this.setState({
            bounds: bounds
        });

    }

    onReady = (mapProps, map) => {
        this.makeBounds(map);
    }
    handleZoomChanged(props, map){
        var mapBounds = map.getBounds();
        var ne = mapBounds.getNorthEast();
        var sw = mapBounds.getSouthWest();
        var bounds = {
            lat0: ne.lat(),
            lng0: ne.lng(),
            lat1: sw.lat(),
            lng1: sw.lng()
        };
        this.props.onBoundsChange(bounds);

    }
    handleDragEnd(props, map){
        var mapBounds = map.getBounds();
        var ne = mapBounds.getNorthEast();
        var sw = mapBounds.getSouthWest();
        var bounds = {
            lat0: ne.lat(),
            lng0: ne.lng(),
            lat1: sw.lat(),
            lng1: sw.lng()
        };
        this.props.onBoundsChange(bounds);
    }
    render(){
        const showDetail = this.props.showDetail;

        const polygon = [
           {lat: parseFloat(this.props.lat0), lng: parseFloat(this.props.lng0)},
           {lat: parseFloat(this.props.lat1), lng: parseFloat(this.props.lng0)},
           {lat: parseFloat(this.props.lat1), lng: parseFloat(this.props.lng1)},
           {lat: parseFloat(this.props.lat0), lng: parseFloat(this.props.lng1)},
           {lat: parseFloat(this.props.lat0), lng: parseFloat(this.props.lng0)}
        ];

        if (!showDetail) {
            return (
            <Map
                className="map"
                google={this.props.google}
                onReady={this.onReady}
                onClick={this.onMapClicked}
                style={{ height: '100%', position: 'relative', width: '100%' }}
                onZoomChanged={this.handleZoomChanged}
                onDragend={this.handleDragEnd}
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
               { false ?
               <Polygon
                   paths={polygon}
                   strokeColor="#0000FF"
                   strokeOpacity={0.8}
                   strokeWeight={2}
                   fillColor="#0000FF"
                   fillOpacity={0.35}
               />
               : null}
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
