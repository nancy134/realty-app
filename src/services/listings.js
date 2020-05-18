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

export function create(listing,cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"listings";
    fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(listing)
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function update(data,cb){
    console.log("data.ListingId: "+data.ListingId);
    var url = process.env.REACT_APP_LISTING_SERVICE+"listings/"+data.ListingId;
    fetch(url, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(checkStatus).then(parseJSON).then(cb);
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
    getListingTypes
};
export default listings;


