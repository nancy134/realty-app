import Cookies from 'universal-cookie';
import auth from '../services/auth';
import LocalStorageService from '../services/localStorage';
import userService from '../services/users';

export function reAuthenticate(){
    deleteObsoleteCookies();
    return new Promise(function(resolve, reject){
        var refreshToken = LocalStorageService.getRefreshToken();
        console.log("refreshToken:");
        console.log(refreshToken);
        if (refreshToken){
            var params = {
                refreshToken: refreshToken
            };
            auth.refreshToken(params).then(function(result){
                console.log(result);
                LocalStorageService.setIdToken(result.IdToken);
                userService.getUser().then(function(user){
                    console.log(user);
                    LocalStorageService.setIsAdmin(user.isAdmin);
                    LocalStorageService.setCognitoId(user.cognitoId);
                    LocalStorageService.setEmail(user.email);
                    if (user.first || user.last){
                        LocalStorageService.setFullName(user.first+" "+user.last);
                    } else {
                        LocalStorageService.setFullName(user.email);
                    }

                    resolve(user);
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                });
            }).catch(function(err){
                LocalStorageService.clearAll();
                console.log(err);
                reject(err);
            });
        } else {
            var ret = {
                message: "No token in local storage" 
            }
            reject(ret);
        }
    });
}

export function getUserEmail(){
    return LocalStorageService.getEmail();
}

export function getUserCognitoId(){
    return LocalStorageService.cognitoId();
}

export function getUserName(){
    return LocalStorageService.fullName();
}

export function isAdmin(){
    var isAdminStr = LocalStorageService.isAdmin(); 
    var isAdmin = false;
    if (isAdminStr === "true"){
        isAdmin = true;
    }
    return isAdmin 
}

export function isOwner(owner){
    if (owner === getUserCognitoId()){
        return true;
    } else {
        return false;
    }
}
export function deleteUser(){
    LocalStorageService.clearAll();
}

export function deleteObsoleteCookies(){
    const cookies = new Cookies();
    cookies.remove('name');
    cookies.remove('email');
    cookies.remove('jwt');
    cookies.remove('cognitoId');
    cookies.remove('isAdmin');
}

export function loginResponse(email, password){
    return new Promise(function(resolve, reject){
        var signinParams = {
            username: email,
            password: password
        };
        auth.signin(signinParams).then(function(result){
            LocalStorageService.setToken(result);

            userService.getUser().then(function(user){
                LocalStorageService.setIsAdmin(user.isAdmin);
                LocalStorageService.setCognitoId(user.cognitoId);
                LocalStorageService.setEmail(user.email);
                if (user.first || user.last){
                    LocalStorageService.setFullName(user.first+" "+user.last);
                } else {
                    LocalStorageService.setFullName(user.email);
                }
                result.isAdmin = user.isAdmin;
                resolve(result);
            }).catch(function(err){
                reject(err);
            });
 
        }).catch(function(err){
            reject(err);
        });
    });
}
export function signupResponse(email, password, confirmPassword){
    return new Promise(function(resolve,reject){
        var signupParams = {
            username: email,
            password: password
        };
        var signupPromise = auth.signup(signupParams);
        signupPromise.then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function confirmResponse(email, code){
    return new Promise(function(resolve,reject){
        var confirmParams = {
            username: email,
            code: code
        };
        var confirmPromise = auth.confirm(confirmParams);
        confirmPromise.then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function resendConfirmationCode(email){
    return new Promise(function(resolve, reject){
        var resendParams = {
            username: email
        };
        auth.resendConfirmationCode(resendParams).then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function forgotPasswordResponse(email){
    return new Promise(function(resolve, reject){
        var forgotPasswordParams = {
            username: email
        };
        var forgotPasswordPromise = auth.forgotPassword(forgotPasswordParams);
        forgotPasswordPromise.then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function confirmForgotPasswordResponse(code, password, email){
    return new Promise(function(resolve, reject){
        var params = {
            code: code,
            password: password,
            username: email
        };
        var confirmForgotPasswordPromise = auth.confirmForgotPassword(params);
        confirmForgotPasswordPromise.then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        });
    }); 
}

const authentication = {
    reAuthenticate,
    getUserEmail,
    getUserName,
    isOwner,
    isAdmin,
    deleteUser,
    loginResponse,
    signupResponse,
    confirmResponse,
    resendConfirmationCode,
    forgotPasswordResponse,
    confirmForgotPasswordResponse
};
export default authentication;
