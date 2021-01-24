import Cookies from 'universal-cookie';
import auth from '../services/auth';
import LocalStorageService from '../services/localStorage';
import userService from '../services/users';

export function isAuthenticated(){
    const cookies = new Cookies();
    const jwt =  cookies.get('jwt');
    if (!jwt) return false;
    else return true;
}

export function getUserEmail(){
    const cookies = new Cookies();
    return cookies.get('email');
}

export function getUserCognitoId(){
    const cookies = new Cookies();
    return cookies.get('cognitoId');
}

export function getUserName(){
    const cookies = new Cookies();
    return cookies.get('name');
}

export function getJwt(){
    const cookies = new Cookies();
    return cookies.get('jwt');
}

export function isOwner(owner){
  if (isAuthenticated()){
      if (owner === getUserCognitoId()){
          return true;
      } else {
          return false;
      }
  }else{
      return false;
  }
}
export function deleteUser(){
    const cookies = new Cookies();
    cookies.remove('name');
    cookies.remove('email');
    cookies.remove('jwt');
    LocalStorageService.clearToken();
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
                console.log(result);
                const cookies = new Cookies();
                cookies.set('email',user.email);
                cookies.set('name', email);
                cookies.set('jwt',result.IdToken);
                cookies.set('cognitoId', user.cognitoId);
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
    isAuthenticated,
    getUserEmail,
    getUserName,
    getJwt,
    isOwner,
    deleteUser,
    loginResponse,
    signupResponse,
    confirmResponse,
    forgotPasswordResponse,
    confirmForgotPasswordResponse
};
export default authentication;
