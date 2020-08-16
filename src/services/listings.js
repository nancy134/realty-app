var rp = require('request-promise');

export function getAll(query,cb){
    var url = "";
    if (query) {
        url = process.env.REACT_APP_LISTING_SERVICE+"listings?"+query;
    } else {
        url = process.env.REACT_APP_LISTING_SERVICE+"listings";
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
    var url = process.env.REACT_APP_LISTING_SERVICE+"listings/"+index+"/directPublications";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
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

export function unpublish(index, cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"listings/"+index+"/publications";

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
    create, 
    update, 
    getEnums, 
    getEnumsPromise,
    publish, 
    unpublish, 
    getSpaceTypes, 
    getListingTypes,
    deleteListing,
    findAddress
};
export default listings;


