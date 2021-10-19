import sparkService from '../services/spark';
import localStorageService from '../services/localStorage';

function initialize(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){

       localStorageService.setSparkAccessToken(accessToken);
       localStorageService.setSparkRefreshToken(refreshToken);

        sparkService.getCollections().then(function(collections){
            if (collections.D.Results.length > 0){
                sparkService.getCollection(collections.D.Results[0].Id).then(function(collection){
                    sparkService.getCollectionListings(collection.D.Results[0].ListingIds).then(function(collectionListings){
                        that.setState({
                            loading: false,
                            sparkCollections: collections,
                            sparkCollection: collection,
                            sparkCollectionListings: collectionListings,
                            sparkSelectedCollection: collections.D.Results[0].Id,
                            sparkAccessToken: accessToken,
                            sparkRefreshToken: refreshToken
                        });
                        resolve("ok");
                    }).catch(function(err){
                        console.log(err);
                        reject(err);
                    });
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                });
            } else {
                console.log("No collections");
                that.setstate({
                    sparkAccessToken: accessToken,
                    sparkRefreshToken: refreshToken
                });
                resolve("ok");
            }
        }).catch(function(err){
            reject(err);
            console.log(err);
        });
    });
}
function checkAuthentication(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){
        sparkService.getSystem(accessToken).then(function(system){
            console.log(system);
            initialize(that, accessToken, refreshToken).then(function(result){
                resolve(result);
            }).catch(function(err){
                reject(err);
            });
        }).catch(function(err){
            console.log(err);
            reject(err); 
        });
    });
}

function collectionSelect(that, accessToken, id){
    sparkService.getCollection(id).then(function(collection){
        sparkService.getCollectionListings(collection.D.Results[0].ListingIds).then(function(collectionListings){
            console.log("collectionListings:");
            console.log(collectionListings);
            that.setState({
                sparkSelectedCollection: id,
                sparkCollection: collection,
                sparkCollectionListings: collectionListings
            });
        }).catch(function(err){
            console.log(err);
        });
    }).catch(function(err){
        console.log(err);
    });
}

const spark = {
    initialize,
    collectionSelect,
    checkAuthentication
};
export default spark;
