import axiosInstance from './axios';
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

export function refreshToken(params){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "refreshToken";
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

export function resendConfirmationCode(params){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API+"resendConfirmationCode";
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

export function getCCAuthUrl(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'cc/authurl';
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getCCAuthToken(code, redirect_uri){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'cc/authToken' +
            '?code='+ code +
            '&redirect_uri=' + redirect_uri;
        console.log(url);
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function ccRefreshToken(refreshToken){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'cc/refreshToken' +
            '?refresh_token=' + refreshToken;
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}
 
const auth = {
    signin,
    signup,
    confirm,
    resendConfirmationCode,
    forgotPassword,
    confirmForgotPassword,
    refreshToken,
    getCCAuthUrl,
    getCCAuthToken,
    ccRefreshToken
};
export default auth;


