import rp from 'request-promise';
import fetch from 'node-fetch';
import axiosInstance from './axios';

export function getAll(query, listingMode){
    var url = "";
    if (listingMode === "myListings"){
        url = process.env.REACT_APP_API+"listings/me";
    } else {
        url = process.env.REACT_APP_API+"listings";
    }
    if (query) {
        url += "?"+query;
    }

    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getMarkers(query, listingMode){
    var url = "";
    if (listingMode === "myListings") {
        url = process.env.REACT_APP_API+"listingMarkers/me";
    } else {
        url = process.env.REACT_APP_API+"listingMarkers";
    }
    if (query){
        url += "?" + query;
    }
    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            url: url
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });

}

export function get(index){
    var url = process.env.REACT_APP_API+"listings/"+index;
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
    var url = process.env.REACT_APP_API+"listings";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            url: url,
            data: listing
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
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
        axiosInstance(options).then(function(result){
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
        axiosInstance(options).then(function(result){
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

export function addListingUser(body){
    var url = process.env.REACT_APP_API+"listings/users";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'POST',
            data: body
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function deleteListingUser(listingVersionId, userId){
    var url = process.env.REACT_APP_API + "listings/"+listingVersionId+"/users/"+userId;
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'DELETE'
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
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
    findAddress,
    addListingUser,
    deleteListingUser
};
export default listings;


