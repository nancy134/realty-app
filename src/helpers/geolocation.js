import {
    geocodeByAddress
} from 'react-places-autocomplete';
import Cookies from 'universal-cookie';

export function saveDefaultLocation(props){
    const cookies = new Cookies();
    cookies.set('formatted_address', props.formatted_address);
    cookies.set('lat0', props.lat0);
    cookies.set('lng0', props.lng0);
    cookies.set('lat1', props.lat1);
    cookies.set('lng1', props.lng1);
}

export function getDefaultLocation(){
    const cookies = new Cookies();
    var formatted_address = cookies.get('formatted_address');
    var lat0 = cookies.get('lat0');
    var lng0 = cookies.get('lng0');
    var lat1 = cookies.get('lat1');
    var lng1 = cookies.get('lng1'); 

    var props = {};
    if (formatted_address || formatted_address === "undefined"){
        props = {
            formatted_address: formatted_address,
            lat0: lat0,
            lng0: lng0,
            lat1: lat1,
            lng1: lng1
        };
    } else {
        props = {
            formatted_address: "Stamford, CT, USA",
            address: "Stamford, CT",
            lat0: 41.1796839,
            lat1: 40.96346,
            lng0: -73.495165,
            lng1: -73.633827
        };
    }
    return props; 
}

export function geocodeByAddr(address, values){
    return new Promise(function(resolve, reject){
        geocodeByAddress(address).then(results => {
            resolve(results);
        }).catch(err => {
            reject(err);
        });
    });
}

export function getVerifiedAddresses(address){
    return new Promise(function(resolve, reject){
        geocodeByAddress(address).then(function(results){
            resolve(results);
        }).catch(function(err){
            reject(err);
        });
    });
}

// Given a set of markers, calculate the bounds
// Markers:
// [{
//     id: 1,
//     location: {
//         coordinates: [lat, lng],
//         type: "Point"
//     }
// }]
// Return bounds:

export function calculateBounds(markers){
    var bounds = new window.google.maps.LatLngBounds();
    if (markers){
        var len = markers.length;
        for (var i=0; i<len; i++){
            var marker = markers[i];
            if (marker.location){
                //var point = new maps.LatLng(marker.location.coordinates[0],marker.location.coordinates[1]);
                var point = new window.google.maps.LatLng(marker.location.coordinates[0],marker.location.coordinates[1]);
                bounds.extend(point);
            }
        }
    }
    // Convert to correct format
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    var retBounds = {
        lat0: ne.lat(),
        lng0: ne.lng(),
        lat1: sw.lat(),
        lng1: sw.lng()
    };
    return retBounds;
}

export function addPoint(bounds, point){
    var ne = new window.google.maps.LatLng(bounds.lat0, bounds.lng0);
    var sw = new window.google.maps.LatLng(bounds.lat1, bounds.lng1);
    var newBounds = new window.google.maps.LatLngBounds(sw, ne);
    var newPoint = new window.google.maps.LatLng(point.coordinates[0], point.coordinates[1]);
    newBounds.extend(newPoint);
    return newBounds;
}

const geolocation = {
    geocodeByAddr,
    getVerifiedAddresses,
    calculateBounds,
    addPoint,
    getDefaultLocation,
    saveDefaultLocation
};
export default geolocation;
