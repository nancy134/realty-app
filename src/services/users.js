import axiosInstance from './axios';

function getUsers(){
    var url = process.env.REACT_APP_API + '/users';
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            console.log(err); 
            reject(err);
        });
    });
}

function getUser(){
    var url = process.env.REACT_APP_API + 'user/profile';
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            console.log(response);
            resolve(response.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        });
    });
}

function updateUser(id, body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + '/user/profile/'+id;

        axiosInstance.put(url,body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        }); 
    });
}

const users = {
    getUser,
    updateUser,
    getUsers
};
export default users;
