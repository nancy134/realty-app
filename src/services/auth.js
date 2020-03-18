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

export function signup(params){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API+"signup";
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

export function confirm(params){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API+"confirmSignUp";
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
const auth = {signin, signup, confirm};
export default auth;


