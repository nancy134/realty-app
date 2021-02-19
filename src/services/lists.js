import axiosInstance from './axios';

export function getAll(){
    var url = process.env.REACT_APP_API+"lists/me";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            url: url
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    }); 
}

export function create(body){
    var url = process.env.REACT_APP_API+"lists/me";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            url: url,
            data: body
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function update(id, body){
    var url = process.env.REACT_APP_API + "lists/" + id;
    return new Promise(function(resolve, reject){
       var options = {
           method: 'PUT',
           url: url,
           data: body
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    }); 
}

export function deleteList(id){
    var url = process.env.REACT_APP_API + "lists/" + id;
    return new Promise(function(resolve, reject){
        var options = {
            method: 'DELETE',
            url: url
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        }); 
    });
}

const lists = {
    getAll,
    create,
    update,
    deleteList
};
export default lists;
