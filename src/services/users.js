import axios from 'axios';

function getUser(){
    var url = process.env.REACT_APP_API + 'user/profile';
    return new Promise(function(resolve, reject){
        axios.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

function updateUser(id, body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + '/user/profile/'+id;

        axios.put(url,body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        }); 
    });
}

const users = {
    getUser,
    updateUser
};
export default users;
