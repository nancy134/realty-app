import sparkService from '../services/spark';
import localStorageService from '../services/localStorage';

function initialize(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){

        localStorageService.setSparkAccessToken(accessToken);
        localStorageService.setSparkRefreshToken(refreshToken);

        getSavedSearches(that, accessToken, refreshToken).then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        });
        /*
        getCollections(that, accessToken, refreshToken).then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        });
        */;
    });
}

function getCollections(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){
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
                        reject(err);
                    });
                }).catch(function(err){
                    reject(err);
                });
            } else {
                that.setstate({
                    sparkAccessToken: accessToken,
                    sparkRefreshToken: refreshToken
                });
                resolve("ok");
            }
        }).catch(function(err){
            reject(err);
        });

    });
}

function getSavedSearches(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){
        sparkService.getSavedSearches().then(function(savedSearches){
            if (savedSearches.D.Results.length > 0){
                var savedSearchId = savedSearches.D.Results[0].Id;
                sparkService.getSavedSearchListings(savedSearchId).then(function(savedSearchListings){
                    that.setState({
                        loading: false,
                        sparkSavedSearches: savedSearches,
                        sparkSelectedSavedSearch: savedSearchId,
                        sparkListings: savedSearchListings,
                        sparkAccessToken: accessToken,
                        sparkRefreshToken: refreshToken
                    });
                    resolve("ok"); 
                }).catch(function(err){
                    reject(err);
                });
            } else {
                console.log("No saved searches");
                that.setState({
                    sparkAccessToken: accessToken,
                    sparkRefreshToken: refreshToken
                });
            }
        }).catch(function(err){
            reject(err);
        });
    });
}

function checkAuthentication(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){
        sparkService.getSystem(accessToken).then(function(system){
            initialize(that, accessToken, refreshToken).then(function(result){
                resolve(result);
            }).catch(function(err){
                reject(err);
            });
        }).catch(function(err){
            reject(err); 
        });
    });
}

function collectionSelect(that, accessToken, id){
    sparkService.getCollection(id).then(function(collection){
        sparkService.getCollectionListings(collection.D.Results[0].ListingIds).then(function(collectionListings){
            that.setState({
                sparkSelectedCollection: id,
                sparkCollection: collection,
                sparkCollectionListings: collectionListings
            });
        }).catch(function(err){
        });
    }).catch(function(err){
    });
}

function savedSearchSelect(that, accessToken, id){
    sparkService.getSavedSearchListings(id).then(function(savedSearchListings){
        that.setState({
            sparkListings: savedSearchListings,
            sparkSelectedSavedSearch: id
        });
    }).catch(function(err){
    });
}

const spark = {
    initialize,
    collectionSelect,
    checkAuthentication,
    savedSearchSelect,
    getCollections
};
export default spark;
