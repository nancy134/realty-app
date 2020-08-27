import React from 'react';
import { 
    Map,
    GoogleApiWrapper,
    Marker,
    InfoWindow,
    Polygon
} from 'google-maps-react';
import geolocationService from '../helpers/geolocation';

class ListingMap extends React.Component {
    constructor(props) {
        console.log("constructor");
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
        this.initialZoom = true;
        this.actualBounds = {
            lat0: null,
            lng0: null,
            lat1: null,
            lng1: null
        };
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
        if (this.state.showingInfoWindow){
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
        } 
    };

    displayMarkers = () => {
        console.log("displayMarkers");
        if (this.props.markers){
            var markers = this.props.markers;
            
            return markers.map((marker, index) => {
                if (marker.location){
                return <Marker
                    key={index}
                    name={marker.address}
                    onClick={this.onMarkerClick}
                    position={{ lat: marker.location.coordinates[0], lng: marker.location.coordinates[1] }}
                />
                } else {
                return null;
                }

            })
        } else {
            return null;
        }
    }

    onReady = (mapProps, map) => {
        console.log("onReady");
    }
    handleZoomChanged(props, map){
        console.log("handleZoomChanged");
        var mapBounds = map.getBounds();
        var ne = mapBounds.getNorthEast();
        var sw = mapBounds.getSouthWest();
        var bounds = {
            lat0: ne.lat(),
            lng0: ne.lng(),
            lat1: sw.lat(),
            lng1: sw.lng()
        };
        if (this.initialZoom){
             this.initialZoom = false;
             this.actualBounds.lat0 = ne.lat();
             this.actualBounds.lng0 = ne.lng();
             this.actualBounds.lat1 = sw.lat();
             this.actualBounds.lng1 = sw.lng(); 
             bounds = {
                 lat0: this.props.lat0,
                 lng0: this.props.lng0,
                 lat1: this.props.lat1,
                 lng1: this.props.lng1
             }
             //this.props.onBoundsChange(bounds);
        } else {
            this.handlingZoom = true;
            this.props.onBoundsChange(bounds);
        }

    }
    handleDragEnd(props, map){
        console.log("handleDragEnd");
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
    componentDidUpdate(){
        console.log("componentDidUpdate");
        this.initialZoom = true;
        var bounds = new this.props.google.maps.LatLngBounds();
        if (!this.props.lat0){
            geolocationService.calculateBounds(this.props.google.maps, bounds, this.props.markers);
        } else {
            var nePoint = {
                lat: parseFloat(this.props.lat0),
                lng: parseFloat(this.props.lng0)
            };
            var swPoint = {
                lat: parseFloat(this.props.lat1),
                lng: parseFloat(this.props.lng1)
            };
            bounds.extend(nePoint);
            bounds.extend(swPoint);
        }
        if (!this.handlingZoom){
            this.refs.resultMap.map.fitBounds(bounds);
            this.handlingZoom = false;
        } 
    }
    render(){
        console.log("render");
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
                ref="resultMap"
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
