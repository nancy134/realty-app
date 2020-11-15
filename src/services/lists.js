var rp = require('request-promise');

export function getAll(query){
    var url = "";
    if (query){
       url = process.env.REACT_APP_LISTING_SERVICE+"lists?"+query;
    } else {
       url = process.env.REACT_APP_LISTING_SERVICE+"lists";
    }
    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            url: url,
            json: true
        };
        rp(options).then(function(parsedBody){
            resolve(parsedBody);
        }).catch(function(err){
            reject(err);
        });
    }); 
}

const lists = {
    getAll
};
export default lists;
