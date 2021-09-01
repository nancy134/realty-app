import axiosInstance from './axios';

export function getAll(listingVersionId){
    var url = process.env.REACT_APP_API+"listings/"+listingVersionId+"/condos";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function get(listingVersionId, condoId){
    var url = process.env.REACT_APP_API+"listings/"+listingVersionId+"/condos/"+condoId;
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}
export function create(listingVersionId, body){
    var url = process.env.REACT_APP_API+"listings/"+listingVersionId+"/condos";
    return new Promise(function(resolve, reject){
        var options = {
            method: 'POST',
            url: url,
            data: body
        }
        axiosInstance(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function update(listingVersionId, condoId, body){
    var url = process.env.REACT_APP_API+
        "listings/"+
        listingVersionId+
        "/condos/"+
        condoId;
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

export function deleteCondo(listingVersionId, condoId){
    var url = process.env.REACT_APP_API+"listings/"+listingVersionId+"/condos/"+condoId;
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

const condos = {
    get,
    getAll,
    create,
    update,
    deleteCondo
};
export default condos;


