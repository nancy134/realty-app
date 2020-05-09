var rp = require('request-promise');

export function getAll(query,cb){
    var url = "";
    if (query) {
        url = process.env.REACT_APP_LISTING_SERVICE+"units?"+query;
    } else {
        url = process.env.REACT_APP_LISTING_SERVICE+"units";
    }
    return fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function get(index, cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"units/"+index;
    return fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}
export function createPromise(unit){
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            uri: process.env.REACT_APP_LISTING_SERVICE+"units",
            body: unit,
            json: true
        }
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err.error);
        });
    });
}

export function updatePromise(data){
    return new Promise(function(resolve, reject){
        var options = {
            method: 'PUT',
            uri: process.env.REACT_APP_LISTING_SERVICE+"units/"+data.id,
            body: data,
            json: true
         };
         rp(options).then(function(parsedBody){
             resolve(parsedBody);
         }).catch(function(err){
             reject(err.error);
         });
    });
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

const units = {get, getAll,createPromise, updatePromise};
export default units;


