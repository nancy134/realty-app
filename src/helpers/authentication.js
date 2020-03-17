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

export function loginResponse(){


    return new Promise(function(resolve, reject){
        var username = "nancy_piedra@hotmail.com";
        var password = "Tweety_123";
        var signinParams = {
            username: username,
            password: password
        };
        var signinPromise = auth.signin(signinParams);
        signinPromise.then(function(result){
            console.log("result: "+result);
            const cookies = new Cookies();
            cookies.set('email','paulp@sabrerealtygroup.com');
            cookies.set('name', 'Paul Piedra');
            cookies.set('jwt','dj39fjtyzRwiD09');
            resolve(result);
        }).catch(function(err){
            console.log("err: "+err);
            reject(err);
        });
    });
}
