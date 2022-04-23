import React from 'react';
import {
    GoogleMap,
    Marker,
    InfoWindow
} from '@react-google-maps/api';

import {
    Button,
    Image,
    Row,
    Col
} from 'react-bootstrap';

const containerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%'
};

class MapMarker extends React.Component {
    state = {
        mapMarker: null,
        showingInfoWindow: false
    };

    onMarkerClick = (props) => {
        this.setState({
            showingInfoWindow: true,
        });
        this.props.onMarkerClicked(this);
    };

    onInfoWindowClose = () =>
        this.setState({
            showingInfoWindow: false
        });

    onLoad = (mapMarker) => {
        this.setState({
             mapMarker
        });
    };

    render() {
        //const { clusterer, markerData } = this.props;
        return (
            <Marker
                onLoad={this.onLoad}
                position={this.props.position}
                clickable
                onClick={() => this.onMarkerClick(this.props.listingId)}
             >
                {this.state.showingInfoWindow === true && (
                <InfoWindow
                    position={this.props.position}
                    onCloseClick={this.onInfoWindowClose}
                >
                    <MapItem
                        city={this.props.city}
                        state={this.props.state}
                        listingId={this.props.listingId}
                        desc={this.props.desc}
                        listingPrice={this.props.listingPrice}
                        images={this.props.images}
                        publishStatus={this.props.publishStatus}
                        onInfoWindowClick={this.props.onInfoWindowClick}
                    />
               </InfoWindow>
               )}
            </Marker>
        );
    }
}

function displayMarkers(props){
    if (props.markers){
        var markers = props.markers;

        return markers.map((marker, index) => {

            if (marker.location){
                return <MapMarker
                    key={index}
                    name={marker.address}
                    city={marker.city}
                    state={marker.state}
                    listingId={marker.id}
                    desc={marker.shortDescription}
                    listingPrice={marker.listingPrice}
                    images={marker.images}
                    publishStatus={marker.publishStatus}
                    onClick={() => props.onMarkerClick(marker.id)}
                    position={{ lat: marker.location.coordinates[0], lng: marker.location.coordinates[1] }}
                    onInfoWindowClick={props.onInfoWindowClick}
                    onMarkerClicked={props.onMarkerClicked}
                >
                </MapMarker>
            } else {
                return null;
            }

        })
    } else {
        return null;
    }
}

function MapItem(props) {

    var imageUrl = "";
    if (props.images && props.images.length > 0){
        imageUrl = props.images[0].url;
    }

    var listingPrice = "";
    if (props.listingPrice) {
        var floatPrice = parseFloat(props.listingPrice);
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
                    :
                    <Image
                        src="/default.jpg"
                        className="border-0 list-image"
                        thumbnail
                        style={{maxHeight:`75px`}}
                    />
                    }
                </Col>
                <Col xs={8}>
                    <div style={{ fontSize:`11.5pt`}}>
                        {props.name}<br />
                        {props.city}, {props.state}
                    </div>
                    { listingPrice ?
                    <div>${listingPrice}</div>
                    : null }
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {props.desc}
                        </Col>
                    </Row>
            <div style={{display:`flex`,justifyContent:`center`,alignItems:`center`}}>
                <Button
                variant="link"
                size="sm"
                className="p-0"
                onClick={() => props.onInfoWindowClick(props.listingId, props.publishStatus)}
            >
                View Listing
            </Button>
        </div>
    </div>
    );
}

