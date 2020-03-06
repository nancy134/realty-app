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
    var url = process.env.REACT_APP_LISTING_SERVICE+"unit/"+index;
    return fetch(url, {
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function create(unit,cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"unit";
    fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(unit)
    }).then(checkStatus).then(parseJSON).then(cb);
}

export function update(data,cb){
    var url = process.env.REACT_APP_LISTING_SERVICE+"unit/"+data.id;
    fetch(url, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
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

const units = {get, getAll,create, update};
export default units;


