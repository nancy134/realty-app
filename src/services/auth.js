import axiosInstance from './axios';

export function signin(params){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API+"signin";
        var options = {
            method: 'POST',
            url: url,
            data: params
        };
        axiosInstance(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            console.log(err);
            console.log(err.response.data);
            if (err && err.response && err.response.data){
                reject(err.response.data);
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
            url: url,
            data: params
        };
        axiosInstance(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
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
            url: url,
            data: params
        };
        axiosInstance(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
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
            url: url,
            data: params
        };
        axiosInstance(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
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
            url: url,
            data: params
        };
        axiosInstance(options).then(function(resp){
            resolve(resp.data);
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
            url: url,
            data: params
        };
        axiosInstance(options).then(function(resp){
            resolve(resp.data);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
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
            url: url,
            data: params
        };
        axiosInstance(options).then(function(resp){
            resolve(resp);
        }).catch(function(err){
            if (err && err.response && err.response.data){
                reject(err.response.data);
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

export function getSparkAuthUrl(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'spark/authurl';
        console.log("url: "+url);
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getSparkAuthToken(body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'spark/authToken';
        console.log(url);
        console.log(body);
        axiosInstance.post(url, body).then(function(response){
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
    ccRefreshToken,
    getSparkAuthUrl,
    getSparkAuthToken
};
export default auth;


