import Cookies from 'universal-cookie';
import auth from '../services/auth';
import LocalStorageService from '../services/localStorage';
import userService from '../services/users';

function setFullName(user){
    var fullName = "";
    if (user.first &&  user.last){
        fullName = user.first+" "+user.last;
    } else if (user.first && !user.last){
        fullName = user.first;
    } else if (!user.first && user.last){
        fullName = user.last;
    } else {
        fullName = user.email;
    }
    if (user.isAdmin){
        fullName += " (SU)";
    }

   LocalStorageService.setFullName(fullName);
}

export function reAuthenticate(){
    deleteObsoleteCookies();
    return new Promise(function(resolve, reject){
        var refreshToken = LocalStorageService.getRefreshToken();
        if (refreshToken){
            var params = {
                refreshToken: refreshToken
            };
            auth.refreshToken(params).then(function(result){
                LocalStorageService.setIdToken(result.IdToken);
                userService.getUser().then(function(user){
                    LocalStorageService.setIsAdmin(user.isAdmin);
                    LocalStorageService.setCognitoId(user.cognitoId);
                    LocalStorageService.setEmail(user.email);
                    setFullName(user);
                    resolve(user);
                }).catch(function(err){
                    reject(err);
                });
            }).catch(function(err){
                LocalStorageService.clearAll();
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
    return LocalStorageService.email();
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
                setFullName(user);
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
export function signupResponse(body){
    return new Promise(function(resolve,reject){
        var signupParams = {
            username: body.email,
            password: body.password,
            role: body.role
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
    getUserCognitoId,
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
