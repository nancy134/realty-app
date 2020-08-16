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

const geolocation = {
    geocodeByAddr,
    getVerifiedAddresses
};
export default geolocation;
