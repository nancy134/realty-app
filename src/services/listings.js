import authenticationService from '../helpers/authentication';
import rp from 'request-promise';
import fetch from 'node-fetch';
import axios from 'axios';

export function getAll(query){
    var url = "";
    if (query) {
        url = process.env.REACT_APP_LISTING_SERVICE+"listings?"+query;
    } else {
        url = process.env.REACT_APP_LISTING_SERVICE+"listings";
    }

    var jwt = authenticationService.getJwt();

    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            headers: {'Authorization': jwt}
        };
        fetch(url, options)
            .then(res => res.json())
            .then(json => resolve(json))
            .catch(err => reject(err));
    });
}

export function getMarkers(query){
    var url = "";
    if (query) {
        url = process.env.REACT_APP_LISTING_SERVICE+"listingMarkers?"+query;
    } else {
        url = process.env.REACT_APP_LISTING_SERVICE+"listingMarkers";
    }

    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            uri: url,
            json: true
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err.error);
        });
    });

}

export function get(index){
    var url = process.env.REACT_APP_LISTING_SERVICE+"listings/"+index;
    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            uri: url,
            json: true
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err.error);
        });
    });
}

export function getEnumsPromise(){
    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            uri: process.env.REACT_APP_LISTING_SERVICE+"enums",
            json: true
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err.error);
        });
    });
}
export function getEnums(cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"enums";
    return fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function create(listing){
    var url = process.env.REACT_APP_LISTING_SERVICE+"listings";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            uri: url,
            json: true,
            body: listing
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err.error);
        });
    });
}

export function update(data,cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"listings/"+data.ListingId;
    return new Promise(function(resolve, reject){
        var options = {
            method: 'PUT',
            uri: url,
            json: true,
            body: data
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err.error);
        });
    });
}

export function publish(index){
    var url = process.env.REACT_APP_API+"listings/"+index+"/directPublications";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            url: url
        };
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function unpublish(index){
    var url = process.env.REACT_APP_API+"listings/"+index+"/publications";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'delete',
            url: url
        };
        axios(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function deleteListing(id){
    var url = process.env.REACT_APP_LISTING_SERVICE+"listings/"+id;
    return new Promise(function(resolve, reject){
        var options = {
            method: 'delete',
            uri: url,
            json: true
        };
        rp(options).then(function(parsedBody){
           resolve(parsedBody);
        }).catch(function(err){
           reject(err.error);
        });
    });
}

export function deleteDraftListing(id){
    var url = process.env.REACT_APP_LISTING_SERVICE+"listingVersions/"+id;
    return new Promise(function(resolve, reject){
        var options = {
            method: 'delete',
            uri: url,
            json: true
        };
        rp(options).then(function(parsedBody){
           resolve(parsedBody);
        }).catch(function(err){
           reject(err.error);
        });
    });
}

export function findAddress(address, city, state, owner){
    var url = process.env.REACT_APP_LISTING_SERVICE+"addresses?address="+address+"&city="+city+"&state="+state+"&owner="+owner;
    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            uri: url,
            json: true
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err.error);
        });
    });
}

export function getSpaceTypes(cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"spaceUses";
    fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function getListingTypes(cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"listingTypes";
    fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}

function checkStatus(response){
    if (response.status >= 200 && response.status < 300){
        return response;
    }

    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response
    console.log(error);
    throw error;
}

function parseJSON(response){
   return response.json();
}

const listings = {
    get, 
    getAll,
    getMarkers,
    create, 
    update, 
    getEnums, 
    getEnumsPromise,
    publish, 
    unpublish, 
    getSpaceTypes, 
    getListingTypes,
    deleteListing,
    deleteDraftListing,
    findAddress
};
export default listings;


