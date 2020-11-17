var rp = require('request-promise');

export function getAll(query){
    var url = "";
    if (query){
        url = process.env.REACT_APP_LISTING_SERVICE+"listItems?"+query;
    } else {
        url = process.env.REACT_APP_LISTING_SERVICE+"listItems";
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
            reject(err);
        });
    });
}

export function create(body){
    var url = process.env.REACT_APP_LISTING_SERVICE+"listItems";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            uri: url,
            json: true,
            body: body
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err);
        });
    });
}

const listItems = {
    getAll,
    create
};
export default listItems;
