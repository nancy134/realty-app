import axiosSpark from './axiosSpark';

export function getCollections(){
    var url = process.env.REACT_APP_API + "spark/collections";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        console.log(options);
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getCollection(id){
    var url = process.env.REACT_APP_API + "spark/collections/" + id;
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getCollectionListings(listings){
    var url = process.env.REACT_APP_API + "spark/collectionListings";
    return new Promise(function(resolve, reject){
        var body = {
            listings: listings
        };
        var options = {
            url: url,
            method: 'POST',
            data: body
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    }); 
}

export function getSystem(){
    var url = process.env.REACT_APP_API + "spark/system";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const spark = {
    getCollections,
    getCollection,
    getCollectionListings,
    getSystem
};
export default spark;
