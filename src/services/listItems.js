import axiosInstance from './axios';

export function getAll(ListId){
    var url =
        process.env.REACT_APP_API +
        "lists/" +
        ListId +
        "/listItems/me?perPage=500&page=1";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'GET',
            url: url,
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function create(ListId, body){
    var url =
        process.env.REACT_APP_API +
        "lists/" +
        ListId +
        "/listItems/me";
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

export function deleteItem(ListItemId){
    var url =
        process.env.REACT_APP_API +
        "listItems/" +
        ListItemId;
    console.log("DELETE url: "+url);
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

const listItems = {
    getAll,
    create,
    deleteItem
};
export default listItems;
