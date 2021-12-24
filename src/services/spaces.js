import axiosInstance from './axios';

export function getAll(query,cb){
    var url = "";
    if (query) {
        url = process.env.REACT_APP_LISTING_SERVICE+"spaces?"+query;
    } else {
        url = process.env.REACT_APP_LISTING_SERVICE+"spaces";
    }
    return fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function get(index, cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"spaces/"+index;
    return fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function createPromise(space){
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            url: process.env.REACT_APP_LISTING_SERVICE+"spaces",
            data: space
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
            url: process.env.REACT_APP_LISTING_SERVICE+"spaces/"+data.id,
            data: data
         };
         axiosInstance(options).then(function(result){
             resolve(result.data);
         }).catch(function(err){
             reject(err);
         });
    });
}

export function deletePromise(id){
    return new Promise(function(resolve, reject){
        var options = {
            method: 'DELETE',
            url: process.env.REACT_APP_LISTING_SERVICE+"spaces/"+id
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
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

const spaces = {get, getAll,createPromise, updatePromise, deletePromise};
export default spaces;