function MyMap(props) {
    /*
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB47KccZa8VRlzFuQJAvZ8UPembfW-3gq4"
    })
    */
    const [map, setMap] = React.useState(null)
    
    const onLoad = React.useCallback(function callback(map, props) {
       
        const bounds = new window.google.maps.LatLngBounds();
        var nePoint = {
            lat: parseFloat(props.bounds.lat0),
            lng: parseFloat(props.bounds.lng0)
        };
        var swPoint = {
            lat: parseFloat(props.bounds.lat1),
            lng: parseFloat(props.bounds.lng1)
        };
        bounds.extend(nePoint);
        bounds.extend(swPoint);
        if (props.updateBounds){
            if (!props.center){
                map.fitBounds(bounds);
            } else {
                map.setCenter(props.center);
                map.setZoom(props.zoomLevel);
            }
        }
        setMap(map)
        props.onLoad(map);
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onZoomChanged = React.useCallback(function callback(map, props) {
        if (map) props.onZoomChanged(map, props);
    }, [])

    const onDragEnd = React.useCallback(function callback(map, props) {
        if (map) props.onDragEnd(map, props);
    }, [])

    var style = containerStyle;
    if (props.style) {
        style = props.style;
    }

    var gestureHandling = "auto";
    var zoomControl = true;
    if (props.boundsChanging){
        gestureHandling = "none";
        zoomControl = false;
    }

    var mapOptions = {
        gestureHandling: gestureHandling,
        zoomControl: zoomControl
    };
    return  (
        <GoogleMap
            mapContainerStyle={style}
            options={mapOptions}
            center={props.center}
            zoom={props.zoomLevel}
            onLoad={(map) => onLoad(map, props)}
            onUnmount={onUnmount}
            onZoomChanged={() => onZoomChanged(map, props)}
            onDragEnd={() => onDragEnd(map, props)}
        >
            { /* Child components, such as markers, info windows, etc. */ }
            { displayMarkers(props) }
        <></>
        </GoogleMap>
    ); 
}

class ListingMapNew extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeMarker: null,
            selectedPlace: {},
            showingInfoWindow: false,
            map: null
        } 
        this.handleChange = this.handleChange.bind(this);
        this.handleZoomChanged = this.handleZoomChanged.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleInfoWindowClick = this.handleInfoWindowClick.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.handleMarkerClicked = this.handleMarkerClicked.bind(this);
    }

    handleMarkerClicked(marker){
        if (this.state.activeMarker){
            this.state.activeMarker.setState({
                showingInfoWindow: false
            });
        }
        this.setState({
            activeMarker: marker
        });
    }

    handleLoad(map){
        this.setState({
            map: map
        });
    }

    handleChange(e) {
        this.props.onShowDetailChange(e.target.value);
    }

    onInfoWindowClose = () => {
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });
    }

    handleInfoWindowClick(id, publishStatus){
        this.props.onShowDetailChange(true,id, publishStatus);
    }
    onMapClicked = () => {
        if (this.state.showingInfoWindow){
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
        } 
    };

    onReady = (mapProps, map) => {
    }
    handleZoomChanged(map, props){
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
    handleDragEnd(map, props){
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
        var bounds = new window.google.maps.LatLngBounds();
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
        if (this.state.map && this.props.updateBounds){
            if (!this.props.center){
                this.state.map.fitBounds(bounds);
            } else {
                this.state.map.setCenter(this.props.center);
                this.state.map.setZoom(this.props.zoomLevel);
            }
        }
        if (this.state.map && this.props.updateZoomLevel){
            this.state.map.setZoom(this.props.zoomLevel);
        }
    }
    componentDidMount(){
    }
    render(){
        const showDetail = this.props.showDetail;
        /* 
        const polygon = [
           {lat: parseFloat(this.props.bounds.lat0), lng: parseFloat(this.props.bounds.lng0)},
           {lat: parseFloat(this.props.bounds.lat1), lng: parseFloat(this.props.bounds.lng0)},
           {lat: parseFloat(this.props.bounds.lat1), lng: parseFloat(this.props.bounds.lng1)},
           {lat: parseFloat(this.props.bounds.lat0), lng: parseFloat(this.props.bounds.lng1)},
           {lat: parseFloat(this.props.bounds.lat0), lng: parseFloat(this.props.bounds.lng0)}
        ];
        */
        if (!showDetail) {
            return (
                <MyMap
                    style={this.props.style}
                    bounds={this.props.bounds}
                    center={this.props.center}
                    zoomLevel={this.props.zoomLevel}
                    markers={this.props.markers}
                    onMarkerClicked={this.handleMarkerClicked}
                    onInfoWindowClose={this.onInfoWindowClose}
                    showingInfoWindow={this.state.showingInfoWindow}
                    onZoomChanged={this.handleZoomChanged}
                    onDragEnd={this.handleDragEnd}
                    onLoad={this.handleLoad}
                    onInfoWindowClick={this.handleInfoWindowClick}
                    boundsChanging={this.props.boundsChanging}
                >
                </MyMap>

            );
        } else {
             return null;
        }
    } 
}

export default ListingMapNew;
