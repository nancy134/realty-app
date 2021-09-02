import React from 'react';
import { 
    Map,
    GoogleApiWrapper,
    Marker,
    Polygon
} from 'google-maps-react';
//import geolocationService from '../helpers/geolocation';
import {
    Button,
    Image,
    Row,
    Col
} from 'react-bootstrap';
import InfoWindowEx from '../components/InfoWindowEx';

function MapItem(props) {

    var imageUrl = "";
    if (props.listing.images && props.listing.images.length > 0){
        imageUrl = props.listing.images[0].url;
    }

    var listingPrice = "";
    if (props.listing.listingPrice) {
        var floatPrice = parseFloat(props.listing.listingPrice);
        listingPrice = floatPrice.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    return (
            <div style={{ width:`auto`, overflow:`hidden`}}>
                    <Row>
                        
                        <Col xs={4}>
                        {imageUrl ?
                            <Image
                            src={imageUrl}
                            className="border-0 list-image"
                            thumbnail
                            style={{maxHeight:`75px`}}
                            />
                        : <Image
                        src="/default.jpg"
                        className="border-0 list-image"
                        thumbnail
                        style={{maxHeight:`75px`}}
                        /> }
                        </Col>

                        <Col xs={8}>
                            <div style={{ fontSize:`11.5pt`}}>
                            {props.listing.name}<br />
                            {props.listing.city}, {props.listing.state}
                            </div>
                            { listingPrice ?
                            <div>${listingPrice}</div>
                            : null }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                        {props.listing.desc}
                        </Col>
                    </Row>
            <div style={{display:`flex`,justifyContent:`center`,alignItems:`center`}}>
                <Button
                variant="link"
                size="sm"
                className="p-0"
                onClick={() => props.onInfoWindowClick(props.listing)}
            >
                View Listing
            </Button>
            </div>
            </div>
    )
}

class ListingMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false
        } 
        this.handleChange = this.handleChange.bind(this);
        this.handleZoomChanged = this.handleZoomChanged.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleInfoWindowClick = this.handleInfoWindowClick.bind(this);
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

    handleInfoWindowClick(selectedPlace){
        this.props.onShowDetailChange(true, selectedPlace.listingId, selectedPlace.publishStatus);
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
        if (this.props.markers){
            var markers = this.props.markers;
            
            return markers.map((marker, index) => {
                if (marker.location){
                    return <Marker
                        key={index}
                        name={marker.address}
                        city={marker.city}
                        state={marker.state}
                        listingId={marker.id}
                        desc={marker.shortDescription}
                        listingPrice={marker.listingPrice}
                        images={marker.images}
                        publishStatus={marker.publishStatus}
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
    }
    handleZoomChanged(props, map){

        var mapBounds = map.getBounds();
        if (mapBounds){
        var ne = mapBounds.getNorthEast();
        var sw = mapBounds.getSouthWest();
        var bounds = {
            lat0: ne.lat(),
            lng0: ne.lng(),
            lat1: sw.lat(),
            lng1: sw.lng()
        };
        var center = map.getCenter();
        var zoomLevel = map.getZoom();
        if (this.props.onBoundsChange) this.props.onBoundsChange(bounds, center, zoomLevel);
        }
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
        var center = map.getCenter();
        var zoomLevel = map.getZoom();
        if (this.props.onBoundsChange) this.props.onBoundsChange(bounds, center, zoomLevel);
    }
    componentDidUpdate(){
        var bounds = new this.props.google.maps.LatLngBounds();
        var nePoint = {
            lat: parseFloat(this.props.bounds.lat0),
            lng: parseFloat(this.props.bounds.lng0)
        };
        var swPoint = {
            lat: parseFloat(this.props.bounds.lat1),
            lng: parseFloat(this.props.bounds.lng1)
        };
        bounds.extend(nePoint);
        bounds.extend(swPoint);
        if (this.refs.resultMap && this.props.updateBounds){
            if (!this.props.center){
                this.refs.resultMap.map.fitBounds(bounds);
            } else {
                this.refs.resultMap.map.setCenter(this.props.center);
                this.refs.resultMap.map.setZoom(this.props.zoomLevel);
            }
        }
        if (this.props.updateZoomLevel){
            this.refs.resultMap.map.setZoom(this.props.zoomLevel);
        }
    }
    componentDidMount(){
        var bounds = new this.props.google.maps.LatLngBounds();
        var nePoint = {
            lat: parseFloat(this.props.bounds.lat0),
            lng: parseFloat(this.props.bounds.lng0)
        };
        var swPoint = {
            lat: parseFloat(this.props.bounds.lat1),
            lng: parseFloat(this.props.bounds.lng1)
        };
        bounds.extend(nePoint);
        bounds.extend(swPoint);
        if (this.refs.resultMap && this.props.updateBounds){
            if (!this.props.center){
                this.refs.resultMap.map.fitBounds(bounds);
            } else {
                this.refs.resultMap.map.setCenter(this.props.center);
                this.refs.resultMap.map.setZoom(this.props.zoomLevel);
            }
        }

    }
    render(){
        const showDetail = this.props.showDetail;
        
        const polygon = [
           {lat: parseFloat(this.props.bounds.lat0), lng: parseFloat(this.props.bounds.lng0)},
           {lat: parseFloat(this.props.bounds.lat1), lng: parseFloat(this.props.bounds.lng0)},
           {lat: parseFloat(this.props.bounds.lat1), lng: parseFloat(this.props.bounds.lng1)},
           {lat: parseFloat(this.props.bounds.lat0), lng: parseFloat(this.props.bounds.lng1)},
           {lat: parseFloat(this.props.bounds.lat0), lng: parseFloat(this.props.bounds.lng0)}
        ];
        if (!showDetail) {
            return (
                <Map
                    className="map"
                    google={this.props.google}
                    onReady={this.onReady}
                    onClick={this.onMapClicked}
                    onZoomChanged={this.handleZoomChanged}
                    onDragend={this.handleDragEnd}
                    containerStyle={this.props.style}
                    gestureHandling={this.props.gestureHandling}
                    ref="resultMap"
                >
                    {this.displayMarkers()}

                    <InfoWindowEx
                        marker={this.state.activeMarker}
                        onClose={this.onInfoWindowClose}
                        visible={this.state.showingInfoWindow}
                    >
                        <MapItem
                            listing={this.state.selectedPlace}
                            onInfoWindowClick={this.handleInfoWindowClick}
                        />
                    </InfoWindowEx>
                    {false ?
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
