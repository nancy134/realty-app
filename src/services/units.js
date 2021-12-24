import axiosInstance from './axios';

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
            url: process.env.REACT_APP_LISTING_SERVICE+"units",
            data: unit,
            json: true
        }
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function updatePromise(data){
    return new Promise(function(resolve, reject){
        var options = {
            method: 'PUT',
            url: process.env.REACT_APP_LISTING_SERVICE+"units/"+data.id,
            data: data
         };
         axiosInstance(options).then(function(result){
             resolve(result.data);
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


