import {
    geocodeByAddress
} from 'react-places-autocomplete';

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

export function calculateBounds(maps, bounds, markers){
    if (markers){
        var len = markers.length;
        for (var i=0; i<len; i++){
            var marker = markers[i];
            if (marker.location){
                var point = new maps.LatLng(marker.location.coordinates[0],marker.location.coordinates[1]);
                bounds.extend(point);
            }
        }
    }

    return bounds;
}

const geolocation = {
    geocodeByAddr,
    getVerifiedAddresses,
    calculateBounds
};
export default geolocation;
