import axios from 'axios';

export function getUser(){
    var url = process.env.REACT_APP_API + 'user/profile';
    return new Promise(function(resolve, reject){
        axios.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const users = {
    getUser
};
export default users;
