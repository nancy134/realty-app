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
            if (err && err.response && err.response.body){
                reject(err.response.body);
            } else {
                reject(err);
            }
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
            if (err && err.response && err.response.body){
                reject(err.response.body);
            } else {
                reject(err);
            }
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
            if (err && err.response && err.response.body){
                reject(err.response.body);
            } else {
                reject(err);
            }
        });
    });
}

export function forgotPassword(params){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API+"forgotPassword";
        var options = {
            method: 'POST',
            uri: url,
            body: params,
            json: true
        };
        rp(options).then(function(resp){
            resolve(resp);
        }).catch(function(err){
            if (err && err.response && err.response.body){
                reject(err.response.body);
            } else {
                reject(err);
            }
        });
    });
}

export function confirmForgotPassword(params){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "confirmForgotPassword";
        var options = {
            method: 'POST',
            uri: url,
            body: params,
            json: true
        };
        rp(options).then(function(resp){
            resolve(resp);
        }).catch(function(err){
            if (err && err.response && err.response.body){
                reject(err.response.body);
            } else {
                reject(err);
            }
        });
    });
}
 
const auth = {signin, signup, confirm, forgotPassword, confirmForgotPassword};
export default auth;


