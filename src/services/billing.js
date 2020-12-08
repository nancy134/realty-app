import fetch from 'node-fetch';
import authenticationService from '../helpers/authentication';

export function getClientToken(){
    var url = process.env.REACT_APP_API+"billing/getClientToken";
    console.log("url: "+url);
    var jwt = authenticationService.getJwt();
    var authorization = "Bearer " + jwt;
    console.log("authorization: "+authorization);
    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            headers: {'Authorization': authorization} 
        };
        fetch(url, options)
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
}

const billing = {
    getClientToken
};
export default billing;
