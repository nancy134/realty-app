import Cookies from 'universal-cookie';
import auth from '../services/auth';

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
export function getUserName(){
    const cookies = new Cookies();
    return cookies.get('name');
}
export function isOwner(owner){
  if (isAuthenticated()){
      if (owner === getUserEmail()){
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
}

export function loginResponse(email, password){
    return new Promise(function(resolve, reject){
        var signinParams = {
            username: email,
            password: password
        };
        var signinPromise = auth.signin(signinParams);
        signinPromise.then(function(result){
            const cookies = new Cookies();
            cookies.set('email',email.toLowerCase());
            cookies.set('name', email);
            cookies.set('jwt','dj39fjtyzRwiD09');
            resolve(result);
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
            console.log("result: "+JSON.stringify(result));
            resolve(result);
        }).catch(function(err){
            console.log("err: "+JSON.stringify(err));
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
