var rp = require('request-promise');

export function signin(params){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API+"signin";
        var options = {
            method: 'POST',
            uri: url,
            body: params,
            json: true
        };
        rp(options).then(function(resp){
            resolve(resp);
        }).catch(function(err){
            reject(err);
        });
    });
}
export function signin2(params,cb){
    var url = process.env.REACT_APP_API+"signin";
    console.log("params: "+JSON.stringify(params));
    fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(params)
    }).then(checkStatus).then(parseJSON).then(cb)
}

function checkStatus(response){
    console.log("checkStatus: response.status: "+response.status);
    console.log("checkStatus: response.statuText: "+response.statusText);
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

const auth = {signin};
export default auth;


