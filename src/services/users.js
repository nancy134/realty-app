import axiosInstance from './axios';

function getUsers(query){
    var url = process.env.REACT_APP_API + 'users';
    if (query){
        url += "?"+query;
    }
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
    var url = process.env.REACT_APP_API + 'user/me';
    return new Promise(function(resolve, reject){
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        });
    });
}

function updateUser(id, body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'user/me';

        axiosInstance.put(url,body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            console.log(err);
            reject(err);
        }); 
    });
}

function getUserEnums(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'user/enums';
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
             reject(err);
        });
    });
}

const users = {
    getUser,
    updateUser,
    getUsers,
    getUserEnums
};
export default users;
